import { useEffect, useState } from "react";
import DetailCandidature from "./DetailCandidature";
import axiosClient from "../configs/axiosClient";
import Pagination from "../components/Pagination";
import Loading from "@/components/Loading";
// import { UserContext } from "@/contexts/ContextProvider";

const DisplayCandidature = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  // useEffect(() => {
  //   const fetchCandidatures = async () => {
  //     try {
  //       const response = await axiosClient.get(`/candidatures/user/${userId}`);
  //       setCandidatures(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCandidatures();
  // }, [userId]);


  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axiosClient.get(`/candidatures/user/${userId}`);
        // Filtrer les candidatures dont le statut n'est pas 'deleted'
        const filteredCandidatures = response.data.filter(
          (candidature) => candidature.status !== 'deleted'
        );
        setCandidatures(filteredCandidatures);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    fetchCandidatures();
  }, [userId]);
  

  if (loading) {
    return (
      <div className="my-20 w-full flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Candidatures
        </h2>
        <div className="flex justify-center items-center  ">
          {/* {Array.from({ length: postsPerPage }).map((_, index) => (
            <SkeletonDetailCandidature key={index} />
          ))} */}
          <Loading />
        </div>
      </div>
    );
  }

  if (error) return <p className="mt-40">Error: {error.message}</p>;

  if (candidatures.length === 0) {
    return (
      <div className="my-20 flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Candidatures
        </h2>
        <p className="text-gray-700">Vous n&apos;avez aucune candidature pour le moment.</p>
      </div>
    );
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = candidatures.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 flex justify-center items-center flex-col">
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Candidatures
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-10 gap-2 w-4/5">
        {currentPosts.map((candidature) => (
          <DetailCandidature
            key={candidature.id}
            id={candidature.id}
            title={candidature.service.title}
            description={candidature.service.description}
            location={candidature.service.location}
            image={candidature.service.image}
            price={candidature.service.price}
            phoneNumber={candidature.service.user.phone_number}
            email={
              candidature.service.user.details?.email || "Email non disponible"
            }
            create_at={candidature.created_at}
            fullName={candidature.service.user.fullName}
            deadline={candidature.service.deadline}
            updated_at={candidature.updated_at}
            message={candidature.message}
            status={candidature.status}
          />
        ))}
      </div>
      <Pagination
        totalPosts={candidatures.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default DisplayCandidature;
