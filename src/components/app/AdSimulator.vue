<template>
    <section>
        <div class="page_width">
            <form>
                <input type="text" v-model="subid" placeholder="Enter your Sub ID here">
                <PrimaryButton :text="'Load Ad'" v-on:click="loadAd = true" />
            </form>
            <br> <br>
            <div class="video">
                <AdView v-if="loadAd" :subid="subid"
                    :src="'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'" />
            </div>
            <br> <br>
            <div class="text">
                <h1>Big Buck Bunny Animation</h1>
                <br>
                <p>
                    Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day
                    three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the
                    typical cartoon tradition he prepares the nasty rodents a comical revenge.
                    <br> <br>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab asperiores sint magni beatae ad, labore
                    minus ea officia, autem itaque reprehenderit id eveniet ipsam consequuntur, accusamus tempore. Nihil,
                    magni incidunt.
                    <br> <br>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum officiis itaque odio consequatur porro
                    delectus, labore odit corrupti quod laboriosam quos hic ea, fugit amet, ipsum quo mollitia id autem.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
import AdView from '../../../../sdks/vue/AdView.vue';
import PrimaryButton from '../PrimaryButton.vue';
</script>

<script>
export default {
    data() {
        return {
            subid: '',
            loadAd: false
        }
    }
}
</script>

<style scoped>
section {
    padding: 120px 0;
    background: url('/images/hero_bg.svg');
    background-repeat: no-repeat;
    background-position: center center;
    overflow-x: hidden;
}

form input {
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    border-radius: 4px;
    border: 1px #ccc solid;
    font-size: 16px;
}

.page_width {
    width: 800px;
}
</style>