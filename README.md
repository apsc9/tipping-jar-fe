# Project Description

**Deployed Frontend URL:** https://tipping-jar-fe.vercel.app/

**Solana Program ID:** BzjrZ3brEiciUeNoyrnB5TgDaiipRGxnRjh4Yw6SZkjR

## Project Overview

### Description
Tipping Jar is a decentralized application built on Solana that enables users to create personal tipping jars (PDAs) to receive SOL from others. Anyone can send tips to a jar, but only the jar’s owner can withdraw the funds. This dApp demonstrates essential Solana concepts like Program Derived Addresses, secure ownership checks, lamport transfers, and integration with a modern React + Tailwind frontend.

### Key Features
[TODO: List the main features of your dApp. Be specific about what users can do.]

- **Initialize Jar**: Create a personal tipping jar PDA tied to your wallet
- **Send Tip**: Any wallet can tip a jar owner by entering their address and amount
- **Withdraw**: Only the jar owner can withdraw accumulated tips while keeping the account rent-exempt
- **Wallet Integration**: Phantom and Solflare support using Solana Wallet Adapter
- **Modern UI**: Clean, responsive interface with Tailwind CSS
  
### How to Use the dApp
1. **Connect Wallet** – Connect your Solana wallet (Phantom/Solflare)
2. **Initialize Jar** – Click “Initialize Jar” to create your personal jar account (PDA)
3. **Send Tip** – Enter a jar owner’s address, specify amount, and send SOL from your wallet
4. **Withdraw** – If you are the jar owner, click “Withdraw” to move tips from PDA → your wallet
5. **View Flow** – Tips accumulate in the PDA until withdrawn by the owner

## Program Architecture
The Tipping Jar dApp uses a simple but complete architecture with one main account type (Jar) and three core instructions.
The program leverages PDAs to ensure that each jar is uniquely tied to an owner wallet, preventing unauthorized access and enabling deterministic addressing.

### PDA Usage
The program creates deterministic jar accounts for each wallet owner:

- Jar PDA: Derived from seeds ["jar", owner_wallet_pubkey]
- Ensures each wallet has a unique jar account
- Only the wallet that created the jar can withdraw funds

### Program Instructions
These are the instructions implemented in the program: 

**Instructions Implemented:**
- **InitializeJar**: Creates a new Jar PDA for the connected wallet and stores owner + bump
- **Tip**: Allows any wallet to transfer SOL into the Jar PDA
- **Withdraw**: Transfers accumulated lamports from Jar PDA → Owner’s wallet, ensuring rent exemption remains

### Account Structure
```rust
#[account]
pub struct Jar {
    pub owner: Pubkey, // The wallet that owns this jar
    pub bump: u8,      // PDA bump seed
}
```

## Testing

### Test Coverage
Here is the description of the tests covered:

**Happy Path Tests:**
1. **Initialize a Jar PDA for an Owner**
2. **Accepts a Non-Zero Tip**
3. **Allows Owner to Withdraw Funds**
4. **Accepts Multiple Tips and Accumulates Them**

**Unhappy Path Tests:**
1. **Rejects Re-Initialization of an Existing Jar**
2. **Rejects a Zero Tip**
3. **Does Not Allow Non-Owner to Withdraw**
4. **Does Not Allow Withdraw if Jar is Empty**
5. **Rejects a Tip if Tipper Has Insufficient Balance**

### Running Tests
```bash
yarn install
anchor test
```