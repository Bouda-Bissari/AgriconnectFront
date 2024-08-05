import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// eslint-disable-next-line react/prop-types
function Hero() {
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

  return (
    <div
      className="bg-cover lg:block lg:w-2/3 "
      style={{
        width: "100%",
      }}
    >
      <header
        className="my-4 relative"
        style={{ backgroundColor: "blur(4px)" }}
      >
        {/* Fond d'image avec superposition sombre */}
        <div className="absolute inset-0 bg-green-900 "></div>

        <div className="lg:flex items-center justify-center relative z-10 ">
          <div className="flex items-center justify-center w-full lg:w-1/2 gap-5 px-6 py-8 lg:min-h-[32rem]">
            <div className="max-w-xl ">
              <div
                className=" bg-black bg-opacity-35 bc rounded md:mt-0 mt-20"
                style={{ fontFamily: "poetsen" }}
              >
                <h1
                  id="title"
                  className="md:text-4xl text-3xl lg:text-6xl font-extrabold text-white stroke-green-600  rounded md:p-4 p-2"
                >
                  Facilitez vos échanges agricoles <br />
                </h1>
                <span className="text-orange-600 md:text-7xl text-3xl lg:text-6xl font-extrabold rounded md:p-4 p-2">
                  avec simplicité 🌾
                </span>
              </div>
              <p className="mt-4 text-sm font-bold lg:text-base text-gray-500 dark:text-gray-400 rounded p-4 bg-black bg-opacity-35">
                Joignez-vous à la communauté agricole pour développer vos
                projets et optimiser vos ressources.
              </p>

              <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row mb-6">
                <a
                  href="#"
                  className="block px-5 py-2 text-sm tracking-wider text-center text-white bg-[#4CAF50] hover:bg-[#43A047]/80 focus:ring-4 focus:outline-none focus:ring-[#43A047]/50 font-medium rounded-lg"
                >
                  Commencer
                </a>
                <button className="block px-5 py-2 text-sm font-medium tracking-wider text-center text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md lg:mx-4 hover:bg-gray-300">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>

          {/* Galerie affichée sur les grands écrans */}
          <div
            className="hidden lg:block w-full lg:w-1/2 h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/Image7.jpg')" }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40"></div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Hero;
