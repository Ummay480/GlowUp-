import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const portfolioImages = [
  { src: '/portfolio/artist-1.jpg', hint: 'makeup artist' },
  { src: '/portfolio/artist-2.jpg', hint: 'makeup artist' },
  { src: '/portfolio/artist-3.jpg', hint: 'makeup artist' },
  { src: '/portfolio/artist-4.jpg', hint: 'makeup artist' },
  { src: '/portfolio/artist-5.jpg', hint: 'makeup artist' },
  { src: '/portfolio/artist-6.jpg', hint: 'makeup artist' },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">Our Work</h2>
        <Carousel opts={{ loop: true }} className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {portfolioImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="flex aspect-[3/4] items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={`Portfolio image ${index + 1}`}
                        data-ai-hint={image.hint}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
