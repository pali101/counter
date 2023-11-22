import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const wallets = [new PetraWallet()];

declare global {
  interface Window { aptos: any; }
}

window.addEventListener('load', () => {
  root.render(
    <React.StrictMode>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <App />
      </AptosWalletAdapterProvider>  
      </React.StrictMode>)
;});
