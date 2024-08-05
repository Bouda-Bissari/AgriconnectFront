const Banner = () => {
  return (
    <div>
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
            Favoriser l&apos;emploi agricole et connecter les acteurs du secteur
          </p>
          <p className="md:text-lg md:mb-2">
            Notre mission est de faciliter les mises en relation entre
            demandeurs d&apos;emplois, salariés agricoles et employeurs, tout en
            offrant un service de qualité grâce à des gestionnaires
            professionnels régionaux.
          </p>
          <a
            href="#"
            className="bg-green-600 md:py-4 py-1 md:px-8 px-4 text-white font-bold uppercase text-xs rounded hover:bg-green-700 hover:text-white"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
