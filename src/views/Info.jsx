const EnSavoirPlus = () => {
  return (
      <div className="flex flex-col lg:grid lg:gap-4 2xl:gap-6 lg:grid-cols-4 2xl:row-span-2 2xl:pb-8 ml-2 pt-4 px-6 mt-40">
        {/* Notre Mission */}
        <div className="bg-indigo-600 lg:order-1 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0">
          <div className="mx-6 my-8 2xl:mx-10">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">Notre Mission</h1>
            <p className="text-white text-opacity-80 mt-4">
              Notre mission est de faciliter la connexion entre les acteurs du secteur agricole au Togo pour améliorer l&apos;efficacité et la productivité. Nous croyons que des relations solides et une communication efficace peuvent transformer ce secteur vital.
            </p>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="bg-gray-900 lg:order-2 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl pb-4 mb-5 lg:mb-0">
          <div className="mx-8 2xl:mx-10 my-10">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">Comment ça marche ?</h1>
            <p className="text-white text-opacity-80 mt-4">
              Notre plateforme est simple à utiliser. Inscrivez-vous en tant que provider ou seeker, créez votre profil, et commencez à publier ou rechercher des services agricoles au Togo. Nous facilitons les candidatures et les communications pour vous aider à trouver ce dont vous avez besoin rapidement et efficacement.
            </p>
          </div>
        </div>

        {/* Avantages pour les utilisateurs */}
        <div className="bg-primary-color-white lg:order-3 lg:row-span-2 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8">
          <div className="mx-8 my-10 lg:my-8">
            <h1 className="text-indigo-600 text-2xl lg:text-4xl font-bold">Avantages pour les utilisateurs</h1>
            <p className="text-indigo-800 mt-4">
              En tant que provider, vous bénéficiez d&apos;une visibilité accrue pour vos services au Togo, d&apos;une gestion simplifiée des candidatures, et d&apos;un accès direct aux demandeurs de services. En tant que seeker, vous pouvez trouver des services fiables, comparer les offres, et communiquer directement avec les providers.
            </p>
          </div>
        </div>

        {/* Sécurité et Confidentialité */}
        <div className="bg-purple-800 lg:order-4 lg:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0 2xl:mb-8 lg:pb-14 2xl:pb-20">
          <div className="mx-6 my-8 lg:my-8 2xl:mx-10">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">Sécurité et Confidentialité</h1>
            <p className="text-white text-opacity-80 mt-4">
              Nous prenons la sécurité de vos données très au sérieux. Nos mesures de sécurité comprennent l&apos;authentification à deux facteurs, le chiffrement des données sensibles, et des contrôles de confidentialité stricts.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-primary-color-white lg:order-5 lg:row-span-1 2xl:row-span-1 lg:col-span-1 rounded-lg shadow-xl mb-5 lg:mb-0">
          <div className="mx-8 my-10">
            <h1 className="text-indigo-600 text-2xl lg:text-4xl font-bold">FAQ</h1>
            <p className="text-indigo-800 mt-4">
              Vous avez des questions ? Consultez notre FAQ pour trouver des réponses aux questions les plus courantes sur l&apos;utilisation de notre plateforme au Togo.
            </p>
          </div>
        </div>

        {/* Conditions d'utilisation */}
        <div className="bg-indigo-600 lg:order-6 lg:row-span-1 2xl:row-span-1 lg:col-span-2 rounded-lg shadow-xl mb-5 lg:mb-0">
          <div className="mx-6 my-8 2xl:mx-10">
            <h1 className="text-white text-2xl lg:text-4xl font-bold">Conditions d&apos;utilisation</h1>
            <p className="text-white text-opacity-80 mt-4">
              En utilisant notre plateforme, vous acceptez nos conditions d&apos;utilisation. Veuillez les lire attentivement pour comprendre vos droits et responsabilités en tant qu&apos;utilisateur au Togo.
            </p>
            <p className="text-white text-opacity-80 mt-4">
              <strong>1. Acceptation des conditions</strong> <br />
              En accédant à notre plateforme, vous acceptez d&apos;être lié par les présentes conditions d&apos;utilisation, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect de toutes les lois locales applicables au Togo.
            </p>
            <p className="text-white text-opacity-80 mt-4">
              <strong>2. Utilisation de la plateforme</strong> <br />
              Vous acceptez d&apos;utiliser la plateforme uniquement à des fins légales et de manière conforme à toutes les lois locales, nationales et internationales au Togo.
            </p>
            <p className="text-white text-opacity-80 mt-4">
              <strong>3. Confidentialité</strong> <br />
              Votre utilisation de notre plateforme est également soumise à notre politique de confidentialité. Veuillez la lire pour comprendre comment nous collectons, utilisons et protégeons vos informations personnelles au Togo.
            </p>
          </div>
        </div>
      </div>
  );
};

export default EnSavoirPlus;
