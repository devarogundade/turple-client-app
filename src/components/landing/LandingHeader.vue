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
                            <a href="" target="_blank">Docs</a>
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
</style>