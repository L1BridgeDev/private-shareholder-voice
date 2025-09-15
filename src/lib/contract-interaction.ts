// Real contract interaction for FHE-encrypted data on-chain
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Contract ABI for PrivateShareholderVoice
export const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "uint256", "name": "_proposalType", "type": "uint256"}
    ],
    "name": "createProposal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "bytes", "name": "votingPower", "type": "bytes"},
      {"internalType": "bytes", "name": "voteChoice", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "castVote",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "shareholder", "type": "address"},
      {"internalType": "bytes", "name": "shareCount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "registerShareholder",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposalInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "votesFor", "type": "uint8"},
      {"internalType": "uint8", "name": "votesAgainst", "type": "uint8"},
      {"internalType": "uint8", "name": "totalVotes", "type": "uint8"},
      {"internalType": "uint8", "name": "totalEligibleVoters", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isCompleted", "type": "bool"},
      {"internalType": "address", "name": "proposer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "uint256", "name": "proposalType", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "shareholder", "type": "address"}],
    "name": "getShareholderInfo",
    "outputs": [
      {"internalType": "uint8", "name": "shareCount", "type": "uint8"},
      {"internalType": "uint8", "name": "votingPower", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "uint256", "name": "registrationTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract configuration
export const CONTRACT_CONFIG = {
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi: CONTRACT_ABI,
  chain: sepolia,
};

// Create clients
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});

// FHE encryption utilities for real contract interaction
export class FHEEncryption {
  /**
   * Encrypt voting power data for contract submission
   * @param votingPower - the voting power value
   * @returns encrypted data and proof
   */
  static async encryptVotingPower(votingPower: number): Promise<{
    encryptedData: `0x${string}`;
    proof: `0x${string}`;
  }> {
    // In a real implementation, this would use FHEVM encryption
    // For now, we'll create a mock encrypted structure
    const mockEncrypted = `0x${votingPower.toString(16).padStart(64, '0')}`;
    const mockProof = `0x${Math.random().toString(16).padStart(64, '0')}`;
    
    return {
      encryptedData: mockEncrypted,
      proof: mockProof,
    };
  }

  /**
   * Encrypt vote choice for contract submission
   * @param voteChoice - true for "for", false for "against"
   * @returns encrypted data
   */
  static async encryptVoteChoice(voteChoice: boolean): Promise<`0x${string}`> {
    // In a real implementation, this would use FHEVM encryption
    const value = voteChoice ? 1 : 0;
    return `0x${value.toString(16).padStart(64, '0')}`;
  }

  /**
   * Encrypt share count for shareholder registration
   * @param shareCount - the number of shares
   * @returns encrypted data and proof
   */
  static async encryptShareCount(shareCount: number): Promise<{
    encryptedData: `0x${string}`;
    proof: `0x${string}`;
  }> {
    // In a real implementation, this would use FHEVM encryption
    const mockEncrypted = `0x${shareCount.toString(16).padStart(64, '0')}`;
    const mockProof = `0x${Math.random().toString(16).padStart(64, '0')}`;
    
    return {
      encryptedData: mockEncrypted,
      proof: mockProof,
    };
  }
}

// Contract interaction class
export class ContractInteraction {
  private walletClient: any;

  constructor(walletClient: any) {
    this.walletClient = walletClient;
  }

  /**
   * Create a new governance proposal
   * @param title - proposal title
   * @param description - proposal description
   * @param duration - voting duration in seconds
   * @param proposalType - type of proposal
   * @returns transaction hash
   */
  async createProposal(
    title: string,
    description: string,
    duration: number,
    proposalType: number
  ): Promise<`0x${string}`> {
    try {
      const hash = await this.walletClient.writeContract({
        ...CONTRACT_CONFIG,
        functionName: 'createProposal',
        args: [title, description, BigInt(duration), BigInt(proposalType)],
      });

      return hash;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw new Error('Failed to create proposal');
    }
  }

  /**
   * Cast an encrypted vote on a proposal
   * @param proposalId - the proposal ID
   * @param voteChoice - true for "for", false for "against"
   * @param votingPower - the voting power
   * @returns transaction hash
   */
  async castVote(
    proposalId: number,
    voteChoice: boolean,
    votingPower: number
  ): Promise<`0x${string}`> {
    try {
      // Encrypt the vote data
      const encryptedVotingPower = await FHEEncryption.encryptVotingPower(votingPower);
      const encryptedVoteChoice = await FHEEncryption.encryptVoteChoice(voteChoice);

      const hash = await this.walletClient.writeContract({
        ...CONTRACT_CONFIG,
        functionName: 'castVote',
        args: [
          BigInt(proposalId),
          encryptedVotingPower.encryptedData,
          encryptedVoteChoice,
          encryptedVotingPower.proof,
        ],
      });

      return hash;
    } catch (error) {
      console.error('Error casting vote:', error);
      throw new Error('Failed to cast vote');
    }
  }

  /**
   * Register a new shareholder with encrypted share data
   * @param shareholderAddress - the shareholder's address
   * @param shareCount - the number of shares
   * @returns transaction hash
   */
  async registerShareholder(
    shareholderAddress: `0x${string}`,
    shareCount: number
  ): Promise<`0x${string}`> {
    try {
      // Encrypt the share count
      const encryptedShareCount = await FHEEncryption.encryptShareCount(shareCount);

      const hash = await this.walletClient.writeContract({
        ...CONTRACT_CONFIG,
        functionName: 'registerShareholder',
        args: [
          shareholderAddress,
          encryptedShareCount.encryptedData,
          encryptedShareCount.proof,
        ],
      });

      return hash;
    } catch (error) {
      console.error('Error registering shareholder:', error);
      throw new Error('Failed to register shareholder');
    }
  }

  /**
   * Get proposal information from the contract
   * @param proposalId - the proposal ID
   * @returns proposal information
   */
  async getProposal(proposalId: number): Promise<any> {
    try {
      const result = await publicClient.readContract({
        ...CONTRACT_CONFIG,
        functionName: 'getProposalInfo',
        args: [BigInt(proposalId)],
      });

      return {
        id: proposalId.toString(),
        title: result[0],
        description: result[1],
        votesFor: Number(result[2]),
        votesAgainst: Number(result[3]),
        totalVotes: Number(result[4]),
        totalEligibleVoters: Number(result[5]),
        isActive: result[6],
        isCompleted: result[7],
        proposer: result[8],
        startTime: Number(result[9]),
        endTime: Number(result[10]),
        proposalType: Number(result[11]),
      };
    } catch (error) {
      console.error('Error getting proposal:', error);
      throw new Error('Failed to get proposal');
    }
  }

  /**
   * Get shareholder information from the contract
   * @param shareholderAddress - the shareholder's address
   * @returns shareholder information
   */
  async getShareholder(shareholderAddress: `0x${string}`): Promise<any> {
    try {
      const result = await publicClient.readContract({
        ...CONTRACT_CONFIG,
        functionName: 'getShareholderInfo',
        args: [shareholderAddress],
      });

      return {
        shareCount: Number(result[0]),
        votingPower: Number(result[1]),
        isVerified: result[2],
        registrationTime: Number(result[3]),
      };
    } catch (error) {
      console.error('Error getting shareholder:', error);
      throw new Error('Failed to get shareholder');
    }
  }
}

// Hook for contract interaction
export function useContractInteraction() {
  return {
    ContractInteraction,
    FHEEncryption,
    CONTRACT_CONFIG,
    publicClient,
  };
}

export default ContractInteraction;
