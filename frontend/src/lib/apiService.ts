// src/lib/apiService.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface BalanceResponse {
  walletAddress: string;
  tokenAddress?: string;
  balance: string;
}

interface ExecuteTxResponse { // Generic response for executed transactions
  message: string;
  digest: string;
  details?: any; // Could include more details from SuiAgentKit response
}

interface ErrorResponse {
  error: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ErrorResponse = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const fetchWalletBalance = async (walletAddress: string, tokenAddress?: string): Promise<BalanceResponse> => {
  const params = new URLSearchParams({ walletAddress });
  if (tokenAddress) {
    params.append('tokenAddress', tokenAddress);
  }
  const response = await fetch(`${API_BASE_URL}/wallet/balance?${params.toString()}`);
  return handleResponse<BalanceResponse>(response);
};

// Custodial Execute Send
export const executeCustodialSend = async (data: {
  to: string;
  amount: number;
  tokenAddress: string;
}): Promise<ExecuteTxResponse> => {
  const response = await fetch(`${API_BASE_URL}/wallet/execute-send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<ExecuteTxResponse>(response);
};

// Custodial Execute Cetus Swap
export const executeCustodialCetusSwap = async (data: {
  fromToken: string;
  targetToken: string;
  amount: number;
  byAmountIn?: boolean;
}): Promise<ExecuteTxResponse> => {
  const response = await fetch(`${API_BASE_URL}/wallet/execute-swap-cetus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<ExecuteTxResponse>(response);
};

// Add executeCustodialNaviSwap if implemented