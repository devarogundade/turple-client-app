<template>
    <section>
        <div class="page_width">
            <div class="faucet">
                <h3 class="title">Turple Token</h3>

                <div class="tokenomics">
                    <div class="chart"></div>
                    <div class="detail">

                    </div>
                </div>

                <div class="actions">
                    <PrimaryButton v-on:click="mintTokens()" :text="'Mint free $TRP'" :width="'200px'"
                        :progress="minting" />
                    <PrimaryButton v-on:click="addToken()" :text="'Add $TRP to wallet'" :width="'240px'"
                        :progress="adding" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../PrimaryButton.vue';
</script>

<script>
import config from '../../assets/config.json'
import { messages } from '../reactives/messages';
import Approval from '../../scripts/Approval'
export default {
    data() {
        return {
            minting: false,
            adding: false
        }
    },
    methods: {
        addToken: async function () {
            if (this.adding) return

            this.adding = true

            const result = await Approval.addToken(config.tokenAddress)

            if (result) {
                messages.insertMessage({
                    title: 'Token has been added',
                    description: 'You\'ve successfully added TRP to your wallet',
                    type: 'success'
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to add token',
                    description: 'Please try adding again',
                    type: 'failed'
                })
            }

            this.adding = false
        },

        mintTokens: async function () {
            if (this.minting) return

            this.minting = true

            const trx = await Approval.mintTokens(
                config.tokenAddress,
                this.$toWei('20000')
            )

            if (trx && trx.transactionHash) {
                messages.insertMessage({
                    title: 'Tokens has been minted',
                    description: 'You\'ve successfully received free tokens',
                    type: 'success',
                    linkTitle: 'View Trx',
                    linkUrl: `https://testnet-explorer.thetatoken.org/txs/${trx.transactionHash}`
                })
            } else {
                messages.insertMessage({
                    title: 'Failed to mint tokens',
                    description: 'Please try transaction again',
                    type: 'failed'
                })
            }

            this.minting = false
        }
    }
}
</script>

<style scoped>
section {
    padding: 150px 0;
}

.title {
    font-size: 50px;
    font-weight: 400;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    text-align: center;
}

.actions {
    margin-top: 80px;
    display: flex;
    gap: 40px;
    justify-content: center;
}
</style>