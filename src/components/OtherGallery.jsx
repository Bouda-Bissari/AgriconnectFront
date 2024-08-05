import Image1 from "/src/assets/Image21.jpg";
import Image2 from "/src/assets/Image19.jpg";
const OtherGallery = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-10 mb-5">
        <img
          className="w-full rounded-lg"
          src={Image1}
          alt="office content 1"
        />
        <img
          className="mt-4 w-full lg:mt-10 rounded-lg"
          src={Image2}
          alt="office content 2"
        />
      </div>
    </div>
  );
};

export default OtherGallery;
