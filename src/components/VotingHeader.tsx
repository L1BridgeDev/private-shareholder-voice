import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Shield, Lock } from 'lucide-react';

export function VotingHeader() {
  return (
    <header className="border-b border-border bg-gradient-subtle shadow-card-custom">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-corporate rounded-lg shadow-glow">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Private Shareholder Voice
                </h1>
                <p className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Lock className="h-3 w-3" />
                  <span>FHE-Encrypted Corporate Governance</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Shareholder Access</p>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="bg-gradient-corporate text-primary-foreground hover:shadow-glow transition-bounce font-semibold h-11 rounded-md px-8 inline-flex items-center justify-center gap-2"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type="button"
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 rounded-md px-8 inline-flex items-center justify-center gap-2"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={openChainModal}
                              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 inline-flex items-center justify-center gap-2"
                              type="button"
                            >
                              {chain.hasIcon && (
                                <div
                                  className="w-4 h-4 rounded-full overflow-hidden"
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      className="w-4 h-4"
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button
                              onClick={openAccountModal}
                              type="button"
                              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-corporate h-9 rounded-md px-3 inline-flex items-center justify-center gap-2"
                            >
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ''}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}