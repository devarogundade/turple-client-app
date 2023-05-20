<template>
    <header>
        <section>
            <div class="page_width">
                <div class="container">
                    <div class="logo">
                        <img src="/images/logo.png" alt="">
                    </div>

                    <div class="actions">
                        <div class="links">
                            <RouterLink to="/app/faucet">Turple Token</RouterLink>
                            <RouterLink to="/app/validator">Become A Validator</RouterLink>
                            <RouterLink to="/app/simulator">Ad Simulator</RouterLink>
                            <a href="/#pricing">Pricing</a>
                            <a href="/#sdk">SDK</a>
                        </div>
                        <div class="auth">
                            <RouterLink to="">
                                <div class="helpdesk">Helpdesk</div>
                            </RouterLink>
                            <RouterLink to="/app/advertiser">
                                <div class="connect_wallet">Launch Campaign</div>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </header>
</template>

<style scoped>
header {
    position: fixed;
    height: 60px;
    left: 0%;
    top: 0%;
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .15);
    width: 100%;
    z-index: 10;
}

.container {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.logo img {
    height: 40px;
}

.actions {
    display: flex;
    align-items: center;
    gap: 30px;
}

.actions .links {
    display: flex;
    align-items: center;
    gap: 30px;
}

.links a {
    font-size: 16px;
    font-weight: 500;
    color: var(--textdimmed);
}

.actions .auth {
    display: flex;
    align-items: center;
    border-left: 1px rgba(0, 0, 0, 0.2) solid;
}

.helpdesk {
    height: 40px;
    border-radius: 4px;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: var(--textdimmed);
}

.connect_wallet {
    height: 40px;
    border-radius: 20px;
    width: 180px;
    background: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
}



@media screen and (max-width: 1200px) {
    .links {
        position: fixed;
        width: 100%;
        height: calc(100% - 70px);
        z-index: 5;
        top: -100vh;
        left: 0;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 80px 0;
        background: rgba(6, 11, 26, 0.95);
    }

    .links>a {
        font-size: 16px;
        background: rgba(6, 11, 26, 0.4);
        width: 100%;
        text-align: center;
        padding: 26px;
        border-image-source: linear-gradient(to left, transparent, rgba(44, 55, 89, 1), transparent);
        border-left: 0;
        border-right: 0;
        border-top: 1px solid;
        border-bottom: 1px solid;
        border-image-slice: 1;
        color: #FFFFFF !important;
    }

    .handburger {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        width: 40px;
        height: 40px;
    }

    .connect_wallet, .helpdesk {
        display: none;
    }

    #handburger {
        width: 24px;
        height: 14px;
        position: relative;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #handburger span {
        display: block;
        position: absolute;
        height: 2px;
        width: 24px;
        background: #FFFFFF;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
    }

    #handburger span:nth-child(1) {
        top: 0px;
    }

    #handburger span:nth-child(2),
    #handburger span:nth-child(3) {
        top: 6px;
    }

    #handburger span:nth-child(4) {
        top: 12px;
    }

    #handburger.open span:nth-child(1) {
        top: 10px;
        width: 0%;
        left: 50%;
    }

    #handburger.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    #handburger.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    #handburger.open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }

    .open-menu {
        top: 90px !important;
        transition: .2s;
    }



}
</style>