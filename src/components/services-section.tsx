import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brush, Sparkles, PartyPopper } from 'lucide-react';

const services = [
  {
    icon: <Brush className="w-10 h-10 text-primary" />,
    title: 'Bridal Makeup',
    description: 'Look your absolute best on your special day. Includes a trial session.',
    price: '$350',
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: 'Event Glam',
    description: 'Perfect for proms, parties, or any event where you want to shine.',
    price: '$150',
  },
  {
    icon: <PartyPopper className="w-10 h-10 text-primary" />,
    title: 'Photoshoot Ready',
    description: 'Camera-ready makeup that looks flawless in any light.',
    price: '$200',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-headline text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center bg-accent/20 dark:bg-accent/50 hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-background rounded-full p-4 w-fit mb-4 border">
                    {service.icon}
                </div>
                <CardTitle className="font-headline">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 min-h-[40px]">{service.description}</p>
                <p className="font-bold text-xl text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
