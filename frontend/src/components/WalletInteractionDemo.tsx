import React, { useState } from 'react';
// Removed: useWallet, ConnectButton from '@suiet/wallet-kit';
// Removed: Transaction from '@mysten/sui/transactions';
// Removed: Buffer
import { fetchWalletBalance, executeCustodialSend, executeCustodialCetusSwap } from '@/lib/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';

export const WalletInteractionDemo = () => {
  // For balance check, we might still want to query any address
  const [queryAddressForBalance, setQueryAddressForBalance] = useState('');
  const [balance, setBalance] = useState('');
  const [tokenQueryAddress, setTokenQueryAddress] = useState('0x2::sui::SUI');

  // Custodial Send Fields
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendTokenAddress, setSendTokenAddress] = useState('0x2::sui::SUI');

  // Custodial Swap Fields
  const [swapFromToken, setSwapFromToken] = useState('0x2::sui::SUI');
  const [swapToToken, setSwapToToken] = useState('0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d2177914::coin::COIN'); // Example USDCet
  const [swapAmount, setSwapAmount] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [txDigest, setTxDigest] = useState('');

  const handleFetchBalance = async () => {
    if (!queryAddressForBalance) {
      toast.error('Please enter a wallet address to check balance.');
      return;
    }
    setIsLoading(true);
    try {
      const data = await fetchWalletBalance(queryAddressForBalance, tokenQueryAddress || undefined);
      setBalance(`${data.balance} ${data.tokenAddress?.split('::')[2] || 'SUI'}`);
      toast.success(`Balance for ${queryAddressForBalance.substring(0,6)}...: ${data.balance} ${data.tokenAddress?.split('::')[2] || 'SUI'}`);
    } catch (error: any) {
      toast.error(`Failed to fetch balance: ${error.message}`);
      setBalance('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustodialSend = async () => {
    setIsLoading(true);
    setTxDigest('');
    try {
      const result = await executeCustodialSend({
        to: recipient,
        amount: parseFloat(sendAmount),
        tokenAddress: sendTokenAddress,
      });
      setTxDigest(result.digest);
      toast.success(`Custodial send successful! Digest: ${result.digest.substring(0,10)}...`);
      // Optionally, fetch balance of the custodial wallet or recipient if needed
    } catch (error: any) {
      toast.error(`Custodial send failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustodialSwap = async () => {
    setIsLoading(true);
    setTxDigest('');
    try {
      const result = await executeCustodialCetusSwap({
        fromToken: swapFromToken,
        targetToken: swapToToken,
        amount: parseFloat(swapAmount),
      });
      setTxDigest(result.digest);
      toast.success(`Custodial swap successful! Digest: ${result.digest.substring(0,10)}...`);
      // Optionally, fetch balance of the custodial wallet
    } catch (error: any) {
      toast.error(`Custodial swap failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto my-10 bg-[#1a1a2e]/70 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-4">
          Custodial Wallet Interactions
        </h2>
        <p className="text-sm text-gray-400">
          These actions are performed by the backend's custodial wallet.
        </p>
      </div>

      {/* Get Balance Section (can query any address) */}
      <div className="space-y-3 p-4 bg-[#0a0a0f]/50 rounded-lg border border-[#00d4ff]/15">
        <h3 className="text-xl font-semibold text-[#00d4ff]">Check Balance (Any Address)</h3>
        <Input
          type="text"
          placeholder="Wallet Address to Query"
          value={queryAddressForBalance}
          onChange={(e) => setQueryAddressForBalance(e.target.value)}
          className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"
        />
        <Input
          type="text"
          placeholder="Token Address (e.g., 0x2::sui::SUI)"
          value={tokenQueryAddress}
          onChange={(e) => setTokenQueryAddress(e.target.value)}
          className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"
        />
        <Button onClick={handleFetchBalance} disabled={isLoading} className="w-full bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] hover:opacity-90">
          {isLoading ? 'Fetching...' : 'Get Balance'}
        </Button>
        {balance && <p className="mt-2 text-green-400">Balance: {balance}</p>}
      </div>

      {/* Custodial Send Transaction Section */}
      <div className="space-y-3 p-4 bg-[#0a0a0f]/50 rounded-lg border border-[#00d4ff]/15">
        <h3 className="text-xl font-semibold text-[#00d4ff]">Custodial Send Tokens</h3>
        <Input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Input type="number" placeholder="Amount" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Input type="text" placeholder="Token Address (e.g., 0x2::sui::SUI)" value={sendTokenAddress} onChange={(e) => setSendTokenAddress(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Button onClick={handleCustodialSend} disabled={isLoading} className="w-full bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] hover:opacity-90">
          {isLoading ? 'Sending...' : 'Execute Send'}
        </Button>
      </div>

      {/* Custodial Swap Tokens Section */}
      <div className="space-y-3 p-4 bg-[#0a0a0f]/50 rounded-lg border border-[#00d4ff]/15">
        <h3 className="text-xl font-semibold text-[#00d4ff]">Custodial Swap Tokens (Cetus)</h3>
        <Input type="text" placeholder="From Token Address" value={swapFromToken} onChange={(e) => setSwapFromToken(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Input type="text" placeholder="To Token Address" value={swapToToken} onChange={(e) => setSwapToToken(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Input type="number" placeholder="Amount to Swap" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} className="bg-[#16213e]/80 border-[#00d4ff]/30 placeholder-gray-500"/>
        <Button onClick={handleCustodialSwap} disabled={isLoading} className="w-full bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] hover:opacity-90">
          {isLoading ? 'Swapping...' : 'Execute Swap'}
        </Button>
      </div>

      {txDigest && (
        <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 text-xs break-all">
          <p className="font-semibold">Last Transaction Digest:</p>
          <a
            href={`https://testnet.suivision.xyz/txblock/${txDigest}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-green-100"
          >
            {txDigest}
          </a>
        </div>
      )}
    </div>
  );
};