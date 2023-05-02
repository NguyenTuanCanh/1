import { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";

import "./AddNetworkKeplr.css";

const CHAIN_FIELD = {
  NETWORK_NAME: "Network name",
  RPC_URL: "New RPC URL",
  CHAIN_ID: "Chain ID",
  CURRENCY_SYMBOL: "Currency symbol",
  BLOCK_EXPLOER_URL: "Block explorer URL",
};

function Claim() {
  const [chainName, setChainName] = useState("");
  const [rpc, setRpc] = useState("");
  const [chainId, setChainId] = useState("");
  const [currencies, setCurrencies] = useState("");
  const [rest, setRest] = useState("");

  const [disabledBtn, setDisabledBtn] = useState("");

  const CHAIN_PARAMS = [
    {
      name: CHAIN_FIELD.NETWORK_NAME,
      value: "",
      isRequired: true,
      setStage: (e) => setChainName(e),
    },
    {
      name: CHAIN_FIELD.RPC_URL,
      value: "",
      isRequired: true,
      setStage: (e) => setRpc(e),
    },
    {
      name: CHAIN_FIELD.CHAIN_ID,
      value: "",
      isRequired: true,
      setStage: (e) => setChainId(e),
    },
    {
      name: CHAIN_FIELD.CURRENCY_SYMBOL,
      value: "",
      isRequired: true,
      setStage: (e) => setCurrencies(e),
    },
    {
      name: CHAIN_FIELD.BLOCK_EXPLOER_URL,
      value: "",
      isRequired: false,
      setStage: (e) => setRest(e),
    },
  ];

  async function add() {
    const params = {
      chainId: chainId,
      chainName: chainName,
      rpc: rpc,
      rest: rest,
      currencies: currencies,
    }
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      if (window.keplr.experimentalSuggestChain) {
        try {
          await window.keplr.experimentalSuggestChain({
            chainId: params.chainId,
            chainName: params.chainName,
            rpc: params.rpc,
            rest: params.rest,
            bip44: {
              coinType: 118,
            },
            bech32Config: {
              bech32PrefixAccAddr: "celestia",
              bech32PrefixAccPub: "celestia" + "pub",
              bech32PrefixValAddr: "celestia" + "valoper",
              bech32PrefixValPub: "celestia" + "valoperpub",
              bech32PrefixConsAddr: "celestia" + "valcons",
              bech32PrefixConsPub: "celestia" + "valconspub",
            },
            currencies: [
              {
                coinDenom: params.currencies,
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
              },
            ],
            feeCurrencies: [
              {
                coinDenom: params.currencies,
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
                gasPriceStep: {
                  low: 0.01,
                  average: 0.025,
                  high: 0.04,
                },
              },
            ],
            stakeCurrency: {
              coinDenom: params.currencies,
              coinMinimalDenom: "utia",
              coinDecimals: 6,
              coinGeckoId: "celestia",
            },
          });
          toast.success("Your chain is added !");
        } catch {
          toast.error("Failed to suggest the chain!");
        }
      }
      const chainId = params.chainId;
      await window.keplr.enable(chainId);
    }
  }

  useEffect(() => {
    const conditions = [chainName, rpc, chainId, currencies];

    console.log(conditions);

    setDisabledBtn(conditions.some((item) => item.length === 0));
  }, [chainName, rpc, chainId, currencies]);

  const chainFeild = CHAIN_PARAMS.map((item, index) => (
    <div style={mainWrapInput} key={index}>
      <div style={fieldName}>{item.name}</div>
      <input
        style={input}
        id="celestiaNameInput"
        onChange={(event) => item.setStage(event.target.value)}
      />
    </div>
  ));

  return (
    <div style={main}>
      <div style={mainWrap}>
        <h2>Add A Network Manually</h2>
        {chainFeild}
        <div
          className={`${disabledBtn ? "disabled" : ""}`}
          style={mainWrapButton}
          onClick={add}
        >
          ADD
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} height="100px" />
    </div>
  );
}

const main = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainWrap = {
  width: "650px",
  height: "auto",
  fontSize: "20px",
  widkgroundSize: "cover",
  bath: "344px",
  padding: "20px 50px 50px 50px",
  bacckgroundRepeat: "no-repeat",
  backgroundColor: "#fff",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

const mainWrapInput = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "20px",
};

const fieldName = {
  width: "300px",
  textAlign: "initial",
};

const input = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "8px 16px 8px 16px",
  gap: "16px",
  width: "539px",
  height: "42px",
  background: "#FFFFFF",
  boxShadow: "0px 2px 10px 2px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  fontSize: "16px",
  outline: "none",
  color: "#555",
  border: "1px solid #DADCE0",
};

const mainWrapButton = {
  height: "56px",
  width: "654px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  color: "white",
  borderRadius: "10px",
  marginTop: "30px",
  cursor: "pointer",
};

export default Claim;
