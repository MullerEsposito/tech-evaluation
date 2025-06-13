const BASE_URL = "https://5800-firebase-tech-evaluationgit-1749770286727.cluster-iesosxm5fzdewqvhlwn5qivgry.cloudworkstations.dev/api"

export interface Transaction {
  id: number;
  userName: string;
  type: string;
  token: string;
  amount: number;
  date: string;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}/transactions`);
  if (!response) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();;
}