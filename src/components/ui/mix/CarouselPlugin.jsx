import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import images from "../../../assets/index"; // Assurez-vous que le chemin est correct

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

  // Définissez un tableau d'images spécifiques
  const specificImages = [
    images.Hero1,
    images.Hero2,
    images.Hero3,
    images.Hero4,
    images.Hero5,
    images.Hero6,
    images.Hero7,
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      className="hidden lg:block w-full h-full bg-cover bg-center"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {specificImages.map((image, index) => (
          <CarouselItem key={index} className="border-none">
            <div className="p-1">
              <Card className="border-none">
                <CardContent className="flex aspect-square items-center justify-center border-none m-0 p-0">
                  <img src={image} alt={`Image ${index + 1}`} className="object-cover w-full h-full rounded-xl" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
