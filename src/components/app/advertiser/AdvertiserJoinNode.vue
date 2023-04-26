<template>
    <main>
        <div class="box">
            <div class="box_item">
                <div class="icon">
                    <div>
                        <div>
                            <IconPeople />
                        </div>
                    </div>
                </div>
                <div class="text">
                    <h3>Become an Advertiser.</h3>
                    <p>Launch your first AD campaign.</p>
                </div>
                <div class="actions">
                    <PrimaryButton v-on:click="joinNode()" v-if="Number($fromWei(allowance)) >= 1500" :text="'Join Node'" />
                    <PrimaryButton v-on:click="approve()" v-else :text="'Enable $TRP'" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import PrimaryButton from '../../PrimaryButton.vue';
import IconPeople from '../../icons/IconPeople.vue';
</script>

<script>
import TurpleCoreAPI from '../../../scripts/TurpleCoreAPI'
import config from '../../../assets/config.json'
export default {
    props: ['userAddress'],
    data() {
        return {
            allowance: "0",
            joining: false,
            approving: false,
        }
    },
    mounted() {
        this.getAllowance()
    },
    methods: {
        joinNode: async function () {
            const trx = await TurpleCoreAPI.joinValidator()
            console.log(trx);
        },
        getAllowance: async function () {
            const amount = await this.$allowanceOf(
                this.userAddress,
                config.tokenAddress,
                TurpleCoreAPI.address
            )
            this.allowance = amount.toString();
        },
        approve: async function () {
            if (this.approving) return

            this.approving = true

            await this.$approve(
                this.userAddress,
                config.tokenAddress,
                TurpleCoreAPI.address
            )

            this.approving = false
            this.getAllowance()
        },
    }
}
</script>

<style scoped>
main {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: -60px;
}

.box {
    width: 800px;
    max-width: 100%;
    position: relative;
}

img {
    width: 100%;
}

.box_item {
    position: absolute;
    top: 340px;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.icon {
    width: 100px;
    height: 100px;
    background: rgba(105, 54, 245, 0.05);
    border-radius: 8px;
    padding: 10px;
}

.icon>div {
    width: 80px;
    height: 80px;
    background: rgba(105, 54, 245, 0.2);
    border-radius: 8px;
    padding: 10px;
}

.icon>div>div {
    width: 60px;
    height: 60px;
    background: var(--primary);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.text {
    text-align: center;
}

.text h3 {
    margin-top: 60px;
    font-size: 25px;
    font-weight: 600;
}

.text p {
    margin-top: 20px;
    font-size: 14px;
    font-weight: 500;
}

.actions {
    margin-top: 80px;
}
</style>