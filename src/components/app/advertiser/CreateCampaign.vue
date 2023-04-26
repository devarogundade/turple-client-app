<template>
    <section>
        <div class="page_width">
            <main>
                <div class="title">
                    <h3>Create a new campaign</h3>

                    <div class="header">

                        <div class="links">
                            <RouterLink to="/app/advertiser">
                                <p>Campaigns</p>
                            </RouterLink>
                            <p>/</p>
                            <p>Create Campaign</p>
                        </div>

                        <PrimaryButton :progress="creating" v-on:click="createCampaign()" :width="'200px'"
                            :text="'Create'" />
                    </div>
                </div>

                <div class="form_parent">
                    <div class="form">
                        <div class="input">
                            <label for="">Campaign name *</label>
                            <input type="text" v-model="adName" placeholder="E.g my game campaign">
                        </div>
                        <br> <br>
                        <div class="input">
                            <label for="">Campaign format *</label>
                            <div class="formats">
                                <div v-on:click="adFormat = 0"
                                    :class="adFormat == 0 ? 'selected_format format' : 'format'">
                                    <IconMobile />
                                    <p>Full on-mobile</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-on:click="adFormat = 1"
                                    :class="adFormat == 1 ? 'selected_format format' : 'format'">
                                    <IconGlobal />
                                    <p>Website Video Ads</p>
                                    <p>Best ideal for game mobile apps</p>
                                </div>

                                <div v-on:click="adFormat = 2"
                                    :class="adFormat == 2 ? 'selected_format format' : 'format'">
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
                                <IconFolderAdd />
                                <p>{{ videoFile ? videoFile.name : 'Upload Video' }}</p>
                                <input hidden ref="file" accept="video/*" type="file" v-on:change="selectFile($event)">
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
                                    <label class="switch" v-on:click="adCategory = 0">
                                        <input type="checkbox" :checked="adCategory == 0" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconBlockchain />
                                        <P>DeFi, DAOs and AMMs</P>
                                    </div>
                                    <label class="switch" v-on:click="adCategory = 1">
                                        <input type="checkbox" :checked="adCategory == 1" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>Artistry, NFTs, and Marketplaces</P>
                                    </div>
                                    <label class="switch" v-on:click="adCategory = 2">
                                        <input type="checkbox" :checked="adCategory == 2" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>ICO, IDO, INO, IGO and others</P>
                                    </div>
                                    <label class="switch" v-on:click="adCategory = 3">
                                        <input type="checkbox" :checked="adCategory == 3" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>

                                <div class="category">
                                    <div class="name">
                                        <IconGame />
                                        <P>Fashion Industry</P>
                                    </div>
                                    <label class="switch" v-on:click="adCategory = 4">
                                        <input type="checkbox" :checked="adCategory == 4" disabled>
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <br> <br>
                        <div class="terms">
                            <input type="checkbox" v-model="terms">
                            <p>Agree to <a href="">terms and privacy.</a></p>
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
export default {
    data() {
        return {
            videoFile: null,
            adName: '',
            adFormat: 0,
            adCategory: 0,
            terms: false,
            creating: false
        }
    },
    methods: {
        createCampaign: async function () {
            if (this.creating) return

            if (this.adName == '') {
                messages.insertMessage({
                    title: 'Enter campaign name',
                    description: 'Campaign name is required',
                    type: 'failed'
                })
                return
            }

            if (!this.videoFile) {
                messages.insertMessage({
                    title: 'Select your AD video',
                    description: 'You must upload an AD video',
                    type: 'failed'
                })
                return
            }

            if (!this.terms) {
                messages.insertMessage({
                    title: 'Agree to terms and policy',
                    description: 'You must agree to terms and policy',
                    type: 'failed'
                })
                return
            }

            this.creating = true

            const fileContents = await FileUtils.toBase64(this.videoFile)

            const upload = await ThetaVideoAPI.createAndUploadVideo(fileContents)

            console.log(upload);

            const metadata = {
                name: this.adName,
                description: null,
                playback_url: null
            }

            const trx = await TurpleCoreAPI.createAd(
                this.adCategory, 
                this.adFormat, 
                JSON.stringify(metadata)
            )

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Campaign has been created',
                    description: 'You\'ve successfully create a campaign',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to create campaign',
                    description: 'Please try transaction again',
                    type: 'failed'
                })
            }

            this.creating = false
        },
        pickFile: function () {
            this.$refs['file'].click()
        },
        selectFile: function (e) {
            const files = e.target.files
            if (files.length > 0) {
                this.videoFile = files[0]
            } else {
                this.videoFile = null
            }
        },
    }
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
}
</style>