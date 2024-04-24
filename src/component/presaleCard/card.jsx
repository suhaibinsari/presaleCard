import { useCallback, useEffect, useState } from "react";

import { useAccount } from "wagmi";

import { formatUnits, parseUnits } from "@ethersproject/units";
import { useWeb3Modal } from "@web3modal/wagmi/react";


import { presaleReadFunction, presaleWriteFunction, usdtReadFunction, usdtWriteFunction } from '../connectivity/web3Assets/hooks'
import { presaleAddress } from "../connectivity/web3Assets/environment";


export default function Card() {

  // Transection modal
  const [transectionHash, setTransectionhash] = useState("");
  // const [openD, setOpenD] = useState(false);
  // const toggelModel = () => {
  //   setOpenD(!openD);
  // };

  const [activeCurrency, setActiveCurrency] = useState("BNB");
  // const [loading, setLoading] = useState(false);
  // const [alertState, setAlertState] = useState({
  //   open: false,
  //   message: "",
  //   severity: undefined,
  // });
  // const showToast = (msg, type) => {
  //   return setAlertState({
  //     open: true,
  //     message: msg,
  //     severity: type,
  //   });
  // };

  /// connectivity
  const [currentPrice, setCurrentPrice] = useState(0);
  const [nextPrice, setNextPrice] = useState(0);
  const [usdtToRaised, setUsdtToRaised] = useState(0);
  const [usdtTotalRaised, setUsdtTotalRaised] = useState(0);
  const [amount, setAmount] = useState(0);
  const [presaleId, setPresaleId] = useState(1);
  const [youWillGet, setYouWillGet] = useState(0);

  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  // eslint-disable-next-line consistent-return
  const connectionHandler = useCallback(() => {
    if (address) {
      return open();
    }
    open();
  }, [address, open]);

  const init = useCallback(async () => {
    try {
      // setLoading(true);
      const id = await presaleReadFunction("presaleId");
      const presaleData = await presaleReadFunction("presale", [id]);
      setPresaleId(id);

      const cPrice = 1 / Number(formatUnits(presaleData[2], 18));
      setCurrentPrice(cPrice);

      const nPrice = 1 / Number(formatUnits(presaleData[3], 18));
      setNextPrice(nPrice);

      const usdtRaise = Number(formatUnits(presaleData[6], 18));
      setUsdtToRaised(usdtRaise);

      const totalRaised = Number(formatUnits(presaleData[7], 18));
      setUsdtTotalRaised(totalRaised);
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      return error
      /* empty */
    }
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAmountChange = useCallback(
    async (e) => {
      try {
        let inputAmount;
        if (e) {
          inputAmount = e?.target?.value;
          setAmount(inputAmount);
          console.log(inputAmount);
        } else {
          inputAmount = amount;
        }

        if (
          inputAmount === "" ||
          inputAmount === "0" ||
          isNaN(Number(inputAmount))
        ) {
          setYouWillGet(0);
          // setLoading(false);
          return;
        }
        if (activeCurrency === "BNB") {
          const ethToToken = await presaleReadFunction("ethToTokens", [
            presaleId,
            parseUnits(inputAmount).toString(),
          ]);
          setYouWillGet(Number(formatUnits(ethToToken, 18)));
        } else {
          const usdtToToken = await presaleReadFunction("usdtToTokens", [
            presaleId,
            parseUnits(inputAmount).toString(),
          ]);
          setYouWillGet(Number(formatUnits(usdtToToken, 18)));
        }
      } catch (error) {
        // setLoading(false);
        alert("Error during Transection !", "error");
      }
    },
    [activeCurrency, amount, presaleId]
  );

  // useEffect(() => {
  // onAmountChange();
  // }, [onAmountChange]);

  /// buy functions
  const buyHandler = async (e) => {
    e.preventDefault();
    // validation
    if (isNaN(Number(amount))) {
      alert("Invalid Input !", "error");
      return;
    }

    if (Number(youWillGet) < 5000) {
      alert("The minimum ammount to buy is 5000 INCO.", "error");
      return;
    }
    try {
      // setLoading(true);
      // buy with ETH
      if (activeCurrency === "BNB") {
        const parseValue = parseUnits(amount, 18).toString();
        console.log(parseValue);
        const res = await presaleWriteFunction("buyWithBNB", [], parseValue);
        console.log("response,", res);

        // // setLoading(false);
        setTransectionhash(res?.transactionHash);
        alert(transectionHash)

        // // setOpenD(true);
      } else {
        // buy with USDT
        const allow = await usdtReadFunction("allowance", [
          address,
          presaleAddress,
        ]);

        if (Number(formatUnits(allow, 18)) < Number(amount)) {
          await usdtWriteFunction("approve", [
            presaleAddress,
            parseUnits(amount.toString(), 18).toString(),
          ]);
        }

        console.log("hahah")

        const res = await presaleWriteFunction("buyWithUSDT", [
          parseUnits(amount, 18).toString(),
        ]);
        console.log("response,", res);
        // setLoading(false);
        setTransectionhash(res?.transactionHash);
        alert(transectionHash)
        // setOpenD(true);
      }

      init();
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      alert(error.message, "error");
    }

    /// buy start
  };
  return (
    <>
      <div className="flex text-center items-center justify-center ">

        <div className=" bg-red-200 rounded-xl mx-auto px-48 space-y-4 p-10">
          <h className="font-bold text-4xl">${presaleId}ABC Chain</h>
          <p>Phase 1 Ends in:</p>

          <div className="flex gap-4">
            <span className="flex gap-2">
              <p>29</p>
              <p>Days</p>
            </span>
            <span className="flex gap-2">
              <p>19</p>
              <p>Hours</p>
            </span>
            <span className="flex gap-2">
              <p>35</p>
              <p>Minutes</p>
            </span>
            <span className="flex gap-2">
              <p>22</p>
              <p>Seconds</p>
            </span>
          </div>

          <progress
            id="file"
            max={usdtToRaised}
            value={usdtTotalRaised}
            style={{
              width: "99.71%",
              marginTop: "1px",
              marginLeft: "1px",
            }}
          >
            {usdtTotalRaised}
          </progress>
          <p>USD RAISED = ${usdtTotalRaised.toFixed(1)} / ${usdtToRaised}</p>
          <p>Minimum purchase = 5000 INCO</p>
          <p>1 INCO = ${currentPrice}</p>
          <p>Listing Price: TDB</p>

          <div className="flex gap-6">
            <button onClick={() => {
              setActiveCurrency("BNB");
            }} className=" rounded-xl p-4 px-16 bg-yellow-600 text-white">BNB</button>
            <button onClick={() => {nextPrice
              setActiveCurrency("USDT");
            }} className=" rounded-xl p-4 px-16 bg-green-700 text-white">USDT</button>
          </div>
          <form onSubmit={buyHandler}>
            <div className="flex items-start justify-start flex-col">
              <p>Amount in <span className="font-bold">{activeCurrency} </span>you pay:</p>
              <input onChange={onAmountChange} type="text" name="" id="" className="w-full rounded-md p-2" />
            </div>
            <div className="flex items-start justify-start flex-col">
              <p>Amount in <span className="font-bold">ABC </span>you receive:</p>
              <input type="text" name="" id="" value={youWillGet} form
                className="w-full rounded-md p-2" />
            </div>



            {isConnected ? (
              <button className="rounded-xl p-4 px-16 bg-green-700 text-white">Buy With {activeCurrency}
              </button>
            ) : (
              <button onClick={connectionHandler} className="rounded-xl p-4 px-16 bg-green-700 text-white">Connect Wallet</button>
            )}
          </form>

        </div>
      </div>
    </>
  )
}