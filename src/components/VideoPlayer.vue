<template>
    <div class="container" :style="height ? `height: ${height};` : 'height: 300px;'">
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    name: 'VideoPlayer',
    props: {
        height: {
            type: String
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
            this.player.log('onPlayerReady', this);
        });
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
}

.video-js {
    width: 100%;
    height: 100%;
}

video {
    object-fit: cover;
}
</style>