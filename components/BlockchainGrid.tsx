import { Bitcoin, Feather } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const blockchains = [
  {
    name: 'Bitcoin',
    icon: Bitcoin,
    description: 'Enhanced transparency',
  },
  {
    name: 'Ethereum',
    icon: Feather,
    description: 'Real-time access',
  },
  {
    name: 'BSC',
    icon: Feather,
    description: 'Check the validity of the receipt',
  },
];

export default function BlockchainGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blockchains.map((blockchain) => (
        <Card key={blockchain.name} className="bg-white dark:bg-[#2d3748] border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-[#1c75c4]/10 flex items-center justify-center">
                <blockchain.icon className="h-6 w-6 text-[#1c75c4]" />
              </div>
              <h3 className="font-semibold text-lg">{blockchain.name}</h3>
              <p className="text-muted-foreground">{blockchain.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}