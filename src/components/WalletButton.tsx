import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletButton = () => (
  <div className="flex justify-center p-4">
    <WalletMultiButton className="bg-purple-600 text-white px-4 py-2 rounded-xl" />
  </div>
);
