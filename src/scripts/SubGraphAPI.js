import axios from 'axios'

const SubGraphAPI = {
    BASE_URL: 'http://localhost:8000/subgraphs/name/turple',

    ads: async function (advertiser, state = null) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: !state ? `{
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
                            approves {
                                id
                                validator
                            }
                            disapproves {
                                id
                                validator
                            }
                            status
                        }
                    }` : `{
                        adCreateds(where: {
                           state: ${state}
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
                            approves {
                                id
                                validator
                            }
                            disapproves {
                                id
                                validator
                            }
                            status
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

    ad: async function (id) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        adCreated (id: "${id}") {
                            id
                            adId
                            advertiser
                            createdOn
                            balance
                            state
                            metadata
                            category
                            format
                            approves {
                                id
                                validator
                            }
                            disapproves {
                                id
                                validator
                            }
                            status
                        }
                    }`
                }
            )
            return response.data.data.adCreated
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

    app: async function (id) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        appCreated (id: "${id}") {
                            id
                            appId
                            format
                            category
                            claimedReward
                            metadata
                            publisher
                            createdOn
                            claimedReward
                        }
                    }`
                }
            )
            return response.data.data.appCreated
        } catch (error) {
            console.error(error);
            return null
        }
    },

    hasApprove: async function (adId, userAddress) {
        try {
            const response = await axios.post(this.BASE_URL,
                {
                    query: `{
                        proposalApproveds(where: {
                            adId: ${adId},
                            validator: ${userAddress}
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