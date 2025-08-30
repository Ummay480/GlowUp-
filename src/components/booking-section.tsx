import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingSection() {
  return (
    <section id="booking" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-headline text-4xl font-bold mb-4">Book Your Appointment</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Ready for your transformation? Schedule your session with us today.
        </p>
        <Card className="max-w-3xl mx-auto text-left">
            <CardHeader>
                <CardTitle className="font-headline">Schedule a Session</CardTitle>
                <CardDescription>Our booking is handled through Calendly for your convenience. Click the button below to open the scheduler.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-8 bg-background rounded-lg text-center border-dashed border-2 border-border">
                    <p className="text-muted-foreground mb-4">
                        Booking system embed will appear here.
                    </p>
                    <Button asChild size="lg">
                        <a href="https://calendly.com" target="_blank" rel="noopener noreferrer">
                            Book Now
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
