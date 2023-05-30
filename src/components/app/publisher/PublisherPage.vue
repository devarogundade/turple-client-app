<template>
    <section>
        <div class="page_width">
            <div class="validator">
                <div class="panels">
                    <div class="panel">
                        <IconStake />
                        <h3>{{ apps.length }}</h3>
                        <p>Apps</p>
                    </div>
                    <!-- <div class="panel">
                        <IconCost />
                        <h3>1.523 <span>TRP</span></h3>
                        <p>Unclaimed Earnings</p>
                    </div> -->
                </div>

                <div class="toolbar">
                    <h3>My Apps</h3>
                    <RouterLink to="/app/publisher/create">
                        <PrimaryButton :text="'New App'" />
                    </RouterLink>
                </div>

                <div class="apps">
                    <RouterLink  v-for="app, i in apps" :key="i" :to="`/app/publisher/apps/${app.appId}`">
                        <div class="app">
                            <div class="detail">
                                <h3 class="name">{{ JSON.parse(app.metadata).name }}</h3>
                                <p class="id">subid_{{ app.appId }}</p>
                            </div>
                            <IconArrowRight />
                        </div>
                    </RouterLink>
                </div>

                <div class="t_empty" v-if="apps.length == 0">
                    <img src="/images/empty.png" alt="">
                    <p>No campaigns found.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import IconArrowRight from '../../icons/IconArrowRight.vue';
// import IconCost from '../../icons/IconCost.vue';
import IconStake from '../../icons/IconStake.vue'
import PrimaryButton from '../../PrimaryButton.vue';
</script>

<script>
import SubGraphAPI from '../../../scripts/SubGraphAPI';
export default {
    props: ['userAddress'],
    data() {
        return {
            apps: []
        };
    },
    watch: {
        userAddress: function() {
            this.getApps()
        }
    },
    mounted() {
        this.getApps()
    },
    methods: {
        getApps: async function () {
            if (this.userAddress) {
                this.apps = await SubGraphAPI.apps(this.userAddress)
            } else {
                this.apps = []
            }
        }
    },
    components: { IconArrowRight }
}
</script>

<style scoped>
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
    width: 100%;
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

.apps {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.app {
    padding: 20px 30px;
    border-radius: 20px;
    background-color: #F5F5F5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--textdimmed);
    cursor: pointer;
}

.app .name {
    font-size: 16px;
    font-weight: 500;
}

.app .id {
    font-size: 14px;
    opacity: 0.7;
}
</style>