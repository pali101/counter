import React, {useState} from 'react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

function App() {
  const [address, setAddress] = useState<string | null>(null);

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
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Connect your wallet</h1>
      {address ? (
        <div>
          <p className="lead">Connected Account Address:</p>
          <code className="h4">{address}</code>
        </div>
      ) : (
        <div>
          {/* <p className="lead">Connect your wallet to get started</p> */}
          <button className="btn btn-primary btn-lg" onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
      }
//   return (
//     <div className="App">
//       {address ? (
//         <p>Account Address: <code>{address}</code></p>
//       ) : (
//         <div className="text-center my-5">
//         <button className="btn btn-primary mx-3" onClick={connectWallet}>Connect Wallet</button>
//         </div>
//       )}
//     </div>
//   );
// }
  // const [count, setCount] = useState(0);
  // const connectWallet = useState(false);
  // return (
  //   <div className="container my-5">
  //     <div className="card text-center my-5">
  //       <div className="card-body">
  //         <h1>Counter</h1>
  //         <div className="my-5">
  //           <h2 className="my-5">{count}</h2>
  //           <button className="btn btn-success mx-3" 
  //           onClick={() => setCount(count + 1)}
  //           style={{ borderRadius: '50%', width: '120px', height: '120px', padding: '0' }}>
  //             Increment Counter
  //             </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
// }

export default App;
