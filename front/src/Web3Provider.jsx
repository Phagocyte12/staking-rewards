import { Web3ReactProvider, initializeConnector, useWeb3React } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

const onError = (error) => {
  console.error(error);
};

const [web3Injected, web3InjectedHooks] = initializeConnector((actions) => new MetaMask({ actions, onError }));

const InitializeConnection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: 'Injected'
};

const connections = [InitializeConnection];

export function Web3Provider({ children }) {
  const connectors = connections.map(({ hooks, connector }) => [connector, hooks]);
  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>;
}
