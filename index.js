window.ethereum.enable();

const infuraProjectId = "79cb358f87714576bd9752a049c3332c";

const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${infuraProjectId}`,
  {
    name: "sepolia",
    chainId: 11155111,
  }
);

var MessageContract;
var MessageContractAddress = "0x6F5f4c7D77819fd48F9962dfBad81D2329004fbF";
var MessageContractABI = ABI;
var Signer;

async function init() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  const signer = provider.getSigner(account);
  MessageContract = new ethers.Contract(
    MessageContractAddress,
    MessageContractABI,
    signer
  );
}

init();

async function requestAccounts() {
  try {
    const accounts = await ethereum.send('eth_requestAccounts');
    console.log(accounts);
  } catch (error) {
    console.error(error);
  }
}

requestAccounts();

async function getMessages() {
  let message = document.getElementById("messagebox");
  console.log(message);
  const getMessagesPromise = MessageContract.getMessages();
  await getMessagesPromise.then((result) => {
    message.innerHTML = result;
  });
}

async function setMessages() {
  let message = document.getElementById("message").value;
  console.log(MessageContract);
  const setMessagesPromise = MessageContract.setMessages(message);
  await setMessagesPromise.then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
    });
}


