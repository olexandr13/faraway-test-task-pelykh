import axios from 'axios';
import { getEndpoint } from '..//configs/backend-config'
import { sleep } from '../helpers';

class Backend {
  async getEvents() {
    const endpoint = getEndpoint('events');
    const response = await axios.get(endpoint);
    return response.data;
  }

  async waitForCollectionCreation(collectionAddress: string, timeout = 30000) {
    console.info(`Start waiting for collection`, collectionAddress);
    const startTime = new Date().getTime();
    const endpoint = getEndpoint('events');

    let response = await axios.get(endpoint);
    while (true && (new Date().getTime() - startTime < timeout)) {
      response = await axios.get(endpoint);
      for (const event of response.data) {
        if (event.eventName === 'CollectionCreated' && event.collection === collectionAddress) return response.data;
      }
      // prevent BE DOS
      await sleep(1000);
    }
    throw new Error(`Collection ${collectionAddress} does not appear on backend during ${timeout}ms. Events:\n${response.data}`)
  }

  async waitForNFTCreation(NFTparams: {
    collection: string,
    recipient: string,
    tokenId: string,
  }, timeout = 20000) {
    console.info(`Start waiting for NFT`, NFTparams);
    const startTime = new Date().getTime();
    const endpoint = getEndpoint('events');

    let response = await axios.get(endpoint);
    while (true && (new Date().getTime() - startTime < timeout)) {
      response = await axios.get(endpoint);
      for (const event of response.data) {
        if (event.eventName === 'TokenMinted' &&
          event.collection === NFTparams.collection &&
          event.recipient === NFTparams.recipient &&
          event.tokenId === parseInt(NFTparams.tokenId)) return response.data;
      }
      // prevent BE DOS
      await sleep(1000);
    }
    throw new Error(`NFT with params ${JSON.stringify(NFTparams)} does not appear on backend during ${timeout}ms. Events:\n${JSON.stringify(response.data)}}`)
  }
}

export default new Backend();
