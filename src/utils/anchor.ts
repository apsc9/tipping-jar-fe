import { Connection } from "@solana/web3.js";
import { AnchorProvider, Program, type Idl } from "@coral-xyz/anchor";
import idl from "../idl/sol_jar.json";

//const programID = new PublicKey(idl.address);
const network = "https://api.devnet.solana.com";

export const getProgram = (wallet: any) => {

  if (!wallet || !wallet.publicKey) throw new Error("Wallet not connected");

  const connection = new Connection(network, "confirmed");


  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });

  return new Program(idl as Idl, provider);
};
