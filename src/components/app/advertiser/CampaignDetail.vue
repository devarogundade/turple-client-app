


<template>
    <section>
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
                            <p>Campaign name</p>
                        </div>

                        <PrimaryButton v-on:click="createCampaign()" :width="'200px'" :text="'Publish'" />
                    </div>
                </div>

                <div class="form_parent">
                    <div class="form">
                        <div class="input">
                            <label for="">Campaign name *</label>
                            <input type="text" v-model="campaignName" placeholder="E.g my game campaign">
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign format *</label>
                            <div class="formats">
                                <div v-on:click="campaignFormat = 'full-mobile'"
                                    :class="campaignFormat == 'full-mobile' ? 'selected_format format' : 'format'">
                                    <IconMobile />
                                    <p>Full on-mobile</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-on:click="campaignFormat = 'web-video'"
                                    :class="campaignFormat == 'web-video' ? 'selected_format format' : 'format'">
                                    <IconGlobal />
                                    <p>Website Video Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-on:click="campaignFormat = 'rewarded'"
                                    :class="campaignFormat == 'rewarded' ? 'selected_format format' : 'format'">
                                    <IconGame />
                                    <p>Rewarded Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div class="format">
                                    <span>Soon</span>
                                    <IconMobile2 />
                                    <p>Virtual Reality</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div class="format">
                                    <span>Soon</span>
                                    <IconMobile2 />
                                    <p>SmartTV Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>
                            </div>
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign video *</label>
                            <div class="upload_video" v-on:click="pickFile()">
                                <IconVideoCircle />
                                <p>Play Video</p>
                            </div>
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign category *</label>
                            <div class="categories">
                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>Metaverse and Gaming</P>
                                    </div>
                                    <label class="switch" v-on:click="campaignCategory = 'meta'">
                                        <input type="checkbox" :checked="campaignCategory == 'meta'" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconBlockchain />
                                        <P>DeFi, DAOs and AMMs</P>
                                    </div>
                                    <label class="switch" v-on:click="campaignCategory = 'defi'">
                                        <input type="checkbox" :checked="campaignCategory == 'defi'" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>Artistry, NFTs, and Marketplaces</P>
                                    </div>
                                    <label class="switch" v-on:click="campaignCategory = 'nft'">
                                        <input type="checkbox" :checked="campaignCategory == 'nft'" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>ICO, IDO, INO, IGO and others</P>
                                    </div>
                                    <label class="switch" v-on:click="campaignCategory = 'ico'">
                                        <input type="checkbox" :checked="campaignCategory == 'ico'" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>Fashion Industry</P>
                                    </div>
                                    <label class="switch" v-on:click="campaignCategory = 'fashion'">
                                        <input type="checkbox" :checked="campaignCategory == 'fashion'" disabled>
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
import ThetaVideoAPI from '../../../scripts/ThetaVideoAPI'
import PrimaryButton from '../../PrimaryButton.vue'
import IconFolderAdd from '../../icons/IconFolderAdd.vue'
import IconMobile from '../../icons/IconMobile.vue'
import IconMobile2 from '../../icons/IconMobile2.vue'
import IconGame from '../../icons/IconGame.vue'
import IconGlobal from '../../icons/IconGlobal.vue'
import IconBlockchain from '../../icons/IconBlockchain.vue'
</script>

<script>
import FileUtils from '../../../scripts/FileUtils'
import { messages } from '../../reactives/messages'
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
import IconVideoCircle from '../../icons/IconVideoCircle.vue'
export default {
    data() {
        return {
            campaignName: "",
            campaignFormat: "full-mobile",
            campaignCategory: "meta"
        };
    },
    methods: {
        createCampaign: async function () {
            if (this.campaignName == "") {
                messages.insertMessage({
                    title: "Enter campaign name",
                    description: "Campaign name is required",
                    type: "failed"
                });
                return;
            }

            const trx = await TurpleCoreAPI.createCampaign(this.campaignCategory, this.campaignFormat);

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: "Campaign has been created",
                    description: "You've successfully create a campaign",
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
    justify-content: center;
    margin-top: 40px;
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
}</style>