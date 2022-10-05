import React, { Suspense, useState } from "react";
import styled from "styled-components/macro";
import Header from "components/Header";
import Loader from "components/Loader";
import Polling from "components/Header/Polling";
import "../styles/swap.css";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { ABI } from "./ABI";

export default function App() {
  const [amount, setAmount] = useState<number>(0);
  const { provider } = useWeb3React();
  const Contract = "0x1883CAF4F9b92c40ED859C04360FC23f670C9D51";
  const signer = provider?.getSigner();

  const swapToken = async () => {
    const swap = new ethers.Contract(Contract, ABI, signer);
    const amountIn = amount * 10 ** 18;
    console.log(amountIn);
    const swapResponse = await swap
      .swapExactInputSingle(amountIn.toString())
      .then(() => {
        console.log("success");
      })
      .catch((err: any) => {
        console.log(err);
      });
    await swapResponse.wait();
  };

  return (
    <>
      <Header />
      <div className="swap">
        <input
          type="number"
          className="amount"
          onChange={(e) => {
            setAmount(e.target.valueAsNumber);
          }}
          value={amount}
          placeholder="Enter WETH amount"
        />
        <button className="submit" onClick={swapToken}>
          Swap
        </button>
      </div>
    </>
  );
}
