import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import images from '../../../assets/index'; // Assurez-vous que le chemin est correct

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Convertir les images en tableau de valeurs pour faciliter l'accès (hum c'est compliquer)
  const imageArray = Object.values(images);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="hidden lg:block w-full h-full bg-cover bg-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => {
          // Sélectionner une image aléatoire
          const randomImage = imageArray[Math.floor(Math.random() * imageArray.length)];
          
          return (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center border-none m-0 p-0">
                    <img src={randomImage} alt={`Image ${index + 1}`} className="object-cover w-full h-full" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
