<script setup>
import IconAirplane from '../icons/IconAirplane.vue';
import IconTheta from '../icons/IconTheta.vue';
import IconThetaVideo from '../icons/IconThetaVideo.vue';
</script>

<template>
    <section>
        <div class="page_width">
            <div class="hero">
                <div class="box">
                    <h3>20.1k+ Active Campaigns</h3>
                    <img src="/images/confetti.png" alt="">
                </div>
                <div class="text">
                    <h1>Decentralized Video Ads Network On Theta. <br> The Web3 Solution to Advertising.</h1>
                    <p class="desc">Turple ensures trust - advertisers get instant insight into their ad
                        transactions, publishers get paid directly and fairly, consumers' privacy is protected, and fraud
                        and bad actors are removed by validators.</p>
                    <div class="actions">
                        <RouterLink to="/app">
                            <div class="action">
                                <div></div>
                                <p>Launch App</p>
                                <IconAirplane />
                            </div>
                        </RouterLink>
                    </div>
                </div>
                <div class="images">
                    <div class="image">
                        <img src="/images/phoneads1.png" alt="">
                    </div>
                    <div class="image">
                        <img src="/images/tabletads1.png" alt="">
                    </div>
                    <div class="image">
                        <img src="/images/phoneads1.png" alt="">
                    </div>
                </div>
                <div class="credit">
                    <p>Built on</p>
                    <IconTheta />
                    <p>and</p>
                    <IconThetaVideo />
                    <p>network</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    padding-top: 60px;
    background: url('/images/hero_bg.svg');
    background-repeat: no-repeat;
    background-position: center center;
    overflow-x: hidden;
}

.hero {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
}

.box {
    max-width: 100%;
    width: 600px;
    height: 80px;
    gap: 20px;
    border-radius: 50px;
    border: 1px #FFC752 solid;
    background-color: #ffecc3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.box h3 {
    font-size: 30px;
    font-weight: 600;
    color: #6e4b00;
}

.box img {
    height: 40px;
}

.text {
    max-width: 100%;
    margin-top: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text h1 {
    font-size: 50px;
    line-height: 70px;
    font-weight: 400;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.text .desc {
    margin-top: 30px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 400;
    color: var(--textdimmed);
    width: 1000px;
    max-width: 100%;
}

.text .actions {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 60px;
}

.text .action {
    height: 60px;
    width: 240px;
    background: rgba(12, 10, 29, 1.0);
    border-radius: 40px;
    position: relative;
    overflow: hidden;
    gap: 8px;
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
}


.text .action p {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    z-index: 1;
}

.text .action svg {
    z-index: 1;
    rotate: 90deg;
    margin-left: -26px;
    opacity: 0;
    transition: .4s;
}

.text .action:hover svg {
    margin-left: 0;
    opacity: 1;
}

.text .action div {
    width: 260px;
    height: 260px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: -260px;
    transition: .6s;
    background: var(--primary);
    border-radius: 200px;
}

.text .action:hover {
    width: 280px;
}

.text .action:hover div {
    bottom: 50%;
}

.images {
    margin-top: 100px;
    display: flex;
    align-items: center;
    gap: 40px;
}

.image {
    perspective: 1000px;
    position: relative;
}


.image img {
    height: 400px;
    border-radius: 6px;
    object-fit: contain;
    transform: rotateY(24deg);
}

.image:nth-child(1) img {
    transform: rotateY(-24deg);
}


.image:nth-child(2) img {
    transform: rotateY(0);
    height: 460px;
}

.credit {
    margin-top: 100px;
    display: flex;
    align-items: center;
    gap: 30px;
}

.credit p {
    font-size: 14px;
    text-decoration: underline;
}

.credit svg {
    mix-blend-mode: luminosity;
}

@media screen and (max-width: 700px) {
    .box {
    max-width: 100%;
    height: 60px;

}

.box h3 {
    font-size: 16px;
}
.box img {
    height: 24px;
}

    .text h1 {
    font-size: 30px;
    line-height: 40px;
}

.text .desc {
    margin-top: 30px;
    font-size: 14px;
    line-height: 24px;
}
}
</style>