import { createRouter, createWebHistory } from 'vue-router'

import LandingView from '../views/LandingView.vue'
import AppView from '../views/AppView.vue'

import ValidatorPage from '../components/app/validator/ValidatorPage.vue'
import ValidatorJoinNode from '../components/app/validator/ValidatorJoinNode.vue'
import AdvertiserJoinNode from '../components/app/advertiser/AdvertiserJoinNode.vue'
import AdvertiserPage from '../components/app/advertiser/AdvertiserPage.vue'
import EntryOptions from '../components/app/EntryOptions.vue'
import CreateCampaign from '../components/app/advertiser/CreateCampaign.vue'
import PublisherJoinNode from '../components/app/publisher/PublisherJoinNode.vue'
import PublisherPage from '../components/app/publisher/PublisherPage.vue'
import MonetizeCreation from '../components/app/publisher/MonetizeCreation.vue'
import PublishCampaign from '../components/app/publisher/PublishCampaign.vue'
import CampaignDetail from '../components/app/advertiser/CampaignDetail.vue'
import FaucetPage from '../components/app/FaucetPage.vue'
import AdSimulator from '../components/app/AdSimulator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/app',
      name: 'app',
      component: AppView,
      children: [
        {
          path: '/app',
          name: 'app',
          component: EntryOptions
        },
        {
          path: '/app/faucet',
          name: 'app-faucet',
          component: FaucetPage
        },
        {
          path: '/app/simulator',
          name: 'app-simulator',
          component: AdSimulator
        },
        {
          path: '/app/validator',
          name: 'app-validator',
          component: ValidatorPage
        },
        {
          path: '/app/validator/join',
          name: 'app-validator-join',
          component: ValidatorJoinNode
        },
        {
          path: '/app/advertiser',
          name: 'app-advertiser',
          component: AdvertiserPage
        },
        {
          path: '/app/advertiser/join',
          name: 'app-advertiser-join',
          component: AdvertiserJoinNode
        },
        {
          path: '/app/advertiser/create',
          name: 'app-advertiser-create',
          component: CreateCampaign
        },
        {
          path: '/app/advertiser/ads/:id',
          name: 'app-advertiser-ads-ad',
          component: CampaignDetail
        },
        {
          path: '/app/publisher/join',
          name: 'app-publisher-join',
          component: PublisherJoinNode
        },
        {
          path: '/app/publisher',
          name: 'app-publisher',
          component: PublisherPage
        },
        {
          path: '/app/publisher/apps/:id',
          name: 'app-publisher-apps',
          component: MonetizeCreation
        },
        {
          path: '/app/publisher/create',
          name: 'app-publisher-create',
          component: PublishCampaign
        }
      ]
    }
  ]
})

export default router
