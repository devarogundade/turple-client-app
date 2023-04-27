<template>
    <main>
        <div class="home-width">
            <div class="footer">
                <div class="project">
                    <img src="/images/logo.png" alt="">
                    <div class="socials">
                        <a href="#">
                            <div class="social_icon">
                                <IconTelegram />
                            </div>
                        </a>
                        <a href="#">
                            <div class="social_icon">
                                <IconMedium />
                            </div>
                        </a> <a href="#">
                            <div class="social_icon">
                                <IconDiscord />
                            </div>
                        </a> <a href="#">
                            <div class="social_icon">
                                <IconTwitter />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Pages</h3>
                        <RouterLink to="/puplisher">
                            <p>Publisher</p>
                        </RouterLink>
                        <RouterLink to="/advertiser">
                            <p>Advertiser</p>
                        </RouterLink>
                        <RouterLink to="/validator">
                            <p>Become A Validator</p>
                        </RouterLink>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Site Map</h3>
                        <RouterLink to="/faucet">
                            <p>Faucet</p>
                        </RouterLink>
                        <a href="#">
                            <p>Blog</p>
                        </a>
                    </div>
                </div>
                <div class="pages">
                    <div class="page">
                        <h3>Products</h3>
                        <a target="_blank" href="https://darshprotocol.gitbook.io/product-docs">
                            <p>Docs</p>
                        </a>
                        <a href="#">
                            <p>Litepaper</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import IconTwitter from '../icons/IconTwitter.vue';
import IconTelegram from '../icons/IconTelegram.vue';
import IconMedium from '../icons/IconMedium.vue';
import IconDiscord from '../icons/IconDiscord.vue';
</script>

<style scoped>
main {
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to top, #7557e159, transparent);
}

.home-width {
    width: 1000px;
    max-width: 90%;
}

.footer {
    display: flex;
    flex-wrap: wrap;
    gap: 140px;
    padding-top: 160px;
    padding-bottom: 80px;
}

.project {
    width: 250px;
}

.project img {
    width: 120px;
}

.socials {
    margin-top: 50px;
    display: flex;
    gap: 10px;
}

.social_icon {
    width: 30px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #F1F1F1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.page h3 {
    font-weight: 600;
    font-size: 16px;
    color: #39375C;
    margin-bottom: 24px;
}

.page p {
    font-size: 16px;
    font-weight: 500;
    color: #39375C;
    padding: 10px 0;
}
</style>