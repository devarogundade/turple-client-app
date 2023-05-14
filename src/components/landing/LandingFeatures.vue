
<script setup>
import IconArrowRight from '../icons/IconArrowRight.vue';
import SVGWave from './SVGWave.vue';
</script>

<template>
    <section class="wave_section">
        <SVGWave />
    </section>
    <section class="main_section">
        <div class="page_width">
            <h3 class="title">Why Should You Use Turple?</h3>
            <p class="desc">We unlocks an attractive option for advertisers and publishers who want to have more control
                over their advertising <br> campaigns and earn more revenue without the need for intermediaries.</p>
            <div class="features">
                <div class="feature">
                    <div class="image">
                        <img src="/images/advertiser2.png" alt="">
                    </div>
                    <div class="text">
                        <h3>For advertisers who want to reduce cost</h3>
                        <p class="feature_desc">All blockchains are unified into one simple SDK. Effortlessly develop apps
                            on any supported blockchain with no previous blockchain experience.
                            <br> <b>Code once, deploy to any blockchain.</b>
                        </p>
                        <div class="link">
                            <p>Launch Campaign</p>
                            <IconArrowRight />
                        </div>
                    </div>
                </div>

                <div class="feature">
                    <div class="image">
                        <img src="/images/integrate.png" alt="">
                    </div>
                    <div class="text">
                        <h3>Integration with popular website builders</h3>
                        <p class="feature_desc">All blockchains are unified into one simple SDK. Effortlessly develop apps
                            on any supported blockchain with no previous blockchain experience.
                            <br> <b>Code once, deploy to any blockchain.</b>
                        </p>
                        <div class="link">
                            <p>Supported CMS</p>
                            <IconArrowRight />
                        </div>
                    </div>
                </div>

                <div class="feature">
                    <div class="image">
                        <img src="/images/token.png" alt="">
                    </div>
                    <div class="text">
                        <h3>Turple token (TNT-20 Standard)</h3>
                        <p class="feature_desc">
                            Turple token (TRP) is the only payment method on Turple, it helps provides a secure and
                            transparent way to conduct transactions without the need for intermediaries.
                            <br> <b>Code once, deploy to any blockchain.</b>
                        </p>
                        <div class="link">
                            <p>Supported Blockchains</p>
                            <IconArrowRight />
                        </div>
                    </div>
                </div>

                <div class="feature">
                    <div class="image">
                        <img src="/images/sdk.png" alt="">
                    </div>
                    <div class="text">
                        <h3>Turple - Standard development kits</h3>
                        <p class="feature_desc">Turple development kits a set of tools that provide developers with the
                            ability to integrate Turple ads into their dApp.
                            <br> <b>Code once, deploy to any blockchain.</b>
                        </p>
                        <div class="link">
                            <p>Supported Blockchains</p>
                            <IconArrowRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.wave_section {
    margin-top: -160px;
}

.main_section {
    background-image: linear-gradient(to bottom, #f5f5f5, transparent, transparent);
    margin-top: -80px;
    padding: 100px 0;
}

.title {
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.desc {
    text-align: center;
    margin-top: 20px;
    font-size: 18px;
    line-height: 30px;
}

.chains {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
}

.chain {
    display: flex;
    gap: 10px;
    background: #fff;
    border-radius: 6px;
    padding: 20px;
    width: 200px;
    align-items: center;
}

.chain img {
    height: 40px;
    object-fit: contain;
    width: 40px;
}

.features {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    gap: 120px;
}

.feature {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 100px;
    max-width: 100%;
}

.feature:nth-child(even) {
    flex-direction: row-reverse;
}

.feature .image {
    width: 350px;
    max-width: 100%;
}

.feature .image img {
    height: 100%;
    width: 100%;
}

.feature .text {
    width: 600px;
    max-width: 100%;
    height: 100%;
}

.feature .text h3 {
    font-size: 40px;
    line-height: 45px;
    font-weight: 500;
}

.text .feature_desc {
    font-size: 16px;
    line-height: 30px;
    margin-top: 20px;
}

.text .link {
    display: flex;
    align-items: center;
    margin-top: 60px;
    gap: 8px;
    font-size: 14px;
}

.link p {
    text-decoration: underline;
}

.link svg {
    width: 18px;
}

@media screen and (max-width: 700px) {

    .wave_section {
        margin-top: 60px;
    }

    .title {
        font-size: 30px;
    }

    .desc {
        font-size: 14px;
        line-height: 24px;
    }

    .features {

        gap: 80px;
    }

    .feature {
        gap: 20px;
    }

    .feature .text h3 {
        font-size: 30px;
        line-height: 35px;
    }

    .text .feature_desc {
        font-size: 14px;
        line-height: 24px;
    }
}</style>