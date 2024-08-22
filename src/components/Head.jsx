import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { UserContext } from "../contexts/ContextProvider";
import { lazy, Suspense } from "react";
import Loading from "./Loading";
import images from "../assets/index"; // Assurez-vous que le chemin est correct

const CarouselPlugin = lazy(() => import("./ui/mix/CarouselPlugin"));
const Header = () => {
  const { user, token } = UserContext();
  const isLoggedIn = !!token;

  useGSAP(() => {
    // Fonction pour séparer le texte
    function breakText() {
      const h1 = document.querySelector("h1");
      const span = document.querySelector("span.text-orange-600");

      if (!h1 || !span) return;

      const h1Text = h1.textContent;
      const spanText = span.textContent;

      const SplittedText = h1Text.split("");
      const SplittedSpan = spanText.split("");

      const clutter = SplittedText.map((elem) => `<span>${elem}</span>`).join(
        ""
      );
      const clutterSpan = SplittedSpan.map(
        (elem) => `<span>${elem}</span>`
      ).join("");

      h1.innerHTML = clutter;
      span.innerHTML = clutterSpan;
    }

    // Appeler la fonction pour séparer le texte
    breakText();

    // Création d'une timeline GSAP pour les animations
    var tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    // Animation GSAP
    tl.from("h1 span", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
    }).from("span.text-orange-600 span", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      delay: -0.5, // Début de l'animation de l'élément orange juste après le précédent
    });
  }); // Dépendance vide pour exécuter seulement au montage du composant

  const sectionStyle = {
    backgroundImage: `url(${images.hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Vous pouvez ajuster la hauteur selon vos besoins
  };

  return (
<section
  className={`relative  bg-cover bg-center bg-no-repeat`} style={sectionStyle}
>      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex gap-5 lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-left">
          <div
            className="bg-white bg-opacity-35 bc rounded md:mt-0 mt-20"
            style={{ fontFamily: "poetsen" }}
          >
            <h1
              id="title"
              className="md:text-2xl text-3xl lg:text-6xl text-white stroke-green-600 rounded md:p-4 p-2"
            >
              {isLoggedIn
                ? user.fullName
                  ? `Bienvenue, ${user.fullName}`
                  : "Bienvenue, ..."
                : "Facilitez vos échanges agricoles"}
              <br />
            </h1>

            {!isLoggedIn && (
              <span className="text-orange-600 md:text-2xl text-3xl lg:text-6xl font-extrabold rounded md:p-4 p-2">
                avec simplicité 🌾
              </span>
            )}
          </div>
          <p className="mt-4 text-sm font-bold lg:text-base text-white dark:text-gray-400 rounded p-4 bg-white bg-opacity-35">
            {isLoggedIn
              ? "Vous êtes maintenant connecté. Explorez vos options et profitez de notre service."
              : "Joignez-vous à la communauté agricole pour développer vos projets et optimiser vos ressources."}
          </p>

          <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row mb-6">
            {isLoggedIn ? (
              <>
                <a
                  href={`/profil/${user.id}`}
                  className="block px-5 py-2 text-sm tracking-wider text-center text-white bg-[#4CAF50] hover:bg-[#43A047]/80 focus:ring-4 focus:outline-none focus:ring-[#43A047]/50 font-medium rounded-lg"
                >
                  Mon profile
                </a>
              </>
            ) : (
              <>
                <a
                  href="#"
                  className="block px-5 py-2 text-sm tracking-wider text-center text-white bg-[#4CAF50] hover:bg-[#43A047]/80 focus:ring-4 focus:outline-none focus:ring-[#43A047]/50 font-medium rounded-lg"
                >
                  Commencer
                </a>
                <button className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">
                  En savoir plus
                </button>
              </>
            )}
          </div>
        </div>
        <div className="w-1/2 mt-10">
          <Suspense fallback={<Loading />}>
            <CarouselPlugin className="hidden lg:block w-full lg:w-1/2 h-1/2 bg-cover bg-center " />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Header;
