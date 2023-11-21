import React, {useState} from 'react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

function App() {
  const [count, setCount] = useState(0);
  const connectWallet = useState(false);
  return (
    <div className="container my-5">
      <div className="card text-center my-5">
        <div className="card-body">
          <h1>Counter</h1>
          <div className="my-5">
            <h2 className="my-5">{count}</h2>
            <button className="btn btn-success mx-3" 
            onClick={() => setCount(count + 1)}
            style={{ borderRadius: '50%', width: '120px', height: '120px', padding: '0' }}>
              Increment Counter
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
