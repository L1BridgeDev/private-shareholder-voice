import { useState } from 'react';
import { ProposalCard } from './ProposalCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, Vote, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockProposals = [
  {
    id: '1',
    title: 'Board of Directors Election 2024',
    description: 'Vote for the new board members to serve a three-year term beginning January 2024.',
    status: 'active' as const,
    endDate: '2024-01-15',
    votesFor: 1247,
    votesAgainst: 423,
    totalVotes: 1670,
    totalEligible: 2500,
    userVoted: false,
  },
  {
    id: '2',
    title: 'Executive Compensation Package',
    description: 'Approve the proposed executive compensation structure for senior leadership.',
    status: 'active' as const,
    endDate: '2024-01-20',
    votesFor: 890,
    votesAgainst: 1100,
    totalVotes: 1990,
    totalEligible: 2500,
    userVoted: false,
  },
  {
    id: '3',
    title: 'Merger with TechCorp Industries',
    description: 'Strategic merger proposal to combine operations with TechCorp Industries.',
    status: 'completed' as const,
    endDate: '2023-12-30',
    votesFor: 1850,
    votesAgainst: 650,
    totalVotes: 2500,
    totalEligible: 2500,
    userVoted: true,
  },
];

export function VotingDashboard() {
  const [proposals, setProposals] = useState(mockProposals);

  const handleVote = (proposalId: string, vote: 'for' | 'against') => {
    setProposals(prev => 
      prev.map(proposal => 
        proposal.id === proposalId 
          ? { 
              ...proposal, 
              userVoted: true,
              votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
              votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst,
              totalVotes: proposal.totalVotes + 1,
            }
          : proposal
      )
    );
  };

  const activeProposals = proposals.filter(p => p.status === 'active');
  const completedProposals = proposals.filter(p => p.status === 'completed');
  const totalEligibleVoters = 2500;
  const totalActiveVoters = activeProposals.reduce((sum, p) => sum + p.totalVotes, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-card-custom border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Proposals</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{activeProposals.length}</div>
              <p className="text-xs text-muted-foreground">Requiring your vote</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card-custom border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligible Voters</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalEligibleVoters.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Registered shareholders</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card-custom border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {((totalActiveVoters / (totalEligibleVoters * activeProposals.length)) * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Average participation</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card-custom border border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Status</CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Encrypted</div>
              <p className="text-xs text-muted-foreground">Zero-knowledge privacy</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Proposals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground">Active Proposals</h2>
              <p className="text-sm text-muted-foreground">
                Vote on current corporate governance matters
              </p>
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              {activeProposals.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeProposals.map(proposal => (
              <ProposalCard 
                key={proposal.id} 
                proposal={proposal} 
                onVote={handleVote}
              />
            ))}
          </div>
        </div>

        {/* Completed Proposals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-foreground">Recent Results</h2>
              <p className="text-sm text-muted-foreground">
                View outcomes of completed votes
              </p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {completedProposals.length} Completed
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedProposals.map(proposal => (
              <ProposalCard 
                key={proposal.id} 
                proposal={proposal} 
                onVote={handleVote}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}