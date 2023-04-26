<template>
    <section>
        <div class="page_width">
            <main>
                <div class="title">
                    <h3>Hi, Welcome back!.</h3>
                </div>
                <div class="options">
                    <div class="option">
                        <img src="/images/defi-apps.png" alt="">
                        <div class="details">
                            <p>Advertiser</p>
                            <p>Launch a campaign</p>
                        </div>
                        <div class="actions">
                            <RouterLink to="/app/advertiser">
                                <PrimaryButton :text="'Continue'" />
                            </RouterLink>
                        </div>
                    </div>

                    <div class="option">
                        <img src="/images/defi-apps.png" alt="">
                        <div class="details">
                            <p>Publisher</p>
                            <p>Monetize your creation</p>
                        </div>
                        <div class="actions">
                            <RouterLink to="/app/publisher">
                                <PrimaryButton :text="'Continue'" />
                            </RouterLink>
                        </div>
                    </div>

                    <div class="option">
                        <img src="/images/defi-apps.png" alt="">
                        <div class="details">
                            <p>Validator</p>
                            <p>Start earnings in $TRP</p>
                        </div>
                        <div class="actions">
                            <RouterLink to="/app/validator">
                                <PrimaryButton :text="'Continue'" />
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../PrimaryButton.vue';
</script>

<style scoped>
section {
    min-height: 960px;
    background: url('/images/hero_bg.svg');
    background-repeat: no-repeat;
    background-position: center center;
}
main {
    padding: 160px 0;
}

.title {
    text-align: center;
}

.title h3 {
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.options {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    margin-top: 60px;
}

.option {
    width: 380px;
    padding: 20px 0;
    border-style: solid;
    border-width: 1px;
    border-color: #e4e4e4;
    border-radius: 3px;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
}

.option img {
    height: 260px;
}

.options .details {
    padding: 20px 30px;
}

.option .details p:first-child {
    font-size: 28px;
    font-weight: 500;
}

.option .details p:last-child {
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
}

.actions {
    padding: 20px 40px;
}
</style>