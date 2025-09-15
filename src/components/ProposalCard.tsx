import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  totalEligible: number;
  userVoted: boolean;
}

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (proposalId: string, vote: 'for' | 'against') => void;
}

export function ProposalCard({ proposal, onVote }: ProposalCardProps) {
  const [voting, setVoting] = useState(false);
  const { toast } = useToast();
  
  const handleVote = async (vote: 'for' | 'against') => {
    setVoting(true);
    try {
      onVote(proposal.id, vote);
      toast({
        title: "Vote Submitted",
        description: "Your encrypted vote has been recorded successfully.",
      });
    } catch (error) {
      toast({
        title: "Vote Failed",
        description: "There was an error submitting your vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const participationRate = (proposal.totalVotes / proposal.totalEligible) * 100;
  const approvalRate = proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0;

  const getStatusIcon = () => {
    switch (proposal.status) {
      case 'active':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = () => {
    switch (proposal.status) {
      case 'active':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card-custom border border-border/50 hover:shadow-corporate transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-foreground">
              {proposal.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {proposal.description}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor()} flex items-center space-x-1`}>
            {getStatusIcon()}
            <span className="capitalize">{proposal.status}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{proposal.totalVotes} of {proposal.totalEligible} votes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="h-4 w-4" />
            <span>Ends {new Date(proposal.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Participation Rate</span>
            <span className="font-medium">{participationRate.toFixed(1)}%</span>
          </div>
          <Progress value={participationRate} className="h-2" />
        </div>

        {proposal.totalVotes > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Approval Rate</span>
              <span className="font-medium">{approvalRate.toFixed(1)}%</span>
            </div>
            <Progress value={approvalRate} className="h-2" />
          </div>
        )}

        {proposal.status === 'active' && !proposal.userVoted && (
          <div className="flex space-x-2 pt-2">
            <Button
              variant="vote"
              size="sm"
              onClick={() => handleVote('for')}
              disabled={voting}
              className="flex-1"
            >
              <CheckCircle className="h-4 w-4" />
              Vote For
            </Button>
            <Button
              variant="vote"
              size="sm"
              onClick={() => handleVote('against')}
              disabled={voting}
              className="flex-1"
            >
              <XCircle className="h-4 w-4" />
              Vote Against
            </Button>
          </div>
        )}

        {proposal.userVoted && (
          <div className="flex items-center justify-center space-x-2 pt-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your encrypted vote has been recorded</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}