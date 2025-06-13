import { Contract, Wallet, providers, ethers } from "ethers"
import { KYCverifyABI } from "../config/constant.js"

export const verify = async (request, res) => {
    try {
        const userAddress = request.body.address

        const KYCAddress = process.env.KYC_CONTRACT_ADDRESS

        const provider = new providers.JsonRpcProvider(process.env.RPC_PROVIDER_URL)

        const wallet = new Wallet(process.env.WALLET_PRIVATE, provider)

        const KYCContract = new Contract(KYCAddress, KYCverifyABI, wallet)

        const tx = await KYCContract.verifyUser(userAddress, true, {
            maxFeePerGas: ethers.utils.parseUnits("35", "gwei"),
            maxPriorityFeePerGas: ethers.utils.parseUnits("25", "gwei"),
        })

        const receipt = await tx.wait()
        console.log(receipt.events)

        return res.status(200).json({ 
            status: "ok",
            hash: tx.hash,
         })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

export const check = async (req, res) => {
    try {
        const address = req.body.address

        const KYCAddress = process.env.KYC_CONTRACT_ADDRESS

        const provider = new providers.JsonRpcProvider(process.env.RPC_PROVIDER_URL)

        const wallet = new Wallet(process.env.WALLET_PRIVATE, provider)

        const KYCContract = new Contract(KYCAddress, KYCverifyABI, wallet)

        const status = await KYCContract.checkKYC(address)

        return res.status(200).json({ status" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}
