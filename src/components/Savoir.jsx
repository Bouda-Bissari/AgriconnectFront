import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Image4 } from "../assets/index.jsx";

gsap.registerPlugin(useGSAP, ScrollTrigger);
function Savoir() {
  useGSAP(() => {
    var tl = gsap.timeline();
    tl.from("#about", {
      x: -100,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        scroller: "body",
        markers: true,
      },
    }).from(".im", {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        markers: true,
      },
    });
  });
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12"
    >
      <div className="w-full items-center mx-auto max-w-screen-lg ">
        <div className="group grid w-full md:grid-cols-2 grid-cols-1">
          <div>
            <div className="pr-12 pl-6">
              <p className="peer mb-6 text-gray-400">
                Notre plateforme connecte les fournisseurs de services agricoles
                et les demandeurs pour améliorer les opérations agricoles. Grâce
                à notre système, les acteurs peuvent facilement trouver et
                offrir des services, optimisant ainsi leur productivité.
              </p>
              <p className="mb-6 text-gray-400">
                Nous offrons des solutions adaptées aux besoins spécifiques des
                agriculteurs, garantissant des résultats efficaces et durables.
                Rejoignez-nous pour bénéficier d &apos un réseau de services
                fiable et innovant.
              </p>
              <h3 className="mb-4 font-semibold text-xl text-gray-400">
                Nos Services
              </h3>
              <ul
                role="list"
                className="marker:text-green-500 list-disc pl-5 space-y-3 text-slate-500"
              >
                <li>Conseils agricoles personnalisés</li>
                <li>Accès à des équipements modernes</li>
                <li>Support technique et formation</li>
              </ul>
            </div>
          </div>
          <div className=" rounded-xl  md:block pl-16 relative flex items-end flex-col before:block before:absolute before:h-1/6 before:w-4 before:bg-green-500 before:bottom-0 before:left-0 before:rounded-lg before:transition-all group-hover:before:bg-orange-300 overflow-hidden im">
            <div className=" absolute top-0 left-0 bg-green-500 w-4/6 h-full px-12 py-14 flex flex-col justify-center rounded-xl group-hover:bg-green-600 transition-all">
              <span
                className="block mb-10 font-bold group-hover:text-orange-300"
                style={{ fontFamily: "poetsen" }}
              >
                DÉCOUVREZ-NOUS
              </span>
              <h2 className="text-white font-bold text-3xl mb-4">
                Ce qui a commencé comme une petite initiative est devenu un
                réseau majeur pour l&apos; agriculture.
              </h2>
            </div>

            <div className="rounded-xl overflow-hidden ">
              <img src={Image4} alt="Agricultural Services" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Savoir;
