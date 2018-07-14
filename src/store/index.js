import Vue from 'vue'
import Vuex from 'vuex'
import letter from './modules/letter'
import myLetter from './modules/my-letter'
import prompt from './modules/prompt'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    letter,
    prompt,
    userInfo,
    myLetter
  }
})
