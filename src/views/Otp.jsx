import { useRef, useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Axios from "../axiosClient.js";

const Otp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [message, setMessage] = useState("");
  const [sentOtp, setSentOtp] = useState(""); // État pour stocker le code OTP envoyé
  const inputsRef = useRef([]);
  const { user } = useStateContext(); // Récupère le contexte
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifiez le numéro de téléphone dans le contexte
    if (user?.phone_number) {
      setPhoneNumber(user.phone_number);
    } else {
      console.log("Aucun numéro de téléphone trouvé dans le contexte");

      // Essayez de récupérer le numéro de téléphone depuis le localStorage
      const storedPhoneNumber = localStorage.getItem("phoneNumber");
      if (storedPhoneNumber) {
        setPhoneNumber(storedPhoneNumber);
      } else {
        setMessage("Aucun numéro de téléphone trouvé.");
      }
    }
  }, [user]);

  useEffect(() => {
    if (phoneNumber) {
      // Envoyer le code OTP lors du chargement de la page
      const sendOtp = async () => {
        try {
          const response = await Axios.post("/send-otp", { phone_number: phoneNumber });
          setSentOtp(response.data.otp); // Stocker le code OTP envoyé
          setOtp(Array(4).fill("")); // Réinitialiser l'OTP dans l'état
          setMessage(response.data.message);

          console.log("Code OTP envoyé :", response.data.otp); // Log pour vérifier le code OTP envoyé
        } catch (error) {
          setMessage(error.response ? error.response.data.message : "Une erreur est survenue lors de l'envoi du code OTP.");
        }
      };
      sendOtp();
    }
  }, [phoneNumber]);

  const handleKeyDown = useCallback((e, index) => {
    if (!/^[0-9]{1}$/.test(e.key) && !["Backspace", "Delete", "Tab"].includes(e.key) && !e.metaKey) {
      e.preventDefault();
    }
    if (["Backspace", "Delete"].includes(e.key)) {
      if (index > 0 && !inputsRef.current[index].value) {
        inputsRef.current[index - 1].focus();
      }
    }
  }, []);

  const handleInput = useCallback((e, index) => {
    const value = e.target.value;
    console.log(`Valeur entrée dans le champ ${index} :`, value); // Log pour vérifier la valeur entrée
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    console.log('Nouvel OTP après mise à jour :', newOtp); // Log pour vérifier l'état OTP mis à jour

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    } else if (index === inputsRef.current.length - 1) {
      inputsRef.current[index].blur();
    }
  }, [otp]);

  const handleFocus = useCallback((e) => {
    e.target.select();
  }, []);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    console.log("Texte collé :", text); // Log pour vérifier le texte collé
    if (/^[0-9]{4}$/.test(text)) {
      const newOtp = text.split("");
      setOtp(newOtp);
      inputsRef.current.forEach((input, index) => input.value = newOtp[index]);
      inputsRef.current[inputsRef.current.length - 1].focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    console.log("Code OTP entré :", otpCode); // Log pour vérifier le code OTP entré
    console.log("Code OTP envoyé pour comparaison :", sentOtp); // Log pour vérifier le code OTP envoyé

    if (otpCode === sentOtp.toString()) {
      // Si l'OTP entré correspond à celui envoyé
      try {
        const response = await Axios.post("/verify-otp", { phone_number: phoneNumber });
        setMessage(response.data.message);
        navigate("/choix");

      } catch (error) {
        setMessage(error.response ? error.response.data.message : "Une erreur est survenue lors de la vérification du code OTP.");
      }
    } else {
      setMessage("Le code OTP ne correspond pas.");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await Axios.post("/send-otp", { phone_number: phoneNumber });
      setSentOtp(response.data.otp); // Mettre à jour le code OTP envoyé
      setOtp(Array(4).fill("")); // Réinitialiser l'OTP
      setMessage("Code OTP renvoyé.");

      console.log("Code OTP renvoyé :", response.data.otp); // Log pour vérifier le code OTP renvoyé
    } catch (error) {
      setMessage("Une erreur est survenue lors de l'envoi du code OTP.");
    }
  };

  return (
    <div className="dark:bg-gray-900 h-screen w-screen pt-20">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Vérification de téléphone mobile</h1>
          <p className="text-[15px] text-slate-500">
            Entrez le code de vérification à 4 chiffres envoyé à votre numéro de téléphone : <strong>{phoneNumber}</strong>. Est-il correct ?
          </p>
          <p className="text-[15px] text-slate-500">
            Code OTP envoyé : <strong>{sentOtp}</strong>
          </p>
          <p className="text-[15px] text-slate-500">
            Code OTP actuel : <strong>{otp.join("")}</strong>
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {Array(4).fill().map((_, index) => (
              <input
                key={index}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength="1"
                ref={(el) => (inputsRef.current[index] = el)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => handleInput(e, index)}
                onFocus={handleFocus}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Vérifier le compte
            </button>
          </div>
        </form>
        {message && <div className="text-sm text-slate-500 mt-4">{message}</div>}
        <div className="text-sm text-slate-500 mt-4">
          Vous n&apos;avez pas reçu de code ?{" "}
          <button onClick={resendOtp} className="font-medium text-indigo-500 hover:text-indigo-600">
            Renvoyer
          </button>
        </div>
        <div className="text-sm text-slate-500 mt-4">
          Vous voulez changer votre numéro de téléphone ?{" "}
          <Link to={"/change-phone"} className="font-medium text-indigo-500 hover:text-indigo-600">
            Changer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Otp;
