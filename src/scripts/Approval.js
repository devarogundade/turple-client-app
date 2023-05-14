import { readContract, prepareWriteContract, writeContract, waitForTransaction, erc20ABI } from '@wagmi/core'

import TurpleTokenABI from '../contracts/TurpleToken.json'

const Approval = {
    balanceOf: async function (userAddress, tokenAddress) {
        try {
            return await readContract({
                address: tokenAddress,
                abi: erc20ABI,
                functionName: 'balanceOf',
                args: [userAddress]
            })
        } catch (error) {
            console.error(error);
            return 0
        }
    },

    approve: async function (amount, tokenAddress, spender) {
        try {
            const config = await prepareWriteContract({
                address: tokenAddress,
                abi: erc20ABI,
                functionName: 'approve',
                args: [spender, amount],
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({
                hash: hash
            })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    getAllocationOf: async function (userAddress, tokenAddress, spender) {
        try {
            return await readContract({
                address: tokenAddress,
                abi: erc20ABI,
                functionName: 'allowance',
                args: [userAddress, spender]
            })
        } catch (error) {
            console.error(error);
            return 0
        }
    },

    mintTokens: async function (tokenAddress, amount) {
        try {
            const config = await prepareWriteContract({
                address: tokenAddress,
                abi: TurpleTokenABI.abi,
                functionName: 'mintFaucet',
                args: [amount]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({
                hash: hash
            })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    addToken: async function (tokenAddress) {
        try {
            // eslint-disable-next-line no-undef
            await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: tokenAddress,
                        symbol: 'TRP',
                        decimals: '18',
                        image: 'https://turple.netlify.app/images/icon.png',
                    },
                },
            });
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }
}

export default Approval