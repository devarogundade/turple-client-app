import axios from 'axios'

const SubGraphAPI = {
    BASE_URL: 'http://localhost:8000/subgraphs/name/turple',

    ads: async function (advertiser) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        adCreateds(where: {
                            advertiser: "${advertiser}"
                        }, orderBy: blockNumber) {
                            id
                            adId
                            advertiser
                            createdOn
                            balance
                            state
                            metadata
                            category
                            format
                        }
                    }`
                }
            )
            return response.data.data.adCreateds
        } catch (error) {
            console.error(error);
            return null
        }
    },

    apps: async function (publisher) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        appCreateds(where: {
                            publisher: "${publisher}"
                        }, orderBy: blockNumber) {
                            id
                            appId
                            format
                            category
                            claimedReward
                            metadata
                            publisher
                            createdOn
                        }
                    }`
                }
            )
            return response.data.data.appCreateds
        } catch (error) {
            console.error(error);
            return null
        }
    },

    approves: async function (adId) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        proposalApproveds(where: {
                            adId: ${adId}
                        }, orderBy: blockTimestamp) {
                            id
                            adId
                            validators
                        }
                    }`
                }
            )
            return response.data.data.proposalApproveds
        } catch (error) {
            console.error(error);
            return null
        }
    },

    disapproves: async function (adId) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        proposalDisApproveds(where: {
                            adId: ${adId}
                        }, orderBy: blockTimestamp) {
                            id
                            adId
                            validators
                        }
                    }`
                }
            )
            return response.data.data.proposalDisApproveds
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default SubGraphAPI