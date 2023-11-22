import React, { useState } from 'react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Types, AptosClient, Provider, Network } from 'aptos';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export const provider = new Provider(Network.DEVNET);
export const moduleAddress = "0xa88897f762d534368fd752ddc32c1190105b3b612f805efd83498a7d5904f446";


function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const { account, signAndSubmitTransaction } = useWallet();

  const fetchCounter = () => {
    setInterval(async () => {
    if (!account) return;

    try {
      const counterResource = await provider.getAccountResource(moduleAddress, `${moduleAddress}::CounterPackage::GlobalCounter`);
      console.log(counterResource);
      const counter = (counterResource as any).data.counter as number;
      setCount(counter);
      setAddress(account.address);
    }
    catch (e) {
      console.error(e);
    }
  }, 3000);
  }


  const handleClick = async () => {
    // alert("hola")
    if(!account) return;
    const new_value = count + 1;
    // const payload   = {
    //   type: "entry_function_payload",
    //   function: `${moduleAddress}::Counter::click`,
    //   type_arguments:[],
    //   arguments: [],
    // };
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::CounterPackage::click`,
      type_arguments: [],
      arguments: [],
    };
    console.log(payload);
    // const entryFunctionPayload = new TxnBuilderTypes.Tra
    // const raw = await provider.generateTransactionData(account.address, entryFunctionPayload);
    try{
      console.log({account})
      console.log(signAndSubmitTransaction)
      const response = await signAndSubmitTransaction(payload as any);
      console.log(response);
      await provider.waitForTransaction(response.hash);
      setCount((count) => count + 1);
    }
    catch (e) {
      // console.error(e);
      console.error("Error signing and submitting transaction:", e);
      console.error("Payload:", payload);
    }
  }

  React.useEffect(() => {
    fetchCounter();
  }, [account?.address]);

  /**
   * Initiate the wallet connection
   */
  const connectWallet = async () => {
    try {
      // Assuming window.aptos.connect() is the function to connect the wallet
      const { address, publicKey } = await window.aptos.connect();
      setAddress(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // Handle error (show a message to the user, etc.)
    }
  };

  
    return (
      <div>
        {!address ? (
          <div className="container mt-5 text-center">
            <h1 className="mb-4">Connect your wallet</h1>
            {address ? (
              <div>
                <p className="lead">Connected Account Address:</p>
                <code className="h4">{address}</code>
              </div>
            ) : (
              <div>
                <WalletSelector />
              </div>
            )}</div>) : (<div className="container my-5">
              <div className="card text-center my-5">
                <div className="card-body">
                  <h1>Counter</h1>
                  <div className="my-5">
                    <h2 className="my-5">{count}</h2>
                    <button className="btn btn-success mx-3"
                      onClick={handleClick}
                      style={{ borderRadius: '50%', width: '120px', height: '120px', padding: '0' }}>
                      Increment Counter
                    </button>
                  </div>
                </div>
              </div>
            </div> )}

            

          </div>)

  }
 

export default App;