import 'dotenv/config'

const quickNodeToken = process.env.QUICKNODE_TOKEN;

if (!quickNodeToken) throw new Error('Please set QUICKNODE_TOKEN env variable');

export const config = {
  testnet: `https://convincing-compatible-pallet.matic-testnet.discover.quiknode.pro/${quickNodeToken}/`,
}