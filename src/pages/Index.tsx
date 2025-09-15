import { VotingHeader } from '@/components/VotingHeader';
import { VotingDashboard } from '@/components/VotingDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <VotingHeader />
      <VotingDashboard />
    </div>
  );
};

export default Index;
