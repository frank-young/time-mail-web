<template>
  <div class="success">
    <x-header title="我的信件"></x-header>
    <div class="success-main">
      <div class="success-desc">
        <div class="success-desc_text">
          寄送成功，邮件将准时寄送到您的邮箱。
        </div>
        <div class="success-block_text">
          欢迎您成为时光邮件第一批用户❤️，我们都是造梦者，邀请您加入我们的社区👇，<br>
           关注公众号：<b>时光邮件</b>
        </div>
        <button class="success-desc_btn" @click="goFind">
          去看看大家的梦想
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
  data () {
    return {
    }
  },
  components: {
    XHeader
  },
  created () {
  },
  methods: {
    goFind () {
      this.$router.push({name: 'Find'})
    }
  }
}
</script>

<style scoped lang="less">
.success {
  min-height: 100vh;
  &-main {
    position: fixed;
    top: 47px;
    width: 100%;
    height: calc(100vh - 47px);
    background-color: #f8f8f8;
  }
  &-desc {
    padding: 100px 20px;
    text-align: center;
  }
  &-desc_text,
  &-block_text {
    line-height: 1.7em;
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  &-block_text {
    padding: 20px;
    background-color: #fff;
  }
  &-desc_btn {
    padding: 10px 30px;
    margin-top: 30px;
    border: 1px solid #0D45E4;
    background-color: #fff;
    border-radius: 4px;
    color: #0D45E4;
    outline: none;
  }

}
</style>
