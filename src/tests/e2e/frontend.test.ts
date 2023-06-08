// THIS TEST IS NOT FINISHED YET

import { test, expect } from '@playwright/test';
import JSONdb from 'simple-json-db'

const db: any = new JSONdb('../testdata.json', { syncOnWrite: true });
const testData = db.JSON();

test('Info about created collection and NFT should be displayed on UI', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // TODO: install metamask, change network

  await expect(page.locator('.list-group-item:nth-child(2)')).toContainText(
    `Collection Created with address: ${testData.collection.address}, name: ${testData.collection.name} and symbol: ${testData.collection.symbol}`,
    { timeout: 15000 }
  );
  await expect(page.locator('.list-group-item:nth-child(2)')).toContainText(
    `NFT minted for collection: ${testData.collection.address}, to: ${testData.nft.recipient}, token id: ${testData.nft.tokenId} and token URI: ${testData.collection.uri}${testData.nft.tokenId}`
  );

  // clear storage
  db.JSON({});
});
