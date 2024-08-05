import { person } from "../assets/index.js";

const ProfilDetails = () => {
  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profil Public</h2>

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <img
                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 dark:ring-green-500"
                src={person}
                alt="Avatar avec bordure"
              />

              <div className="flex flex-col space-y-5 sm:ml-8">
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-orange-100 focus:outline-none bg-[#202142] rounded-lg border border-orange-200 hover:bg-orange-900 focus:z-10 focus:ring-4 focus:ring-orange-200"
                >
                  Changer l&apos;image
                </button>
                <button
                  type="button"
                  className="py-3.5 px-7 text-base font-medium text-orange-900 focus:outline-none bg-white rounded-lg border border-orange-200 hover:bg-orange-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-orange-200"
                >
                  Supprimer l&apos;image
                </button>
              </div>
            </div>

            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Votre prénom"
                    value="Jane"
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                    placeholder="Votre nom"
                    value="Ferguson"
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Votre email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="votre.email@mail.com"
                  required
                />
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="profession"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  className="bg-orange-50 border border-orange-300 text-orange-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Votre profession"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-orange-900 dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-orange-900 bg-orange-50 rounded-lg border border-orange-300 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Écrivez votre bio ici..."
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilDetails;
