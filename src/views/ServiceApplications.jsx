import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../configs/axiosClient";
import DetailCandidature from "./DetailCandidature";
import Pagination from "../components/Pagination";
import Loading from "@/components/Loading";

const ServiceApplications = () => {
  const { jobId } = useParams();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosClient.get(`/candidatures/service/${jobId}`);
        setCandidatures(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) {
    return (
      <div className="my-20 w-full flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Candidatures du Service
        </h2>
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      </div>
    );
  }

  if (error) return <p className="mt-40">Erreur : {error.message}</p>;

  if (candidatures.length === 0) {
    return (
      <div className="my-20 flex justify-center items-center flex-col">
        <h2
          className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
          style={{ fontFamily: "poetsen" }}
        >
          Candidatures du Service
        </h2>
        <p className="text-gray-700">Aucune candidature trouvée pour ce service.</p>
      </div>
    );
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = candidatures.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="my-20 flex justify-center items-center flex-col  p-10">
      <h2
        className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-green-600 pb-2"
        style={{ fontFamily: "poetsen" }}
      >
        Candidatures du Service
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 md:gap-10 gap-2 ">
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

export default ServiceApplications;
