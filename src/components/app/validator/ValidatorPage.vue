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
                        <h3>1,943,432</h3>
                        <p>Campaigns</p>
                    </div>
                    <div class="panel">
                        <IconGalleryEdit />
                        <h3>1,562</h3>
                        <p>Ongoing validation</p>
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
                            <video :src="video.sources[0]"></video>
                            <IconVideoCircle class="play_btn" />
                        </div>
                        <div class="details">
                            <h3 class="title">{{ video.title }}</h3>
                            <p class="description">{{ video.description }}</p>
                        </div>
                        <div class="details2">
                            <div>
                                <p>Votes</p>
                                <p>21</p>
                            </div>
                            <div>
                                <p>Reward</p>
                                <div class="token">
                                    <img src="" alt="">
                                    <p>0.01 TRP</p>
                                </div>
                            </div>
                        </div>
                        <div class="vote">
                            <PrimaryButton :text="'Up vote'" />
                            <PrimaryButton :text="'Down vote'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import IconPeople from '../../icons/IconPeople.vue';
import IconCost from '../../icons/IconCost.vue';
import IconStake from '../../icons/IconStake.vue'
import IconGalleryEdit from '../../icons/IconGalleryEdit.vue'
import IconGalleryTick from '../../icons/IconGalleryTick.vue'
import PrimaryButton from '../../PrimaryButton.vue';
import IconVideoCircle from '../../icons/IconVideoCircle.vue';
import ProgressBox from '../../ProgressBox.vue';
</script>

<script>
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
export default {
    props: ['userAddress'],
    data() {
        return {
            videos: [
                {
                    "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
                    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"],
                    "subtitle": "By Blender Foundation",
                    "thumb": "images/BigBuckBunny.jpg",
                    "title": "Big Buck Bunny"
                },
                {
                    "description": "The first Blender Open Movie from 2006",
                    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"],
                    "subtitle": "By Blender Foundation",
                    "thumb": "images/ElephantsDream.jpg",
                    "title": "Elephant Dream"
                },
                {
                    "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
                    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"],
                    "subtitle": "By Garage419",
                    "thumb": "images/SubaruOutbackOnStreetAndDirt.jpg",
                    "title": "Subaru Outback On Street And Dirt"
                },
                {
                    "description": "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
                    "sources": ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"],
                    "subtitle": "By Garage419",
                    "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
                    "title": "What care can you get for a grand?"
                }
            ],
            validator: null,
            fetching: true
        };
    },
    watch: {
        userAddress: function () {
            this.getValidatorProfile()
        }
    },
    mounted() {
        this.getValidatorProfile()
    },
    methods: {
        getValidatorProfile: async function () {
            if (this.userAddress) {
                this.fetching = true
                this.validator = await TurpleCoreAPI.validator(this.userAddress)

                if (this.validator && Number(this.validator.createdOn) == 0) {
                    this.$router.push('/app/validator/join')
                }

                this.fetching = false
            }
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

.campaign .token {
    display: flex;
    align-items: center;
    gap: 10px;
}

.campaign .vote {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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