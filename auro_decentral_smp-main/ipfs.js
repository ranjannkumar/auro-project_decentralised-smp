import {
    create
} from "ipfs-http-client";

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

export async function uploadFileToIPFS(file) {
    const addedFile = await ipfsClient.add(file);
    return `https://ipfs.infura.io/ipfs/${addedFile.path}`;
}