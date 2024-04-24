import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { bscTestnet, bsc } from "viem/chains";
import { w3mConnectors, w3mProvider } from "@web3modal/ethereum";
const projectId = "d723ba02a9f43eaa7a22d24b846ee603";

const metadata = {
  name: "ABCCOIN",
  description: "ABC ICO",
  url: "https://infiniti-coin-web.netlify.app/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};


const chains = [bscTestnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});


createWeb3Modal({ wagmiConfig, projectId, chains });


ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WagmiConfig>

)
