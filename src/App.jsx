import { useNetwork, useSwitchNetwork } from "wagmi";

import Card from './component/presaleCard/card'
import './index.css'
import { useEffect } from "react";



function App() {
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    try {
      const sameChain = chains?.find((network) => network.id === chain?.id);
      if (chain?.id && !sameChain) {
        switchNetwork(97);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [chain, chains, switchNetwork]);

  return (
    <div className='flex items-center justify-center h-screen'>
      <Card />
    </div>
  )
}

export default App