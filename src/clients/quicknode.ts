
import contractData from '../configs/contract-data';
import { ethers } from 'ethers';
import { privateKey } from '../configs/metamask-config';
import { config } from '../configs/quicknode-config';
import { faker } from '@faker-js/faker';

if (!privateKey) throw new Error('Please set WALLET_PRIVATE_KEY env variable');
const quickNodeURL = config.testnet;

const provider = new ethers.providers.JsonRpcProvider(quickNodeURL);
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractData.address, contractData.abi, wallet);

class ContractActions {
  collectionAddress: string | undefined;
  private collectionLogs: any;

  constructor() { }

  async createCollection(collectionName: string, collectionSymbol: string, collectionURI: string) {
    const tx = await contract.deployCollection(collectionName, collectionSymbol, collectionURI);
    const receipt = await tx.wait();
    this.collectionLogs = receipt.logs;
    this.collectionAddress = this.getCollectionAddressFromLogs(this.collectionLogs)

    console.info(`Created collection with name: ${collectionName}, symbol: ${collectionSymbol} and URI: ${collectionURI}`);
    return this.collectionAddress;
  }

  async mintNFT(recipientAddress: string, tokenId: string, collectionAddress = this.collectionAddress, ) {
    const tx = await contract.mint(collectionAddress, recipientAddress, tokenId);
    const receipt = await tx.wait();

    console.info(`Minted NFT with id: ${tokenId} for recipient: ${recipientAddress} in collection: ${collectionAddress}`);
  }

  private getCollectionAddressFromLogs(logs: any): string {
    let collectionAddress;
    logs.forEach((log: any) => {
      try {
  
        const parsedLog = contract.interface.parseLog(log);
        if (parsedLog.name === 'CollectionCreated') {
          collectionAddress = parsedLog.args.collection;
        }
      } catch (e) {
      }
    });
  
    return collectionAddress || logs[0].address;
  }
}

export default new ContractActions();


// (async () => {
//   const contract = new ContractActions();
//   const collectionAddress = await contract.createCollection(faker.word.noun(), faker.string.alpha({length: 3, casing: 'upper'}), faker.internet.url());
//   console.log('Collection address: ', collectionAddress);
//   await contract.mintNFT('0x476348FdCab51b5F4cC24a38512A3F8F0abdCD8E', faker.number.int().toString());
// })();

