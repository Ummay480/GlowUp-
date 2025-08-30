"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const handleScroll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, selector: string) => {
    e.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section
  id="home"
  className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-primary-foreground"
>
  <Image
    src="https://picsum.photos/1200/800"
    alt="Makeup artist applying makeup"
    data-ai-hint="makeup application"
    fill
    className="object-cover z-0"
    priority
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="z-20 p-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg">GlowUp Studio</h1>
        <p className="font-body text-xl md:text-2xl mt-4 max-w-2xl mx-auto drop-shadow-md">
          Crafting Beauty, Inspiring Confidence.
        </p>
        <Button size="lg" className="mt-8" onClick={(e) => handleScroll(e, '#services')}>
          View Our Services
        </Button>
      </div>
    </section>
  );
}
