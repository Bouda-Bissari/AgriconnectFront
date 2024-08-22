const Banner = () => {
  return (
    <div className="md:mt-5">
      <div
        className="bg-cover bg-center h-auto text-white md:py-4 py-1 md:px-10 px-5 object-fill justify-center items-center"
        style={{ backgroundImage: "url('src/assets/Image13.jpg')" }}
      >
        <div className="md:w-1/2 bg-slate-950 bg-opacity-60 rounded p-10">
          <p className="font-extrabold text-sm uppercase">Qui sommes-nous ?</p>
          <p className="text-3xl font-bold" style={{ fontFamily: "poetsen" }}>
            AgriConnect
          </p>
          <p className="md:text-2xl text-xl md:mb-5 mb-1 leading-none">
            Favoriser l&apos;emploi et connecter les acteurs dans le secteur
            agricole
          </p>
          <p className="md:text-lg md:mb-4">
            Notre mission est de faciliter les mises en relation entre
            exploitants agricoles et ouvriers agricoles, en créant un réseau
            solide et efficace pour soutenir l&apos;agriculture locale.
          </p>
          <a
            href="mailto:jeanmariebissari@gmail.com?subject=Demande de contact&body=Bonjour, j'aimerais en savoir plus sur Agriconnect."
            className="bg-green-600 md:py-4 py-1   md:px-8 px-4 text-white font-bold uppercase text-xs rounded hover:bg-green-700 hover:text-white"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
