import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import images from "../../../assets/index"; // Assurez-vous que le chemin est correct

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Définissez un tableau d'images spécifiques
  const specificImages = [
    images.Image12,
    images.Image2,
    images.Image3,
    images.Image11,
    images.Image22,
    images.Image20,
    images.Image7,
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="hidden lg:block w-full bg-cover bg-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-96"> {/* Ajustez la hauteur du carousel ici */}
        {specificImages.map((image, index) => (
          <CarouselItem key={index} className="border-none">
            <div className="p-1 h-full">
              <Card className="border-none h-full">
                <CardContent className="flex items-center justify-center p-0 h-full">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="object-cover h-full w-full rounded-xl" // Utilisez h-full pour que l'image prenne toute la hauteur
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
