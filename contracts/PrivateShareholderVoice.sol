// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PrivateShareholderVoice is SepoliaConfig {
    using FHE for *;
    
    struct Proposal {
        euint32 proposalId;
        euint32 votesFor;
        euint32 votesAgainst;
        euint32 totalVotes;
        euint32 totalEligibleVoters;
        bool isActive;
        bool isCompleted;
        string title;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 proposalType; // 0: Board Election, 1: Compensation, 2: Merger, etc.
    }
    
    struct Vote {
        euint32 voteId;
        euint32 proposalId;
        ebool voteChoice; // true for "for", false for "against"
        address voter;
        uint256 timestamp;
        euint32 votingPower; // Encrypted voting power based on shares
    }
    
    struct Shareholder {
        euint32 shareCount;
        euint32 votingPower;
        bool isVerified;
        address wallet;
        uint256 registrationTime;
    }
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => Vote) public votes;
    mapping(address => Shareholder) public shareholders;
    mapping(address => euint32) public shareholderReputation;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    
    uint256 public proposalCounter;
    uint256 public voteCounter;
    uint256 public totalShareholders;
    
    address public owner;
    address public verifier;
    address public governanceAdmin;
    
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed voteId, uint256 indexed proposalId, address indexed voter);
    event ProposalCompleted(uint256 indexed proposalId, bool passed);
    event ShareholderRegistered(address indexed shareholder, uint32 shareCount);
    event ReputationUpdated(address indexed shareholder, uint32 reputation);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    modifier onlyGovernanceAdmin() {
        require(msg.sender == governanceAdmin, "Only governance admin can call this function");
        _;
    }
    
    constructor(address _verifier, address _governanceAdmin) {
        owner = msg.sender;
        verifier = _verifier;
        governanceAdmin = _governanceAdmin;
    }
    
    function createProposal(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _proposalType
    ) public onlyGovernanceAdmin returns (uint256) {
        require(bytes(_title).length > 0, "Proposal title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0), // Will be set properly later
            votesFor: FHE.asEuint32(0),
            votesAgainst: FHE.asEuint32(0),
            totalVotes: FHE.asEuint32(0),
            totalEligibleVoters: FHE.asEuint32(totalShareholders),
            isActive: true,
            isCompleted: false,
            title: _title,
            description: _description,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            proposalType: _proposalType
        });
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(
        uint256 proposalId,
        externalEuint32 votingPower,
        ebool voteChoice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted on this proposal");
        require(shareholders[msg.sender].isVerified, "Shareholder not verified");
        
        uint256 voteId = voteCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVotingPower = FHE.fromExternal(votingPower, inputProof);
        
        votes[voteId] = Vote({
            voteId: FHE.asEuint32(0), // Will be set properly later
            proposalId: FHE.asEuint32(proposalId),
            voteChoice: voteChoice,
            voter: msg.sender,
            timestamp: block.timestamp,
            votingPower: internalVotingPower
        });
        
        // Update proposal totals
        proposals[proposalId].totalVotes = FHE.add(proposals[proposalId].totalVotes, FHE.asEuint32(1));
        
        // Add to votes for or against based on choice
        ebool isForVote = voteChoice;
        euint32 powerForVote = FHE.select(isForVote, internalVotingPower, FHE.asEuint32(0));
        euint32 powerAgainstVote = FHE.select(isForVote, FHE.asEuint32(0), internalVotingPower);
        
        proposals[proposalId].votesFor = FHE.add(proposals[proposalId].votesFor, powerForVote);
        proposals[proposalId].votesAgainst = FHE.add(proposals[proposalId].votesAgainst, powerAgainstVote);
        
        hasVoted[proposalId][msg.sender] = true;
        
        emit VoteCast(voteId, proposalId, msg.sender);
        return voteId;
    }
    
    function completeProposal(uint256 proposalId) public onlyGovernanceAdmin {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period not ended");
        
        proposals[proposalId].isActive = false;
        proposals[proposalId].isCompleted = true;
        
        // Determine if proposal passed (this would need to be decrypted off-chain)
        // For now, we'll emit a placeholder result
        emit ProposalCompleted(proposalId, true);
    }
    
    function registerShareholder(
        address shareholder,
        externalEuint32 shareCount,
        bytes calldata inputProof
    ) public onlyVerifier returns (bool) {
        require(shareholder != address(0), "Invalid shareholder address");
        require(!shareholders[shareholder].isVerified, "Shareholder already registered");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalShareCount = FHE.fromExternal(shareCount, inputProof);
        
        shareholders[shareholder] = Shareholder({
            shareCount: internalShareCount,
            votingPower: internalShareCount, // 1 share = 1 vote for simplicity
            isVerified: true,
            wallet: shareholder,
            registrationTime: block.timestamp
        });
        
        totalShareholders++;
        
        emit ShareholderRegistered(shareholder, 0); // FHE.decrypt(internalShareCount) - will be decrypted off-chain
        return true;
    }
    
    function updateShareholderReputation(
        address shareholder,
        euint32 reputation
    ) public onlyVerifier {
        require(shareholders[shareholder].isVerified, "Shareholder not registered");
        require(shareholder != address(0), "Invalid shareholder address");
        
        shareholderReputation[shareholder] = reputation;
        
        emit ReputationUpdated(shareholder, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        string memory title,
        string memory description,
        uint8 votesFor,
        uint8 votesAgainst,
        uint8 totalVotes,
        uint8 totalEligibleVoters,
        bool isActive,
        bool isCompleted,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        uint256 proposalType
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.title,
            proposal.description,
            0, // FHE.decrypt(proposal.votesFor) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.votesAgainst) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalVotes) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.totalEligibleVoters) - will be decrypted off-chain
            proposal.isActive,
            proposal.isCompleted,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.proposalType
        );
    }
    
    function getVoteInfo(uint256 voteId) public view returns (
        uint8 proposalId,
        bool voteChoice,
        address voter,
        uint256 timestamp,
        uint8 votingPower
    ) {
        Vote storage vote = votes[voteId];
        return (
            0, // FHE.decrypt(vote.proposalId) - will be decrypted off-chain
            false, // FHE.decrypt(vote.voteChoice) - will be decrypted off-chain
            vote.voter,
            vote.timestamp,
            0 // FHE.decrypt(vote.votingPower) - will be decrypted off-chain
        );
    }
    
    function getShareholderInfo(address shareholder) public view returns (
        uint8 shareCount,
        uint8 votingPower,
        bool isVerified,
        uint256 registrationTime
    ) {
        Shareholder storage sh = shareholders[shareholder];
        return (
            0, // FHE.decrypt(sh.shareCount) - will be decrypted off-chain
            0, // FHE.decrypt(sh.votingPower) - will be decrypted off-chain
            sh.isVerified,
            sh.registrationTime
        );
    }
    
    function getShareholderReputation(address shareholder) public view returns (uint8) {
        return 0; // FHE.decrypt(shareholderReputation[shareholder]) - will be decrypted off-chain
    }
    
    function hasShareholderVoted(uint256 proposalId, address shareholder) public view returns (bool) {
        return hasVoted[proposalId][shareholder];
    }
    
    function getTotalShareholders() public view returns (uint256) {
        return totalShareholders;
    }
    
    // Emergency functions
    function pauseProposal(uint256 proposalId) public onlyOwner {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        proposals[proposalId].isActive = false;
    }
    
    function updateVerifier(address newVerifier) public onlyOwner {
        require(newVerifier != address(0), "Invalid verifier address");
        verifier = newVerifier;
    }
    
    function updateGovernanceAdmin(address newAdmin) public onlyOwner {
        require(newAdmin != address(0), "Invalid admin address");
        governanceAdmin = newAdmin;
    }
}
