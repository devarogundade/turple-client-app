


<template>
    <section>
        <div class="page_width">
            <div class="container">
                <h3 class="title">Features</h3>
                <div class="showcases">
                    <div class="showcase">
                        <IconBlockchain />
                        <h3>Transparency</h3>
                        <p>
                            Turple are built on the theta blockchain technology, which provides complete transparency to all
                            parties involved. 
                            <br> <br>
                            Advertisers can see exactly where their ads are being placed, and publishers
                            can see how much they are being paid for each ad.
                        </p>
                    </div>
                    <div class="showcase">
                        <IconCost />
                        <h3>Cost efficiency</h3>
                        <p>
                            Turple eliminates the need for intermediaries, such as ad agencies or middlemen, which reduces
                            costs for both advertisers and publishers.
                        </p>
                    </div>
                    <div class="showcase">
                        <IconSheild />
                        <h3>Trust and security</h3>
                        <p>
                            The use of blockchain technology ensures that transactions are secure and tamper-proof. 
                            <br> <br>
                            This helps to build trust between advertisers and publishers, as well as between the platform and its
                            users.
                        </p>
                    </div>
                    <div class="showcase">
                        <IconPrivacy />
                        <h3>Data privacy</h3>
                        <p>
                            Turple allow users to control their own data, and they can choose what information to share with
                            advertisers.
                            <br> <br>
                            This provides a more secure and private environment for users.
                        </p>
                    </div>
                    <div class="showcase">
                        <IconContact />
                        <h3>Fairness</h3>
                        <p>
                            Turple use smart contracts to ensure that all parties are treated fairly.
                            <br> <br>
                            This means that advertisers get what they pay for, and publishers are paid fairly for their services.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import IconContact from '../icons/IconContact.vue';
import IconPrivacy from '../icons/IconPrivacy.vue';
import IconSheild from '../icons/IconSheild.vue';
import IconCost from '../icons/IconCost.vue';
import IconBlockchain from '../icons/IconBlockchain.vue';
</script>

<style scoped>
.title {
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}
.showcases {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 100px 0;
}

.showcase {
    padding: 40px 30px;
    width: 380px;
    max-width: 100%;
    background-color: #F5F5F5;
    text-align: center;
    border-radius: 10px;
    border: 1px #e4e4e4 solid;
}

.showcase h3 {
    font-size: 20px;
    font-weight: 500;
    margin-top: 14px;
    color: var(--textdimmed);
}

.showcase p {
    margin-top: 16px;
    font-size: 14px;
    line-height: 24px;
    color: var(--textdimmed);
}

@media screen and (max-width: 700px) {
    .title {
        font-size: 30px;
    }

}
</style>