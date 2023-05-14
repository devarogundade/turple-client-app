<template>
    <section v-if="ad">
        <div class="page_width">
            <main>
                <div class="title">
                    <h3>Manage campaign</h3>

                    <div class="header">

                        <div class="links">
                            <RouterLink to="/app/advertiser">
                                <p>Campaigns</p>
                            </RouterLink>
                            <p>/</p>
                            <p>{{ JSON.parse(ad.metadata).name }}</p>
                        </div>

                        <div class="actions">
                            <PrimaryButton v-if="ad.state == 3" v-on:click="resumeAd()" :progress="resuming"
                                :width="'200px'" :text="'Resume'" />
                            <PrimaryButton v-if="ad.state == 0" v-on:click="proposeAd()" :progress="proposing"
                                :width="'200px'" :text="'Propose'" />
                            <PrimaryButton v-if="ad.state == 1 && adStatus == 0" :state="'disable'" :width="'200px'"
                                :text="'Wait for validators'" />
                            <PrimaryButton v-if="ad.state == 1 && adStatus == 1" v-on:click="publishAd()"
                                :progress="publishing" :width="'200px'" :text="'Publish'" />
                        </div>
                    </div>
                </div>

                <div class="form_parent">
                    <div class="balance">
                        <h3>Balance</h3>
                        <div class="fund">
                            <p>{{ $toMoney($fromWei(ad.balance)) }} <span>$TRP</span></p>
                            <PrimaryButton :text="'Fund'" v-on:click="fundAd()" v-if="Number($fromWei(allowance)) >= 100"
                                :progress="funding" :width="'100px'" />
                            <PrimaryButton v-on:click="approve()" :progress="approving" v-else :text="'Enable $TRP'" />
                        </div>
                    </div>
                    <div class="form">
                        <div class="input">
                            <label for="">Campaign format</label>
                            <div class="formats">
                                <div v-if="ad.format == 0" class="selected_format format">
                                    <IconMobile />
                                    <p>Full on-mobile</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-if="ad.format == 1" class="selected_format format">
                                    <IconGlobal />
                                    <p>Website Video Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-if="ad.format == 2" class="selected_format format">
                                    <IconGame />
                                    <p>Rewarded Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>
                            </div>
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign video</label>
                            <div class="upload_video" v-on:click="pickFile()">
                                <IconVideoCircle />
                                <p>Play Video</p>
                            </div>
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign category</label>
                            <div class="categories">
                                <div class="category" v-if="ad.category == 0">
                                    <div class="name">
                                        <IconGame />
                                        <P>Metaverse and Gaming</P>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" :checked="true" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category" v-if="ad.category == 1">
                                    <div class="name">
                                        <IconBlockchain />
                                        <P>DeFi, DAOs and AMMs</P>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" :checked="true" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category" v-if="ad.category == 2">
                                    <div class="name">
                                        <IconGame />
                                        <P>Artistry, NFTs, and Marketplaces</P>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" :checked="true" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category" v-if="ad.category == 3">
                                    <div class="name">
                                        <IconGame />
                                        <P>ICO, IDO, INO, IGO and others</P>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" :checked="true" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category" v-if="ad.category == 4">
                                    <div class="name">
                                        <IconGame />
                                        <P>Fashion Industry</P>
                                    </div>
                                    <label class="switch">
                                        <input type="checkbox" :checked="true" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../../PrimaryButton.vue'
import IconMobile from '../../icons/IconMobile.vue'
import IconGame from '../../icons/IconGame.vue'
import IconGlobal from '../../icons/IconGlobal.vue'
import IconBlockchain from '../../icons/IconBlockchain.vue'
</script>

<script>
// import FileUtils from '../../../scripts/FileUtils'
import config from '../../../assets/config.json'
import { messages } from '../../reactives/messages'
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
import SubGraphAPI from '../../../scripts/SubGraphAPI'
import IconVideoCircle from '../../icons/IconVideoCircle.vue'
export default {
    props: ['userAddress'],
    data() {
        return {
            ad: null,
            resuming: false,
            funding: false,
            publishing: false,
            proposing: false,
            approving: false,
            allowance: '0',
            adStatus: 0
        };
    },
    watch: {
        userAddress: function () {
            this.getAllowance()
        }
    },
    mounted() {
        this.getAd()
        this.getAdStatus()
        this.getAllowance()
    },
    methods: {
        getAllowance: async function () {
            if (this.userAddress) {
                const amount = await this.$allowanceOf(
                    this.userAddress,
                    config.tokenAddress,
                    TurpleCoreAPI.address
                )

                this.allowance = amount.toString()
            }
        },

        getAdStatus: async function () {
            this.adStatus = await TurpleCoreAPI.proposalState(this.$route.params.id)
            console.log(this.adStatus);
        },

        approve: async function () {
            if (this.approving) return

            this.approving = true

            await this.$approve(
                config.tokenAddress,
                TurpleCoreAPI.address
            )

            this.approving = false
            this.getAllowance()
        },

        getAd: async function () {
            this.ad = await SubGraphAPI.ad(this.$route.params.id)
        },

        proposeAd: async function () {
            if (this.proposing) return

            this.proposing = true

            const trx = await TurpleCoreAPI.proposeAd(this.ad.adId);

            this.getAd()

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: "Ad campaign has been proposed",
                    description: "Your ad will be approve or disapproved by validators",
                    type: "success",
                    linkTitle: "View Trx",
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                });
            }
            else {
                messages.insertMessage({
                    title: "Failed to create campaign",
                    description: "Please try transaction again",
                    type: "failed"
                });
            }

            this.proposing = false
        },

        fundAd: async function () {
            if (this.funding) return

            this.funding = true

            const trx = await TurpleCoreAPI.fundAd(this.ad.adId, this.$toWei('100'))

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: "Ad campaign has been proposed",
                    description: "Your ad will be approve or disapproved by validators",
                    type: "success",
                    linkTitle: "View Trx",
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                });
            }
            else {
                messages.insertMessage({
                    title: "Failed to create campaign",
                    description: "Please try transaction again",
                    type: "failed"
                });
            }

            this.funding = false
        },

        publishAd: async function () {
            if (this.publishing) return

            this.publishing = true

            const trx = await TurpleCoreAPI.publishAd(this.ad.adId)

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: "Ad campaign has been published",
                    description: "Your ad has been successfully published",
                    type: "success",
                    linkTitle: "View Trx",
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                });
            }
            else {
                messages.insertMessage({
                    title: "Failed to publish campaign",
                    description: "Please try transaction again",
                    type: "failed"
                });
            }

            this.publishing = false
        }
    },
    components: { IconVideoCircle }
}
</script>

<style scoped>
section {
    min-height: 960px;
    background: url('/images/hero_bg.svg');
    /* background-repeat: no-repeat; */
    background-position: center center;
}

main {
    padding: 100px 0;
}

.title {
    position: sticky;
    padding: 10px 0;
    top: -50px;
    z-index: 1;
    backdrop-filter: blur(8px);
}

.title h3 {
    font-size: 50px;
    font-weight: 400;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.header {
    display: flex;
    margin-top: 40px;
    justify-content: space-between;
}

.actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.links {
    display: flex;
    align-items: center;
    gap: 10px;
}

.links a {
    font-weight: 500;
}

.form_parent {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
}

.balance {
    width: 100%;
    margin-bottom: 40px;
}

.balance h3 {
    font-size: 30px;
    font-weight: 500;
}

.balance .fund {
    display: flex;
    align-items: center;
    gap: 20px;
}

.balance .fund p {
    font-size: 45px;
    color: var(--primary);
}

.balance .fund span {
    font-size: 20px;
    color: var(--textdimmed);
    font-weight: 600;
}

.form {
    width: 800px;
    max-width: 100%;
}

.input {
    display: flex;
    flex-direction: column;
}

.input label {
    font-size: 14px;
}

.input input {
    margin-top: 10px;
    height: 50px;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    border-style: solid;
    border-width: 1px;
    border-color: #e4e4e4;
    border-radius: 3px;
    background-color: #fff;
    outline: none;
}

.formats {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.format {
    width: 240px;
    border-style: solid;
    border-width: 1px;
    border-color: #e4e4e4;
    border-radius: 3px;
    background-color: #fff;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    position: relative;
}

.format span {
    height: 24px;
    padding: 0 20px;
    background: var(--primary);
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 20px;
    left: 50%;
    transform: translate(-50%, 0);
}


.selected_format {
    background-color: #7557e117;
    border-color: var(--primary);
}

.format p:first-child {
    font-size: 16px;
    font-weight: 500;
}

.format p:last-child {
    font-size: 12px;
    margin-top: 10px;
    opacity: 0.7;
}

.upload_video {
    margin-top: 10px;
    width: 100%;
    height: 300px;
    background-color: #F5F5F5;
    text-align: center;
    border-radius: 10px;
    border: 1px #e4e4e4 solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.upload_video p {
    font-size: 12px;
    font-weight: 600;
}

.categories {
    margin-top: 10px;
}

.category {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #e4e4e4;
}

.category:first-child {
    border-top-style: solid;
    border-top-width: 1px;
    border-top-color: #e4e4e4;
}

.category .name {
    display: flex;
    gap: 10px;
    align-items: center;
}

.category .name p {
    font-size: 16px;
    font-weight: 600;
    opacity: 0.7;
}

.terms {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.terms p {
    font-size: 14px;
    font-weight: 500;
}


.terms p a {
    text-decoration: underline 1px var(--primary);
}
</style>