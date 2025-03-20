import React, { useState, useEffect } from "react";
import Web3 from "web3";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) return;

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      getBNBBalance(accounts[0]);
    } catch (error) {
      console.error("User denied account access", error);
    }
  };

  const getBNBBalance = async (walletAddress) => {
    if (!web3) return;

    const balanceWei = await web3.eth.getBalance(walletAddress);
    setBalance(web3.utils.fromWei(balanceWei, "ether"));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
      <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>
      {balance !== null && <span style={{ fontSize: "16px", fontWeight: "bold" }}>BNB: {parseFloat(balance).toFixed(4)}</span>}
    </div>
  );
};

export default WalletConnect;
