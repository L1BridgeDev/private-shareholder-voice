# 🔐 Private Shareholder Voice

> **Revolutionary Corporate Governance with Zero-Knowledge Privacy**

A cutting-edge decentralized platform that transforms corporate governance through **Fully Homomorphic Encryption (FHE)** technology. Experience the future of shareholder voting where your choices remain completely private while maintaining full transparency and verifiability.

## 🌟 Why Private Shareholder Voice?

Traditional corporate voting systems expose shareholder preferences, creating potential for manipulation and coercion. Our platform solves this fundamental problem by ensuring:

- **🔒 Complete Vote Privacy**: Your voting choices are encrypted and never revealed
- **✅ Full Verifiability**: Results are mathematically provable without exposing individual votes
- **⚡ Real-time Processing**: Instant vote processing with encrypted computation
- **🌐 Decentralized Trust**: No single point of failure or manipulation

## 🚀 Key Features

### 🔐 **FHE-Encrypted Voting**
- All votes are encrypted using Zama's FHEVM technology
- Zero-knowledge proofs ensure vote integrity
- Mathematical guarantees of privacy preservation

### 👥 **Advanced Shareholder Management**
- Secure registration with encrypted share verification
- Dynamic voting power calculation based on holdings
- Reputation system with encrypted scoring

### 📊 **Real-time Governance Analytics**
- Live encrypted vote aggregation
- Participation rate tracking
- Proposal outcome prediction

### 🛡️ **Enterprise-Grade Security**
- Multi-signature proposal creation
- Time-locked voting periods
- Emergency governance controls

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   FHE Layer     │    │   Blockchain    │
│   (React/Vite)  │◄──►│   (Zama FHEVM)  │◄──►│   (Sepolia)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 18 + TypeScript + Vite | Modern, fast UI framework |
| **Styling** | Tailwind CSS + shadcn/ui | Beautiful, responsive design |
| **Web3** | RainbowKit + Wagmi + Viem | Seamless wallet integration |
| **Encryption** | Zama FHEVM | Fully homomorphic encryption |
| **Blockchain** | Ethereum Sepolia | Testnet deployment |
| **Smart Contracts** | Solidity ^0.8.24 | FHE-enabled governance logic |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **MetaMask** or compatible Web3 wallet
- **Sepolia ETH** for gas fees
- **Basic understanding** of Web3 concepts

### Installation

```bash
# Clone the repository
git clone https://github.com/L1BridgeDev/private-shareholder-voice.git
cd private-shareholder-voice

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Environment Configuration

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Contract Addresses (after deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_VERIFIER_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADMIN_ADDRESS=0x...
```

## 📋 Smart Contract Features

### Core Functions

```solidity
// Create encrypted governance proposals
function createProposal(
    string memory _title,
    string memory _description,
    uint256 _duration,
    uint256 _proposalType
) public onlyGovernanceAdmin returns (uint256)

// Cast encrypted votes with FHE
function castVote(
    uint256 proposalId,
    externalEuint32 votingPower,
    ebool voteChoice,
    bytes calldata inputProof
) public returns (uint256)

// Register shareholders with encrypted share data
function registerShareholder(
    address shareholder,
    externalEuint32 shareCount,
    bytes calldata inputProof
) public onlyVerifier returns (bool)
```

### Security Features

- **Role-based Access Control**: Owner, Verifier, and Governance Admin roles
- **Encrypted Data Storage**: All sensitive data encrypted with FHE
- **Vote Integrity**: Cryptographic proofs prevent double-voting
- **Emergency Controls**: Pause and recovery mechanisms

## 🔧 Development

### Local Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Link your GitHub repo to Vercel
2. **Configure Environment**: Set all required environment variables
3. **Deploy**: Automatic deployment on every push to main

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to your preferred platform
# The dist/ folder contains all static files
```

## 🔒 Security Considerations

### FHE Implementation
- All vote data encrypted using Zama's FHEVM
- Zero-knowledge proofs for vote verification
- Encrypted computation preserves privacy

### Smart Contract Security
- Multi-signature requirements for critical operations
- Time-locked governance changes
- Emergency pause functionality

### Frontend Security
- Secure wallet integration
- Input validation and sanitization
- HTTPS enforcement

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| **Vote Encryption Time** | < 100ms |
| **Contract Interaction** | < 2s |
| **Page Load Time** | < 1.5s |
| **Bundle Size** | < 500KB |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

## 📈 Roadmap

### Phase 1: Core Platform ✅
- [x] FHE-encrypted voting system
- [x] Shareholder registration
- [x] Basic governance proposals

### Phase 2: Advanced Features 🚧
- [ ] Multi-chain support
- [ ] Advanced proposal types
- [ ] Mobile application
- [ ] Integration APIs

### Phase 3: Enterprise Features 📋
- [ ] Custom governance rules
- [ ] Advanced analytics
- [ ] Compliance reporting
- [ ] White-label solutions

## 🆘 Support

### Documentation
- [Technical Documentation](./docs/)
- [API Reference](./docs/api.md)
- [Smart Contract Guide](./docs/contracts.md)

### Community
- **Discord**: [Join our community](https://discord.gg/privateshareholder)
- **Twitter**: [@PrivateShareholder](https://twitter.com/privateshareholder)
- **GitHub Issues**: [Report bugs or request features](https://github.com/L1BridgeDev/private-shareholder-voice/issues)

### Professional Support
For enterprise support and custom implementations, contact us at:
- **Email**: enterprise@privateshareholder.voice
- **Website**: [privateshareholder.voice](https://privateshareholder.voice)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zama** for FHEVM technology
- **RainbowKit** for wallet integration
- **Vercel** for deployment platform
- **OpenZeppelin** for security standards

---

<div align="center">

**Built with ❤️ for the future of corporate governance**

[![GitHub stars](https://img.shields.io/github/stars/L1BridgeDev/private-shareholder-voice?style=social)](https://github.com/L1BridgeDev/private-shareholder-voice)
[![Twitter Follow](https://img.shields.io/twitter/follow/privateshareholder?style=social)](https://twitter.com/privateshareholder)

</div>