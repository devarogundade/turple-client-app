<template>
    <div class="progress" v-if="fetching">
        <ProgressBox />
    </div>
    <section v-else-if="!fetching && validator">
        <div class="page_width">
            <div class="validator">
                <div class="panels">
                    <div class="panel">
                        <IconGalleryTick />
                        <h3>{{ videos.length }}</h3>
                        <p>Campaigns</p>
                    </div>
                    <div class="panel">
                        <IconStake />
                        <h3>{{ $toMoney($fromWei(validator.turpleStaked)) }} <span>TRP</span></h3>
                        <p>My Stake</p>
                    </div>
                    <div class="panel">
                        <IconCost />
                        <h3>{{ $toMoney($fromWei(validator.claimedReward)) }} <span>TRP</span></h3>
                        <p>Claimed Earnings</p>
                    </div>
                    <div class="panel">
                        <IconCost />
                        <h3>{{ $toMoney($fromWei(validator.unClaimedReward)) }} <span>TRP</span></h3>
                        <p>UnClaimed Earnings</p>
                        <PrimaryButton v-if="(validator.unClaimedReward) > 0" :text="'Claim'" :progress="claiming"
                            v-on:click="claim()" />
                    </div>
                </div>

                <div class="toolbar">
                    <h3>Ad Campaigns</h3>
                    <div class="options">
                        <p>Ongoing</p>
                        <IconPeople />
                    </div>
                </div>

                <div class="campaigns">
                    <div class="campaign" v-for="video, i in videos" :key="i">
                        <div class="video_box">
                            <VideoPlayer :options="{
                                autoplay: false,
                                controls: true,
                                sources: [{
                                    src: `https://media.thetavideoapi.com/${JSON.parse(video.metadata).videoId}/master.m3u8`,
                                    type: 'application/x-mpegurl'
                                }]
                            }" />
                            <!-- <IconVideoCircle class="play_btn" /> -->
                        </div>
                        <div class="details">
                            <h3 class="title">{{ JSON.parse(video.metadata).name }}</h3>
                            <p class="description">{{ JSON.parse(video.metadata).description }}</p>
                        </div>
                        <div class="details2">
                            <div>
                                <p>Votes</p>
                                <p>{{ video.approves.length + video.disapproves.length }}</p>
                            </div>
                            <div>
                                <p>$Reward</p>
                                <div class="token">
                                    <img src="/images/icon.png" alt="">
                                    <p>0.20 TRP</p>
                                </div>
                            </div>
                        </div>
                        <div class="vote" v-if="canVote(video)">
                            <PrimaryButton v-on:click="voteUp(video.adId)" :progress="votingUp == video.adId"
                                :text="'Up vote'" />
                            <PrimaryButton v-on:click="voteDown(video.adId)" :progress="votingDown == video.adId"
                                :text="'Down vote'" />
                        </div>
                        <div class="vote2" v-else>
                            <PrimaryButton :state="'disable'" :text="'Voted'" />
                        </div>
                    </div>
                </div>

                <div class="t_empty" v-if="videos.length == 0">
                    <img src="/images/empty.png" alt="">
                    <p>No campaigns found.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import IconPeople from '../../icons/IconPeople.vue';
import IconCost from '../../icons/IconCost.vue';
import IconStake from '../../icons/IconStake.vue'
// import IconGalleryEdit from '../../icons/IconGalleryEdit.vue'
import IconGalleryTick from '../../icons/IconGalleryTick.vue'
import PrimaryButton from '../../PrimaryButton.vue';
// import IconVideoCircle from '../../icons/IconVideoCircle.vue';
import ProgressBox from '../../ProgressBox.vue';
import VideoPlayer from '../../VideoPlayer.vue'
</script>

<script>
import { messages } from '../../reactives/messages';
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
import SubGraphAPI from '../../../scripts/SubGraphAPI';
export default {
    props: ['userAddress'],
    data() {
        return {
            videos: [],
            validator: null,
            fetching: true,
            votingUp: -1,
            votingDown: -1,
            claiming: false
        };
    },
    watch: {
        userAddress: function () {
            this.getAds()
            this.getValidatorProfile()
        }
    },
    mounted() {
        this.getAds()
        this.getValidatorProfile()
    },
    methods: {
        getAds: async function () {
            if (this.userAddress) {
                this.videos = await SubGraphAPI.ads(this.userAddress, 1)
            } else {
                this.videos = []
            }
        },

        getValidatorProfile: async function () {
            if (this.userAddress) {
                this.fetching = true
                this.validator = await TurpleCoreAPI.validator(this.userAddress)

                if (this.validator && Number(this.validator.createdOn) == 0) {
                    this.$router.push('/app/validator/join')
                }

                this.fetching = false
            }
        },

        canVote: function (ad) {
            for (let index = 0; index < ad.approves.length; index++) {
                if (ad.approves[index].validator.toLowerCase() == this.userAddress.toLowerCase()) {
                    return false
                }
            }

            for (let index = 0; index < ad.disapproves.length; index++) {
                if (ad.disapproves[index].validator.toLowerCase() == this.userAddress.toLowerCase()) {
                    return false
                }
            }

            return true
        },

        voteUp: async function (adId) {
            if (this.votingUp > 0) return

            this.votingUp = adId

            const trx = await TurpleCoreAPI.voteAdUp(adId)

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Ad campaign has been voted up',
                    description: 'You\'ve successfully vote this ad up',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to vote ad campaign up',
                    description: 'Please try transaction again',
                    type: 'failed'
                })
            }

            this.getAds()
            this.getValidatorProfile()

            this.votingUp = -1
        },

        voteDown: async function (adId) {
            if (this.votingDown > 0) return

            this.votingDown = adId

            const trx = await TurpleCoreAPI.voteAdDown(adId)

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Ad campaign has been voted down',
                    description: 'You\'ve successfully vote this ad down',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to vote ad campaign down',
                    description: 'Please try transaction again',
                    type: 'failed'
                })
            }

            this.getAds()
            this.getValidatorProfile()

            this.votingDown = -1
        },

        claim: async function () {
            if (this.claiming) return

            this.claiming = true

            const trx = await TurpleCoreAPI.claimValidatorReward()

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Earnings has been claimed',
                    description: 'You\'ve successfully claim your earnings',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to claim earnings',
                    description: 'Please try transaction again',
                    type: 'failed'
                })
            }

            this.claiming = false

            this.getValidatorProfile()
        }
    },
    components: { IconCost, ProgressBox }
}
</script>

<style scoped>
/* validator */
.progress {
    transition: .2s;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.validator {
    padding: 120px 0;
}

.validator .panels {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    border-radius: 10px;
    border: 1px #FFC752 solid;
    background-color: #ffecc3;
}

.validator .panel {
    width: 324px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px #FFC752 solid;
    gap: 16px;
}

.validator .panel:last-child {
    border: none;
}

.validator .panel svg {
    width: 40px;
    height: 40px;
}

.validator .panel h3 {
    font-size: 30px;
    font-weight: 600;
    color: #6e4b00;
}

.validator .panel h3 span {
    font-size: 20px;
    color: var(--primary);
    font-weight: 600;
}

.validator .panel p {
    font-size: 16px;
    font-weight: 400;
    color: #6e4b00;
}

.validator .toolbar {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.validator .toolbar h3 {
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.validator .toolbar .options {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: #e4e4e4 1px solid;
    background: #F5F5F5;
    gap: 20px;
    border-radius: 10px;
}


.validator .toolbar .options p {
    font-size: 16px;
    font-weight: 500;
}

.campaigns {
    display: flex;
    align-items: center;
    gap: 40px 30px;
    flex-wrap: wrap;
    margin-top: 40px;
}

.campaign {
    width: 413px;
    background: #F5F5F5;
    border: 1px #e4e4e4 solid;
    border-radius: 10px;
    color: var(--textdimmed);
    overflow: hidden;
}

.campaign video {
    width: 100%;
    height: 320px;
    object-fit: cover;
    background: #e4e4e4;
}

.campaign .video_box {
    position: relative;
}

.campaign .play_btn {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 80px;
    height: 80px;
}

.campaign .details {
    padding: 20px;
}

.campaign .title {
    font-size: 24px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.campaign .description {
    margin-top: 10px;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.campaign .details2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
}

.campaign .details2>div {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.campaign .details2>div:first-child {
    border-right: 1px solid #e4e4e4;
}

.campaign .details2 p:last-child {
    text-align: center;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.campaign .token {
    display: flex;
    align-items: center;
    gap: 10px;
}

.token img {
    height: 22px;
}


.campaign .vote {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 20px;
    gap: 20px;
}

.campaign .vote2 {
    padding: 20px;
    gap: 20px;
}


.campaign .vote>div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
}
</style>