import contract from '../../clients/quicknode';
import { faker } from '@faker-js/faker';
import backend from '../../clients/backend';
import JSONdb from 'simple-json-db';

const collectionData = {
  address: '',
  name: faker.word.noun(),
  symbol: faker.string.alpha({
    length: 3, casing: 'upper'
  }),
  uri: faker.internet.url(),
}

const NFTData = {
  revepient: '0x476348FdCab51b5F4cC24a38512A3F8F0abdCD8E',
  tokenId: faker.number.int().toString(),
}

const db = new JSONdb('./src/tests/testdata.json', { asyncWrite: true, syncOnWrite: true });

describe('Collection tests', () => {
  afterAll(async () => {
    db.set('collection', collectionData);
    db.set('nft', NFTData);
  })

  test('created collection should be present in backend events', async () => {
    collectionData.address = await contract.createCollection(collectionData.name, collectionData.symbol, collectionData.uri);
    await backend.waitForCollectionCreation(collectionData.address);
  });

  test('created NFT should be present in backend events', async () => {

    await contract.mintNFT(NFTData.revepient, NFTData.tokenId);
    await backend.waitForNFTCreation({
      collection: collectionData.address,
      recipient: NFTData.revepient,
      tokenId: NFTData.tokenId,
    })
  });
});
