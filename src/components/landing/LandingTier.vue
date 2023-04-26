<template>
    <section id="pricing">
        <div class="page_width">
            <div class="tier">
                <div class="title">
                    <p>Plans to get you started fast</p>
                    <h3>Reduce cost of advertising</h3>
                    <div class="tabs">
                        <div class="tab tab_active">Monthly</div>
                        <div class="tab">Quarterly</div>
                        <div class="tab">Annually</div>
                    </div>
                </div>

                <div class="plans">
                    <div class="plan">
                        <p class="plan_name">Classic</p>
                        <p class="plan_price">0.1 TRP</p>
                        <p class="plan_duration">per ads</p>

                        <div class="gets">
                            <div class="get">
                                <div></div>
                                <p>Unlimited API Calls</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>5 rq/s</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Community Support</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Web Ads Only</p>
                            </div>
                        </div>

                        <div class="action">Get Started</div>
                    </div>
                    <div class="plan">
                        <p class="plan_name">Gold</p>
                        <p class="plan_price">0.25 TRP</p>
                        <p class="plan_duration">per ads</p>

                        <div class="gets">
                            <div class="get">
                                <div></div>
                                <p>Unlimited API Calls</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>5 rq/s</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Community Support</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Web and Mobile Ads</p>
                            </div>
                        </div>

                        <div class="action">Get Started</div>
                    </div>
                    <div class="plan">
                        <div class="tag">Recommended</div>

                        <p class="plan_name">Professional</p>
                        <p class="plan_price">0.41 TRP</p>
                        <p class="plan_duration">per ads</p>

                        <div class="gets">
                            <div class="get">
                                <div></div>
                                <p>Unlimited API Calls</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>5 rq/s</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Community Support</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>All Ads Format</p>
                            </div>
                        </div>

                        <div class="action">Get Started</div>
                    </div>
                    <div class="plan">
                        <p class="plan_name">Legend</p>
                        <p class="plan_price">1.29 TRP</p>
                        <p class="plan_duration">per ads</p>

                        <div class="gets">
                            <div class="get">
                                <div></div>
                                <p>Unlimited API Calls</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>5 rq/s</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>Community Support</p>
                            </div>
                            <div class="get">
                                <div></div>
                                <p>All Ads Format</p>
                            </div>
                        </div>

                        <div class="action">Get Started</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    min-height: 960px;
    display: flex;
    align-items: center;
    background: url('/images/hero_bg.svg');
    background-repeat: no-repeat;
    background-position: center center;
}

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
}

.title p:first-child {
    font-size: 16px;
    font-weight: 400;
}

.title h3 {
    font-size: 50px;
    font-weight: 400;
    margin-top: 20px;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
}

.tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    width: 400px;
    height: 60px;
    padding: 8px;
    margin-top: 16px;
    border-radius: 40px;
    background: #f5f5f5;
}

.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
}

.tab_active {
    background-color: #fff;
    box-shadow: 0 1px 4px 0 rgba(19, 17, 33, .08);
}

.plans {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 60px;
    gap: 20px;
}

.plan {
    width: 100%;
    max-width: 300px;
    padding: 40px 32px;
    border-style: solid;
    border-width: 1px;
    border-color: #e4e4e4;
    border-radius: 3px;
    background-color: #fff;
    text-align: center;
    position: relative;
}

.plan_name {
    font-size: 24px;
    font-weight: 400;
}

.plan_price {
    font-size: 32px;
    font-weight: 600;
    line-height: 32px;
    margin-top: 20px;
}

.plan_duration {
    font-size: 18px;
    font-weight: 400;
    margin-top: 4px;
}

.gets {
    margin-top: 20px;
}

.get {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    gap: 6px;
}

.get div {
    width: 6px;
    height: 2px;
    background: rgba(24, 21, 70);
}

.plan .action {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 1px solid rgba(24, 21, 70);
    margin-top: 30px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(24, 21, 70);
}

.plan .tag {
    height: 24px;
    padding: 0 20px;
    background: var(--primary);
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 20px;
    left: 50%;
    transform: translate(-50%, 0);
}

.plan:nth-child(3) .action {
    background: rgba(24, 21, 70);
    color: #fff;
    font-size: 14px;
}
</style>