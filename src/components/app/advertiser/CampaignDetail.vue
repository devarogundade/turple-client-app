<template>
    <div class="progress" v-if="!ad || !extAd">
        <ProgressBox />
    </div>
    <section v-else>
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
                    <div class="toolbar">
                        <div class="balance">
                            <div class="fund">
                                <p>{{ $toMoney($fromWei(ad.balance) - (extAd.spent)) }} <span>$TRP</span></p>
                                <PrimaryButton :text="'Fund'" v-on:click="fundAd()"
                                    v-if="Number($fromWei(allowance)) >= 100" :progress="funding" :width="'100px'" />
                                <PrimaryButton v-on:click="approve()" :progress="approving" v-else
                                    :text="'Enable $TRP to Fund'" />
                            </div>
                        </div>

                        <div class="stats">
                            <div class="stat">
                                <p><span>Views:</span> {{ extAd.views }}</p>
                            </div>
                            <div class="stat">
                                <p><span>Clicks:</span> {{ extAd.clicks }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="chart">
                        <div class="chart_box">
                            <div class="chart_grid">
                                <div class="chart_box_row" v-for="index in 6" :key="index"></div>
                            </div>
                            <div class="chart_grid_2">
                                <div class="chart_box_column" v-for="index in 12" :key="index"></div>
                            </div>
                            <div id="chart"></div>
                        </div>
                    </div>

                    <br> <br>

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
                                <VideoPlayer :height="'500px'" :options="{
                                    autoplay: false,
                                    controls: true,
                                    sources: [{
                                        src: `https://media.thetavideoapi.com/${JSON.parse(ad.metadata).videoId}/master.m3u8`,
                                        type: 'application/x-mpegurl'
                                    }]
                                }" />
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
                        <br> <br>
                        <a target="_blank" :href="JSON.parse(ad.metadata).link">
                            <PrimaryButton :text="'Go to link'" />
                        </a>
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
import ApexCharts from 'apexcharts'
import config from '../../../assets/config.json'
import { messages } from '../../reactives/messages'
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
import SubGraphAPI from '../../../scripts/SubGraphAPI'
// import IconVideoCircle from '../../icons/IconVideoCircle.vue'
import VideoPlayer from '../../VideoPlayer.vue'
import axios from 'axios'
import ProgressBox from '../../ProgressBox.vue'
export default {
    props: ['userAddress'],
    data() {
        return {
            ad: null,
            extAd: null,
            resuming: false,
            funding: false,
            publishing: false,
            proposing: false,
            approving: false,
            allowance: '0',
            adStatus: 0,
            chart: null
        };
    },
    watch: {
        userAddress: function () {
            this.getAllowance()
        }
    },
    mounted() {
        this.getAd()
        this.tryInitAd()
        this.getAdStatus()
        this.getAllowance()
    },
    methods: {
        renderChart: function () {
            var options = {
                stroke: {
                    curve: "smooth",
                    width: 2,
                    colors: ["#6936F5"]
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    },
                    padding: {
                        top: -28,
                        right: 0,
                        bottom: 0,
                        left: -9
                    }
                },
                chart: {
                    type: "area",
                    toolbar: { show: false },
                    height: 205,
                    width: "100%",
                    zoom: { enabled: false }
                },
                tooltip: {
                    x: { show: false },
                    marker: { show: false },
                    style: {
                        fontSize: "12px",
                        fontFamily: "Axiforma"
                    }
                },
                markers: {
                    strokeColors: "#6936F5",
                    colors: ["#EEF1F8"],
                    strokeWidth: 4,
                    radius: 2
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        type: "vertical",
                        gradientToColors: ["#6936F5", "#6936F5"],
                        inverseColors: true,
                        opacityFrom: 0.5,
                        opacityTo: 0.05
                    }
                },
                dataLabels: {
                    enabled: false
                },
                series: [{
                    name: "Impressions",
                    data: [34, 35, 31, 38, 40, 35, 42, 38, 34, 38, 80, 32],
                }, {
                    name: "Views",
                    data: [10, 25, 15, 12, 10, 7, 4, 13, 4, 13, 10, 12],
                }],
                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    tooltip: {
                        style: {
                            fontSize: "12px",
                            fontFamily: "Poppins"
                        }
                    }
                },
                yaxis: {
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                },
                legend: { show: false }
            };
            let dom = document.querySelector("#chart")
            if (dom && !this.chart) {
                this.chart = new ApexCharts(dom, options);
                this.chart.render();
            }
        },

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
                    title: "Ad campaign has been funded",
                    description: "Your ad balance will be increased.",
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
        },

        tryInitAd: function () {
            axios.post(`http://localhost:8080/ad/create?adid=${this.$route.params.id}`)
            this.tryGetAd()
        },

        tryGetAd: function () {
            axios.get(`http://localhost:8080/ad/${this.$route.params.id}`)
                .then(response => {
                    this.extAd = response.data.data
                })
        }
    },

    updated() {
        this.renderChart()
    },
    components: { VideoPlayer, ProgressBox }
}
</script>

<style scoped>
.progress {
    transition: .2s;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

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

.toolbar {
    margin-bottom: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stats {
    display: flex;
    align-items: center;
    gap: 40px;
}

.stat p {
    font-size: 36px;
    font-weight: 600;
}

.stat span {
    opacity: 0.7;
    font-size: 24px;
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
    width: 100%;
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
    /* background-color: #F5F5F5; */
    text-align: center;
    border-radius: 10px;
    /* border: 1px #e4e4e4 solid; */
    display: flex;
    border-radius: 4px;
    overflow: hidden;
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



.chart {
    width: 850px;
    background: var(--bglight);
    border-radius: 6px;
    padding: 30px;
}

.chart_box {
    margin-top: 30px;
    position: relative;
    height: 190px;
}

.chart_grid {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
}

.chart_box_row {
    height: 1px;
    background: #e4e4e4;
}

.chart_grid_2 {
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    justify-content: space-between;
}

.chart_box_column {
    width: 1px;
    background: #e4e4e4;
}

</style>