import Autoplay from "embla-carousel-autoplay";
import images from "../../../assets/index"; // Assurez-vous que le chemin est correct

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useRef } from "react";

export default function CarouselPlugin() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // Définissez un tableau d'images spécifiques
  const specificImages = [
    images.Image12,
    images.back1,
    images.back2,
    images.back7,
    images.back3,
    images.back4,
    images.back5,
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="hidden lg:block w-full bg-cover bg-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-96">
        {" "}
        {/* Ajustez la hauteur du carousel ici */}
        {specificImages.map((image, index) => (
          <CarouselItem
            key={index}
            className="border-none"

            // opts={{
            //   align: "start",
            //   loop: true,
            // }}
          >
            <div className="p-1 h-full">
              <Card className="border-none h-full">
                <CardContent className="flex items-center justify-center p-0 h-full">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="object-cover h-full w-full rounded-xl"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
