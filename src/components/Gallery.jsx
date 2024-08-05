import { Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9, Image10, Image11, Image12,  Image14, Image15, Image16, Image17, Image18 } from '../assets/index.js';
function Gallery() {
  return (
    <div>
      <div className="grid grid-cols-6 col-span-2   gap-2  ">
        <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
          <img
            className="h-full w-full object-cover "
            src={Image1}
            alt=""
          />
        </div>
        <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
          <img
            className="h-full w-full object-cover  "
            src={Image2}
            alt=""
          />
        </div>
        <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
          <img
            className="h-full w-full object-cover "
            src={Image18}
            alt=""
          />
        </div>
        <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
          <img
            className="h-full w-full object-cover "
            src={Image6}
            alt=""
          />
        </div>
        <div className="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
          <img
            className="h-full w-full object-cover "
            src={Image8}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
