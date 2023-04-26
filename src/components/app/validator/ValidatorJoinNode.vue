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
                    <h3>Join the validators node.</h3>
                    <p>Stake 1500 $TRP to become a validator.</p>
                </div>
                <div class="actions">
                    <PrimaryButton v-on:click="joinNode()" :progress="joining" v-if="Number($fromWei(allowance)) >= 1500"
                        :text="'Join Node'" />
                    <PrimaryButton v-on:click="approve()" :progress="approving" v-else :text="'Enable $TRP'" />
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
import { messages } from '../../reactives/messages'
export default {
    props: ['userAddress'],
    
    data() {
        return {
            allowance: "0",
            joining: false,
            approving: false,
        }
    },

    watch: {
        userAddress: function () {
            this.getAllowance()
        }
    },

    mounted() {
        this.getAllowance()
    },

    methods: {
        joinNode: async function () {
            this.joining = true                        

            const trx = await TurpleCoreAPI.joinValidator()

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Joined Validator Node',
                    description: 'You\'ve successfully staked 1,500 TRP',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
 
                this.$router.push('/app/validator')
            } else {
                messages.insertMessage({
                    title: 'Failed to Join Validator Node',
                    description: 'Error: Please try again',
                    type: 'failed'
                })
            }

            this.joining = false
        },

        getAllowance: async function () {
            if (this.userAddress) {
                const amount = await this.$allowanceOf(
                    this.userAddress,
                    config.tokenAddress,
                    TurpleCoreAPI   .address
                )

                this.allowance = amount.toString()
            }
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