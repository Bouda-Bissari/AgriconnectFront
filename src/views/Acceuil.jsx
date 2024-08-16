import Banner from "../components/Banner.jsx";
import ForYou from "../components/ForYou.jsx";
import Hero from "../components/Hero.jsx";
import CarouselPlugin from '../components/ui/mix/CarouselPlugin.jsx'
import ServicesWork from "../components/ServicesWork.jsx";
import DisplayCandidature from "./DisplayCandidature.jsx";
import SkeletonDetailCandidature from "@/components/SkeletonDetailCandidature .jsx";

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
        <SkeletonDetailCandidature />
      </div>
      
      <div>
        <DisplayCandidature />
      </div>
      
     
<div className="m-20">
<CarouselPlugin/>

</div>

      <div>
        <ForYou />
      </div>
    </div>
  );
}
