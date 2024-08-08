
const SideProfil = () => {
  const userId = JSON.parse(localStorage.getItem("USER_ID"));


  console.log(userId)

  return (
    <div className="hidden  py-4 md:w-1/3 lg:w-1/4 md:block bg-green-500">
      <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
        <h2 className="pl-3 mb-4 text-2xl font-semibold">Gérer Votre Profil</h2>
        <a
          href="#"
          className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full"
        >
          Votre Profil
        </a>
        <a
          href={`/user/${userId}/services`} // Updated to use user ID
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Candidatures
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Notifications
        </a>
        <a
          href="/"
          className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
        >
          Page d&apos;acceuil
        </a>
      </div>
    </div>
  );
};

export default SideProfil;
