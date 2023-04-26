import Converter from '../scripts/Converter'
import Approval from '../scripts/Approval'
import Countdown from '../scripts/Countdown'
export default {
    // eslint-disable-next-line no-unused-vars
    install: (app, options) => {
        app.config.globalProperties.$toMoney = (value, max) => {
            return Converter.toMoney(value, max);
        },
        app.config.globalProperties.$nFormat = (value, digits = 2) => {
            return Converter.nFormatter(value, digits)
        },
        app.config.globalProperties.$fromWei = (value) => {
            return Converter.fromWei(value)
        },
        app.config.globalProperties.$toWei = (value) => {
            return Converter.toWei(value)
        },
        app.config.globalProperties.$toDate = (timestamp) => {
            return Countdown.toDate(timestamp)
        },
        app.config.globalProperties.$approve = async (tokenAddress, spender) => {
            return await Approval.approve('1000000000000000000000000000', tokenAddress, spender)
        },
        app.config.globalProperties.$allowanceOf = async (userAddress, tokenAddress, spender) => {
            return await Approval.getAllocationOf(userAddress, tokenAddress, spender)
        }
    }
  }