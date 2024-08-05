import Banner from "../components/Banner.jsx";
import ForYou from "../components/ForYou.jsx";
import Hero from "../components/Hero.jsx";


import ServicesWork from "../components/ServicesWork.jsx";

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
        <ForYou />
      </div>
    </div>
  );
}
