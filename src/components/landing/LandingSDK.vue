<template>
    <section id="sdk">
        <div class="page_width">
            <div class="sdk">
                <div class="editor">
                    <img src="/images/code.png" alt="">
                </div>

                <div class="text">
                    <h3>Developer-friendly, open-source SDK</h3>
                    <p>Turple development kits a set of tools that provide developers with the ability to integrate Turple ads into their dApp.</p>
                    <br> <br>
                    <a href="" target="_blank">
                        <PrimaryButton :text="'Read the docs'" :width="'200px'" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../PrimaryButton.vue'
</script>

<style scoped>
.sdk {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 60px;
    padding: 100px 0;
}

.editor {
    height: 520px;
    width: 700px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px #e4e4e4 solid;
}

.editor img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text {
    width: 400px;
}

.text h3 {
    font-size: 35px;
    font-weight: 400;
    text-shadow: 0 0 50px rgba(24, 21, 70, 0.4), 0 0 26px rgba(4, 24, 61, 0.4);
    color: var(--textdimmed);
}

.text p {
    margin-top: 40px;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
    color: var(--textdimmed);
}
</style>