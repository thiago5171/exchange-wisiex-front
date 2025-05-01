import backendClient from "./backendClient";

export class CollectedFeesApi {
  async getCollectedFees(): Promise<any[]> {
    try {
      const response = await backendClient.get<any[]>("/collected-fees");

      return response.data;
    } catch (error: any) {
      throw new Error("Failed to fetch collected fees. Please try again.");
    }
  }
}

const collectedFeesApi = new CollectedFeesApi();
export default collectedFeesApi;
