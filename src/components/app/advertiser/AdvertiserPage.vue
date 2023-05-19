<template>
    <div class="progress" v-if="fetching">
        <ProgressBox />
    </div>
    <section v-else>
        <div class="page_width">
            <div class="validator">
                <div class="panels">
                    <div class="panel">
                        <IconGalleryTick />
                        <h3>1,943,432</h3>
                        <p>My Campaigns</p>
                    </div>
                    <div class="panel">
                        <IconCost />
                        <h3>1.523 <span>TRP</span></h3>
                        <p>Total Balance</p>
                    </div>
                </div>

                <div class="toolbar">
                    <h3>My Campaigns</h3>
                    <RouterLink to="/app/advertiser/create">
                        <PrimaryButton :text="'Create Campaign'" />
                    </RouterLink>
                </div>

                <div class="campaigns">
                    <div v-for="video, i in videos" :key="i">
                        <div class="campaign">
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
                                    <p>Format</p>
                                    <p>{{ formats[video.format] }}</p>
                                </div>
                                <div>
                                    <p>Category</p>
                                    <!-- <div class="token"> -->
                                    <p>{{ categories[video.category] }}</p>
                                    <!-- </div> -->
                                </div>
                            </div>
                            <RouterLink :to="`/app/advertiser/ads/${video.id}`">
                                <div class="vote">
                                    <PrimaryButton :text="'Manage'" />
                                </div>
                            </RouterLink>
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
import IconCost from '../../icons/IconCost.vue';
import IconGalleryTick from '../../icons/IconGalleryTick.vue'
import PrimaryButton from '../../PrimaryButton.vue';
// import IconVideoCircle from '../../icons/IconVideoCircle.vue';
import ProgressBox from '../../ProgressBox.vue';
import VideoPlayer from '../../VideoPlayer.vue'
</script>

<script>
import SubGraphAPI from '../../../scripts/SubGraphAPI';
export default {
    props: ['userAddress'],
    data() {
        return {
            videos: [],
            formats: [
                'Full on-mobile',
                'Website Video Ads',
                'Rewarded Ads'
            ],
            categories: [
                'Metaverse and Gaming',
                'DeFi, DAOs and AMMs',
                'Artistry, NFTs, and Marketplaces',
                'ICO, IDO, INO, IGO and others',
                'Fashion Industry'
            ],
            advertiser: null,
            fetching: false
        };
    },
    watch: {
        userAddress: function () {
            this.getAds()
        }
    },
    mounted() {
        this.getAds()
    },
    methods: {
        getAds: async function () {
            if (this.userAddress) {
                this.videos = await SubGraphAPI.ads(this.userAddress)
            } else {
                this.videos = []
            }
        }
    },
    components: { IconCost, ProgressBox, PrimaryButton }
}
</script>

<style scoped>
.progress {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* validator */
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
    width: 50%;
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


.campaign .details2 p:first-child {
    font-size: 12px;
    margin-bottom: 10px;
}

.campaign .details2 p:last-child {
    text-align: center;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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

.campaign .token {
    display: flex;
    align-items: center;
    gap: 8px;
}

.token img {
    height: 22px;
}

.campaign .vote {
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