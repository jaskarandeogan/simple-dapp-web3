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
var MessageContractAddress = "0xC6A438932BAAd35543FD8E2ecC712733Db0Db9B9";
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


