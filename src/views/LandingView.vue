<template>
    <main>
        <LandingHeader />
        <LandingHero />
        <LandingFeatures />
        <LandingShowcase />
        <LandingSDK />
        <LandingTier />
        <LandingFAQ />
        <LandingFooter />
    </main>
</template>
  
<script setup>
import LandingFeatures from '../components/landing/LandingFeatures.vue';
import LandingHeader from '../components/landing/LandingHeader.vue'
import LandingHero from '../components/landing/LandingHero.vue';
import LandingShowcase from '../components/landing/LandingShowcase.vue';
import LandingSDK from '../components/landing/LandingSDK.vue';
import LandingTier from '../components/landing/LandingTier.vue';
import LandingFAQ from '../components/landing/LandingFAQ.vue';
import LandingFooter from '../components/landing/LandingFooter.vue';
</script>