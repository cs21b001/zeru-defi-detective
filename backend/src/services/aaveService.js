import { GraphQLClient } from "graphql-request";

class AaveService {
  constructor() {
    this.client = new GraphQLClient(
      'https://gateway.thegraph.com/api/8ac28cb3819a045ab1e3542494615a32/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g'
    );
  }

  async fetchTransactions(walletAddress) {
    console.log('Fetching transactions for:', walletAddress);
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
          user {
            id
          }
        }
      }
    `;

    try {
      const data = await this.client.request(query, { user: walletAddress.toLowerCase() });
      console.log('Full API Response:', JSON.stringify(data, null, 2));
      if (!data || !data.userTransactions) {
        throw new Error('No transactions found or invalid response format');
      }
      return data.userTransactions;
    } catch (error) {
      console.error('Aave API Error:', error);
      throw new Error(`Aave API Error: ${error.message}`);
    }
  }
}

export default new AaveService();
