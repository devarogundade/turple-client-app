<template>
    <section>
        <div class="page_width">
            <div class="faq">
                <h3 class="title">Frequently Asked Questions</h3>

                <div class="items">
                    <div v-for="(faq, index) in faqs" :key="faq.question" :class="show == index ? 'show item' : 'item'">
                        <div class="question" v-on:click="openFaq(index)">
                            <p>{{ faq.question }}</p>
                            <div class="handle">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="answer">
                            <p>{{ faq.answer }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            show: -1,
            faqs: [{
                question: 'When can I buy Turple tokens?',
                answer: 'TBA.'
            },
            {
                question: 'Where can I buy Turple tokens?',
                answer: 'TBA.'
            }, {
                question: 'What is Turple?',
                answer: 'TBA.'
            }, {
                question: 'How do I become a validator?',
                answer: 'TBA.'
            }
            ]
        }
    },
    methods: {
        openFaq(index) {
            if (this.show == index) {
                this.show = -1
            } else {
                this.show = index
            }
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 50px;
    font-weight: 400;
    text-align: center;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.faq {
    padding: 100px 0;
}

.items {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    will-change: auto;
}

.item {
    width: 1000px;
    max-width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.question {
    height: 100px;
    width: 100%;
    display: grid;
    grid-template-columns: auto 30px;
    column-gap: 10px;
    align-items: center;
    padding: 0 40px;
    cursor: pointer;
}

.question p {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    transition: .4s;
}

.show .question p {
    color: var(--primary);
}

.answer {
    height: 0;
    transition: .4s;
    padding-left: 40px;
    padding-right: 40px;
    will-change: auto;
}

.show .answer {
    padding-bottom: 40px;
    height: fit-content !important;
}

.answer p {
    font-weight: 400;
    font-size: 20px;
    line-height: 40px;
    transition: .4s;
}

.handle {
    width: 24px;
    height: 24px;
    position: relative;
}

.handle div:first-child {
    position: absolute;
    background: var(--primary);
    width: 100%;
    height: 4px;
    border-radius: 2px;
    top: 10px;
    left: 0;
    transition: .4s;
}

.handle div:last-child {
    position: absolute;
    background: var(--primary);
    width: 4px;
    height: 100%;
    border-radius: 2px;
    top: 0;
    left: 10px;
    transition: .4s;
}

.show .handle div:last-child {
    transform: rotate(-90deg);
}

.show .handle div {
    background: #FFC752;
}

@media screen and (max-width: 700px) {
    .items {
        margin-top: 60px;
    }

    .question {
        padding: 0 20px;
        height: 90px;
    }

    .question p {
        font-size: 18px;
        line-height: 27px;
    }

    .answer p {
        font-size: 18px;
        line-height: 36px;
    }

    .answer {
        padding-left: 20px;
        padding-right: 20px;
    }

    .show .answer {
        padding-bottom: 20px;
    }
}


@media screen and (max-width: 700px) {
    .title {
        font-size: 30px;
    }

}
</style>