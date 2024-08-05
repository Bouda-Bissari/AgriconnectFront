import { useState, useEffect } from "react";
import Axios from "../axiosClient.js";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const ChangePhoneNumber = () => {
  const { setUser, user } = useStateContext();
  const [newPhoneNumber, setNewPhoneNumber] = useState(() => {
    return localStorage.getItem("newPhoneNumber") || "";
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.phone_number) {
      setNewPhoneNumber(user.phone_number);
    }
  }, [user]);

  const handleChangePhoneNumber = async (e) => {
    e.preventDefault();

    try {
      const formattedPhoneNumber = newPhoneNumber.startsWith("228")
        ? newPhoneNumber
        : `228${newPhoneNumber}`;

      console.log("Formatted phone number:", formattedPhoneNumber);

      await Axios.post("/update-phone-number", {
        phone_number: formattedPhoneNumber,
      });

      setMessage("Numéro de téléphone mis à jour avec succès.");
      console.log("Phone number updated successfully");

      setUser((prevUser) => ({
        ...prevUser,
        phone_number: formattedPhoneNumber,
      }));

      setTimeout(() => {
        navigate("/otp");
      }, 2000); // Redirige vers la page de vérification OTP
    } catch (error) {
      console.error("Error updating phone number:", error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage(
          "Une erreur est survenue lors de la mise à jour du numéro de téléphone."
        );
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("newPhoneNumber", newPhoneNumber);
  }, [newPhoneNumber]);

  return (
    <div className="dark:bg-gray-900 h-screen w-screen pt-20">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            Modifier le Numéro de Téléphone
          </h1>
          <p className="text-[15px] text-slate-500">
            Entrez votre nouveau numéro de téléphone. Un code de vérification
            sera envoyé à ce numéro.
          </p>
        </header>
        <form onSubmit={handleChangePhoneNumber}>
          <div className="mb-4">
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="w-full h-12 text-center text-lg font-semibold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              placeholder="Nouveau numéro de téléphone"
            />
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Mettre à jour
            </button>
          </div>
        </form>
        {message && (
          <div className="text-sm text-slate-500 mt-4">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChangePhoneNumber;
