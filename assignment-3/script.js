const ethereumProvider = window.ethereum;

const connectWalletButton = document.getElementById("connectWallet");
const transactionForm = document.getElementById("transactionForm");
const signButton = document.getElementById("signButton");

const walletState = document.getElementById("walletState");
const networkName = document.getElementById("networkName");
const accountAddress = document.getElementById("accountAddress");
const payloadPreview = document.getElementById("payloadPreview");
const statusBox = document.getElementById("statusBox");
const signatureOutput = document.getElementById("signatureOutput");
const hashOutput = document.getElementById("hashOutput");

let selectedAccount = null;

const networkMap = {
  "0x1": "Ethereum Mainnet",
  "0xaa36a7": "Sepolia",
  "0x89": "Polygon",
  "0x13881": "Mumbai",
  "0x13882": "Amoy",
  "0xa": "Optimism",
  "0xa4b1": "Arbitrum One",
  "0x38": "BNB Smart Chain"
};

const formFields = [
  "productName",
  "productId",
  "quantity",
  "unitPrice",
  "recipient",
  "buyerName",
  "notes"
];

function getFormData() {
  const values = Object.fromEntries(
    formFields.map((field) => [field, document.getElementById(field).value.trim()])
  );

  const quantity = Number(values.quantity || 0);
  const unitPrice = Number(values.unitPrice || 0);

  return {
    productName: values.productName,
    productId: values.productId,
    quantity,
    unitPrice,
    recipient: values.recipient,
    buyerName: values.buyerName,
    notes: values.notes,
    totalPriceEth: Number((quantity * unitPrice).toFixed(6)),
    timestamp: new Date().toISOString()
  };
}

function updatePreview() {
  payloadPreview.textContent = JSON.stringify(getFormData(), null, 2);
}

function setStatus(message, type = "info") {
  statusBox.className = `status-box ${type}`;
  statusBox.textContent = message;
}

function shortAddress(address) {
  if (!address) {
    return "--";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function utf8ToHex(value) {
  return `0x${Array.from(new TextEncoder().encode(value))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")}`;
}

function ethToWeiHex(ethAmount) {
  const [whole, fraction = ""] = String(ethAmount).split(".");
  const weiWhole = BigInt(whole || "0") * 10n ** 18n;
  const normalizedFraction = (fraction + "000000000000000000").slice(0, 18);
  const weiFraction = BigInt(normalizedFraction || "0");
  return `0x${(weiWhole + weiFraction).toString(16)}`;
}

async function refreshWalletState() {
  if (!ethereumProvider) {
    walletState.textContent = "MetaMask missing";
    networkName.textContent = "Install MetaMask";
    setStatus("MetaMask was not detected in this browser. Install the extension to use this interface.", "error");
    connectWalletButton.disabled = true;
    signButton.disabled = true;
    return;
  }

  const accounts = await ethereumProvider.request({ method: "eth_accounts" });
  const chainId = await ethereumProvider.request({ method: "eth_chainId" });

  selectedAccount = accounts[0] || null;
  walletState.textContent = selectedAccount ? "Connected" : "Ready";
  accountAddress.textContent = selectedAccount ? shortAddress(selectedAccount) : "--";
  networkName.textContent = networkMap[chainId] || `Chain ${chainId}`;
  signButton.disabled = !selectedAccount;
}

async function connectWallet() {
  if (!ethereumProvider) {
    setStatus("MetaMask is required for wallet connection.", "error");
    return;
  }

  try {
    const accounts = await ethereumProvider.request({ method: "eth_requestAccounts" });
    selectedAccount = accounts[0];
    await refreshWalletState();
    setStatus(`Wallet connected: ${shortAddress(selectedAccount)}. You can now sign or send the transaction.`, "success");
  } catch (error) {
    setStatus(error.message || "Wallet connection was cancelled.", "error");
  }
}

async function signPurchaseIntent() {
  const payload = getFormData();

  if (!selectedAccount) {
    setStatus("Connect MetaMask before signing the purchase intent.", "error");
    return;
  }

  if (!payload.productName || !payload.productId || !payload.buyerName) {
    setStatus("Fill in the product name, product ID, and buyer name before signing.", "error");
    return;
  }

  try {
    const message = [
      "ChainCart Purchase Intent",
      `Buyer: ${payload.buyerName}`,
      `Product: ${payload.productName}`,
      `Product ID: ${payload.productId}`,
      `Quantity: ${payload.quantity}`,
      `Unit Price (ETH): ${payload.unitPrice}`,
      `Total Price (ETH): ${payload.totalPriceEth}`,
      `Timestamp: ${payload.timestamp}`
    ].join("\n");

    const signature = await ethereumProvider.request({
      method: "personal_sign",
      params: [message, selectedAccount]
    });

    signatureOutput.textContent = signature;
    setStatus("Purchase intent signed successfully. Review the wallet response and proceed to send the transaction if everything looks right.", "success");
  } catch (error) {
    setStatus(error.message || "Signature request failed.", "error");
  }
}

async function sendTransaction(event) {
  event.preventDefault();

  if (!selectedAccount) {
    setStatus("Connect MetaMask before sending the transaction.", "error");
    return;
  }

  const payload = getFormData();

  if (!isValidAddress(payload.recipient)) {
    setStatus("Enter a valid EVM wallet address for the receiver.", "error");
    return;
  }

  if (payload.quantity <= 0 || payload.unitPrice < 0) {
    setStatus("Quantity must be greater than zero and unit price cannot be negative.", "error");
    return;
  }

  try {
    const txHash = await ethereumProvider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: selectedAccount,
          to: payload.recipient,
          value: ethToWeiHex(payload.totalPriceEth),
          data: utf8ToHex(JSON.stringify(payload))
        }
      ]
    });

    hashOutput.textContent = txHash;
    setStatus("Transaction submitted to MetaMask successfully. Track confirmation using the transaction hash.", "success");
  } catch (error) {
    setStatus(error.message || "Transaction request failed.", "error");
  }
}

formFields.forEach((field) => {
  document.getElementById(field).addEventListener("input", updatePreview);
});

connectWalletButton.addEventListener("click", connectWallet);
signButton.addEventListener("click", signPurchaseIntent);
transactionForm.addEventListener("submit", sendTransaction);

if (ethereumProvider) {
  ethereumProvider.on("accountsChanged", refreshWalletState);
  ethereumProvider.on("chainChanged", refreshWalletState);
}

updatePreview();
refreshWalletState().catch((error) => {
  setStatus(error.message || "Unable to read wallet state.", "error");
});
