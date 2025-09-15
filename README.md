# Private Shareholder Voice

A decentralized corporate governance platform that enables confidential shareholder voting using Fully Homomorphic Encryption (FHE) technology. Built on the Sepolia testnet with Zama's FHEVM integration.

## Features

- **Confidential Voting**: All votes are encrypted using FHE, ensuring complete privacy
- **Shareholder Verification**: Secure registration and verification system
- **Real-time Results**: Live voting statistics with encrypted data processing
- **Multiple Proposal Types**: Support for board elections, compensation votes, mergers, and more
- **Reputation System**: Encrypted reputation tracking for shareholders
- **Web3 Integration**: Seamless wallet connection with RainbowKit

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Web3**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: Zama FHEVM (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity ^0.8.24

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- MetaMask or compatible Web3 wallet
- Sepolia ETH for gas fees

### Installation

1. Clone the repository:
```bash
git clone https://github.com/L1BridgeDev/private-shareholder-voice.git
cd private-shareholder-voice
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Smart Contract

The `PrivateShareholderVoice.sol` contract implements:

- **Encrypted Voting**: All vote data is encrypted using FHE
- **Shareholder Management**: Registration and verification system
- **Proposal Management**: Create and manage corporate governance proposals
- **Reputation System**: Encrypted reputation tracking
- **Access Control**: Role-based permissions for different functions

### Contract Functions

- `createProposal()`: Create new governance proposals
- `castVote()`: Submit encrypted votes
- `registerShareholder()`: Register new shareholders
- `completeProposal()`: Finalize voting results
- `updateShareholderReputation()`: Manage reputation scores

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run preview
```

## Security Features

- **FHE Encryption**: All sensitive data is encrypted using Zama's FHEVM
- **Zero-Knowledge Privacy**: Vote choices remain private even from the contract
- **Access Control**: Role-based permissions for different operations
- **Verification System**: Multi-layer shareholder verification

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced proposal types
- [ ] Mobile application
- [ ] Integration with traditional corporate systems
- [ ] Enhanced reputation algorithms