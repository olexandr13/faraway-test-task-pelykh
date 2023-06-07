import contract from '../../clients/quicknode';
import { faker } from '@faker-js/faker';
import backend from '../../clients/backend';

describe('Collection tests', () => {
  let collectionAddress: string;
  beforeAll(async () => {

  })

  test('created collection should be present in backend events', async () => {
    collectionAddress = await contract.createCollection(faker.word.noun(), faker.string.alpha({
      length: 3, casing: 'upper'
    }), faker.internet.url());
    await backend.waitForCollectionCreation(collectionAddress);
  });

  test('created NFT should be present in backend events', async () => {
    const NFTData = {
      revepient: '0x476348FdCab51b5F4cC24a38512A3F8F0abdCD8E',
      tokenId: faker.number.int().toString(),
    }
    await contract.mintNFT(NFTData.revepient, NFTData.tokenId);
    await backend.waitForNFTCreation({
      collection: collectionAddress,
      recipient: '0x476348FdCab51b5F4cC24a38512A3F8F0abdCD8E',
      tokenId: NFTData.tokenId,
    })
  });
});
