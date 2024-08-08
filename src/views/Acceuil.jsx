import Banner from "../components/Banner.jsx";
import ForYou from "../components/ForYou.jsx";
import Hero from "../components/Hero.jsx";
import ProfilCard from "../components/ProfilCard.jsx";


import ServicesWork from "../components/ServicesWork.jsx";
import Skeleton from "../components/Skeleton.jsx";

export function Acceuil() {
  // const handleScrollToSavoir = () => {
  //   savoirRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <div>
      <div>
        <Hero />
      </div>
      {/* <div ref={savoirRef}>
        <Savoir />
      </div> */}
      <div>
        <Banner />
      </div>
      <div>
        <ServicesWork />
      </div>
      <div>
        <ProfilCard />
      </div>
      <div>
        <Skeleton />
      </div>
      <div>
        <ForYou />
      </div>
    </div>
  );
}
