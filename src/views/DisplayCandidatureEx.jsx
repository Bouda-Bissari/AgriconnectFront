import { useEffect, useState } from "react";
import DetailCandidatureEx from "./DetailCandidatureEx";
import axiosClient from "../configs/axiosClient";
import Pagination from "../components/Pagination";
import SkeletonDetailCandidature from "../components/SkeletonDetailCandidature ";
import Loading from "@/components/Loading";

const DisplayCandidatureEx = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [statusUpdated, setStatusUpdated] = useState(false); 

  const userId = JSON.parse(localStorage.getItem("USER_ID"));

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axiosClient.get(
          `/candidatures/service-owner/${userId}`
        );
        setCandidatures(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        setStatusUpdated(false);
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
          Candidatures recues
        </h2>
        <div className="flex justify-center items-center flex-col md:gap-20 gap-20 w-full ">
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
          Candidatures recues
        </h2>
        <p className="text-gray-700">
          Vous n&apos;avez recue aucune candidature pour le moment.
        </p>
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
      <div className="grid grid-cols-1 w-4/5 md:grid-cols-1 md:gap-10 gap-2 ">
        {currentPosts.map((candidature) => (
          <DetailCandidatureEx
            key={candidature.id}
            id={candidature.id}
            title={candidature.service.title}
            description={candidature.service.description}
            image={candidature.service.image}
            price={candidature.service.price}
            phoneNumber={candidature.user.phone_number}
            email={candidature.details?.email || "Email non disponible"}
            create_at={candidature.created_at}
            fullName={candidature.user.fullName}
            message={candidature.message}
            status={candidature.status}
            setStatusUpdated={statusUpdated}
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

export default DisplayCandidatureEx;
