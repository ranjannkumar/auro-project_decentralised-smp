import {
    ethers
} from "ethers";

const blockchainProvider = new ethers.providers.Web3Provider(window.ethereum);
const walletSigner = blockchainProvider.getSigner();

const dAppContractAddress = "YOUR_SMART_CONTRACT_ADDRESS";
const contractAbi = [
    // Add your smart contract's ABI here
];

const dAppContract = new ethers.Contract(dAppContractAddress, contractAbi, walletSigner);

export async function registerUserProfile(nickname) {
    const transaction = await dAppContract.createUserProfile(nickname);
    await transaction.wait();
}

export async function publishPost(message) {
    const transaction = await dAppContract.createPost(message);
    await transaction.wait();
}

export async function retrieveAllPosts() {
    return await dAppContract.getAllPosts();
}

export async function fetchReputation(wallet) {
    return await dAppContract.getReputation(wallet);
}

export async function boostReputation(wallet, score) {
    const transaction = await dAppContract.increaseReputation(wallet, score);
    await transaction.wait();
}