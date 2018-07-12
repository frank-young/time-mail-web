<template>
  <div class="ucenter">
    <div class="ucenter-box">
      <div class="ucenter-header">
        <div class="ucenter-avatar">
          <img class="ucenter-image" :src="userInfo.avatar || ''"/>
        </div>
        <div class="ucenter-name">
          {{ userInfo.nickname }}
        </div>
      </div>
      <div class="ucenter-ul">
        <div class="ucenter-li"  @click="toMyLetter">
          <div class="ucenter-icon">
            <img class="ucenter-icon-image" src="./img/letter.png"/>
          </div>
          <div class="ucenter-text">
            我的信件
          </div>
        </div>
        <div class="ucenter-li" @click="toFeedback">
          <div class="ucenter-icon">
            <img class="ucenter-icon-image" src="./img/roast.png"/>
          </div>
          <div class="ucenter-text">
            意见反馈
          </div>
        </div>
      </div>
    </div>
    <main-nav select-tag="ucenter"></main-nav>
  </div>
</template>

<script>
import MainNav from '@/components/common/main-nav'
import { mapState } from 'vuex'
export default {
  components: {
    MainNav
  },
  data () {
    return {
    }
  },
  created () {

  },
  computed: {
    ...mapState('userInfo', {
      userInfo: state => state.info.userInfo
    })
  },
  methods: {
    toMyLetter () {

    },
    toFeedback () {
      const productId = 28278
      this.$router.push({name: 'Feedback', query: { productId }})
    }
  }
}
</script>

<style lang="less">
.ucenter {
  height: 100vh;
  &-box {
  }
  &-header {
    padding: 20px;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
  }
  &-avatar {
    width: 75px;
    height: 75px;
    margin: 0 auto 15px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  &-name {
    font-size: 14px;
    text-align: center;
  }
  &-ul {
    padding: 0 15px;
  }
  &-li {
    position: relative;
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    &::after {
      position: absolute;
      top: 22px;
      right: 10px;
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      transform: rotate(45deg);
    }
  }
  &-icon {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    margin-right: 20px;
    overflow: hidden;
  }
  &-icon-image {
    width: 100%;
    height: 100%;
  }
  &-text {
    flex: 1;
  }
}
</style>
