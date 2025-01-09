import { GraphQLClient } from "graphql-request";

class AaveService {
  constructor() {
    this.client = new GraphQLClient(process.env.AAVE_GRAPHQL_ENDPOINT);
  }

  async fetchTransactions(walletAddress) {
    const query = `
      query UserTransactions($user: String!) {
        userTransactions(
          where: { user: $user }
          orderBy: timestamp
          orderDirection: desc
          first: 100
        ) {
          id
          timestamp
          txHash
          action
          amount
          assetPriceUSD
          reserve {
            symbol
            decimals
          }
        }
      }
    `;

    try {
      const data = await this.client.request(query, { user: walletAddress });
      return data.userTransactions;
    } catch (error) {
      throw new Error(`Aave API Error: ${error.message}`);
    }
  }
}

export default new AaveService();
