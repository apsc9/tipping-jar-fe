import { useWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "./utils/anchor";
import { WalletButton } from "../src/components/WalletButton";
import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

function App() {
  const wallet = useWallet();
  const [ownerPubkey, setOwnerPubkey] = useState("");
  const [amount, setAmount] = useState("");

  const initializeJar = async () => {
    if (!wallet.publicKey) return;
    const program = getProgram(wallet);
    const [jarPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("jar"), wallet.publicKey.toBuffer()],
      program.programId
    );
    await program.methods
      .initializeJar()
      .accounts({
        jar: jarPda,
        owner: wallet.publicKey,
        systemProgram: PublicKey.default,
      })
      .rpc();
    alert("Jar initialized!");
  };

  const tip = async () => {
    if (!wallet.publicKey) return;
    const program = getProgram(wallet);
    const jarOwner = new PublicKey(ownerPubkey);
    const [jarPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("jar"), jarOwner.toBuffer()],
      program.programId
    );
    await program.methods
      .tip(new BN(amount))
      .accounts({
        jar: jarPda,
        tipper: wallet.publicKey,
        systemProgram: PublicKey.default,
      })
      .rpc();
    alert("Tip sent!");
  };

  const withdraw = async () => {
    if (!wallet.publicKey) return;
    const program = getProgram(wallet);
    const [jarPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("jar"), wallet.publicKey.toBuffer()],
      program.programId
    );
    await program.methods
      .withdraw()
      .accounts({
        jar: jarPda,
        owner: wallet.publicKey,
        systemProgram: PublicKey.default,
      })
      .rpc();
    alert("Withdraw complete!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center">
      {/* Header */}
      <header className="w-full py-6 flex justify-center bg-gray-800 shadow-md backdrop-blur">
        <h1 className="text-4xl font-extrabold text-purple-400 flex items-center gap-2">
          💜 Solana Tipping Jar
        </h1>
      </header>

      {/* Wallet Connect */}
      <div className="mt-8">
        <WalletButton />
      </div>

      {/* Action Card */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 mt-8 space-y-6 border border-gray-700">
        <button
          onClick={initializeJar}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition"
        >
          Initialize My Jar
        </button>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Owner Wallet Address"
            value={ownerPubkey}
            onChange={(e) => setOwnerPubkey(e.target.value)}
            className="w-full p-2 rounded-xl bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Amount (LAMPORTS)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded-xl bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={tip}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
        >
          Send Tip
        </button>

        <button
          onClick={withdraw}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
        >
          Withdraw (Owner only)
        </button>
      </div>
    </div>
  );
}

export default App;
