import TurpleCoreABI from '../contracts/TurpleCore.json'
import { readContract, prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'

const TurpleCoreAPI = {
    address: TurpleCoreABI.networks[365].address,

    // ========== Advertisers Functions =========== //

    advertiser: async function (userAddress) {
        try {
            return await readContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: '_advertisers',
                args: [userAddress]
            })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    createAd: async function (category, format, metadata) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'createAd',
                args: [category, format, metadata]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    pauseAd: async function (adId) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'pauseAd',
                args: [adId]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },


    fundAd: async function (adId, amount) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'fundAd',
                args: [adId, amount]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    proposeAd: async function (adId) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'proposeAd',
                args: [adId]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    publishAd: async function (adId) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'publishAd',
                args: [adId]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // ========== Publishers Functions =========== //

    createApp: async function (category, format, metadata) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'createApp',
                args: [category, format, metadata]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    /** not resured! */
    claimAppReward: async function (appId, amount) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'claimAppReward',
                args: [appId, amount]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    // ========== Validators Functions =========== //

    validator: async function (userAddress) {
        try {
            return await readContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: '_validators',
                args: [userAddress]
            })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    joinValidator: async function () {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'joinValidator'
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    voteAdUp: async function (adId) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'voteAdUp',
                args: [adId]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    voteAdDown: async function (adId) {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'voteAdDown',
                args: [adId]
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    },

    exitValidator: async function () {
        try {
            const config = await prepareWriteContract({
                address: this.address,
                abi: TurpleCoreABI.abi,
                functionName: 'exitValidator'
            })

            const { hash } = await writeContract(config)

            return await waitForTransaction({ hash: hash })
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default TurpleCoreAPI