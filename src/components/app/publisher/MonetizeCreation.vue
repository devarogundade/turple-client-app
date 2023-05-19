<template>
    <div class="progress" v-if="!app || !extApp">
        <ProgressBox />
    </div>
    <section v-else>
        <div class="page_width">
            <div class="validator">
                <div class="panels">
                    <div class="panel">
                        <IconStake />
                        <h3>{{ extApp.views }}</h3>
                        <p>Total Views</p>
                    </div>
                    <div class="panel">
                        <IconCost />
                        <h3>{{ extApp.clicks }}</h3>
                        <p>Total Clicks</p>
                    </div>
                    <div class="panel">
                        <IconCost />
                        <h3>{{ $toMoney($fromWei(app.balance) - $fromWei(extApp.earned)) }} <span>TRP</span></h3>
                        <p>Unclaimed Earnings</p>
                    </div>
                </div>

                <div class="toolbar">
                    <h3>Get started</h3>
                    <RouterLink to="/app/advertiser/create">
                        <PrimaryButton :text="'Read the docs'" />
                    </RouterLink>
                </div>

                <div class="sdks">
                    <div class="options">
                        <img class="selected" src="/images/vue.png" alt="">
                        <img src="/images/react.png" alt="">
                        <img src="/images/angular.png" alt="">
                        <img src="/images/android.png" alt="">
                    </div>


                    <div class="steps">
                        <div class="step">npm install @turple/vue</div>
                        <div class="step">> .env <br> PUB_ID=pubid_{{ $route.params.id }}</div>
                        <div class="step">> main.js <br> import Adview from '@turple/vue' <br> app.use(Adview)</div>
                    </div>

                    <div class="steps">
                        <div class="step">> Component.vue <br> </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import IconCost from '../../icons/IconCost.vue';
import IconStake from '../../icons/IconStake.vue'
import PrimaryButton from '../../PrimaryButton.vue';
</script>


<script>
import axios from 'axios';
import SubGraphAPI from '../../../scripts/SubGraphAPI';
import ProgressBox from '../../ProgressBox.vue';
export default {
    data() {
        return {
            app: null,
            extApp: null
        };
    },
    mounted() {
        this.getApp();
        this.tryInitApp();
    },
    methods: {
        getApp: async function () {
            this.app = await SubGraphAPI.ad(this.$route.params.id);
        },
        tryInitApp: function () {
            axios.post(`https://turple-api-v1.onrender.com/app/create?appid=${this.$route.params.id}`);
            this.tryGetApp();
        },
        tryGetApp: function () {
            axios.get(`https://turple-api-v1.onrender.com/app/${this.$route.params.id}`)
                .then(response => {
                this.extApp = response.data.data;
            });
        }
    },
    components: { ProgressBox }
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
    width: 432px;
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

.sdks {
    margin-top: 40px;
}

.sdk {
    border-radius: 10px;
}

.options {
    display: flex;
    align-items: center;
    gap: 20px;
}

.options img {
    height: 30px;
    mix-blend-mode: luminosity;
    cursor: pointer;
    user-select: none;
}

.options .selected {
    mix-blend-mode: normal;
}

.steps {
    margin-top: 40px;
}

.step {
    padding: 20px;
    background: #F5F5F5;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 30px;
}
</style>