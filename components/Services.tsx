import { LineChart, Lock, Webhook } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    name: 'API Access',
    icon: Webhook,
    description: 'Access blockchain data through our API',
  },
  {
    name: 'Analytics',
    icon: LineChart,
    description: 'Advanced blockchain analytics and charts',
  },
  {
    name: 'Privacy',
    icon: Lock,
    description: 'Your privacy is our top priority',
  },
];

export default function Services() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.name} className="bg-white dark:bg-[#2d3748] border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-[#1c75c4]/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-[#1c75c4]" />
                </div>
                <h3 className="font-semibold text-lg">{service.name}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}