import Banner from "../components/Banner.jsx";
import ForYou from "../components/ForYou.jsx";
// import Hero from "../components/Hero.jsx";
// import ServicesWork from "../components/ServicesWork.jsx";
// import ServicesMaterial from "@/components/ServicesMaterial.jsx";
// import ClickPas from "./ClickPas.jsx";
// import DisplayCandidatureEx from "./DisplayCandidatureEx.jsx";
import CenteredServicesWork from "@/components/CenteredServicesWork.jsx";
import Header from "@/components/Head.jsx";
import CenteredServicesMaterial from "@/components/CenteredServicesMaterial.jsx";


export function Acceuil() {
  // const handleScrollToSavoir = () => {
  //   savoirRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  return (
    <div>
      <div>
        <Header />
      </div>
      {/* <div>
        <Hero />
      </div> */}
      {/* <div ref={savoirRef}>
        <Savoir />
      </div> */}
      <div>
        <Banner />
      </div>
      {/* <div>
        <ServicesWork />
      </div> */}
      <div>
        <CenteredServicesWork />
      </div>
      <div>
        <CenteredServicesMaterial />
      </div>
     
     
  
      
    

      <div>
        <ForYou />
      </div>

    </div>
  );
}
