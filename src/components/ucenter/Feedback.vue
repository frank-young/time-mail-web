<template>
  <div class="feedback">
    <x-header title="吐槽反馈"></x-header>
    <iframe class="feedback-iframe" :src="url"></iframe>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { feedbackUrl } from './config'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      feedbackUrl
    }
  },
  computed: {
    url () {
      return feedbackUrl + this.$route.query.productId
    }
  }
}
</script>

<style scoped lang="less">
.feedback {
  &-iframe {
    width: 100vw;
    height: calc(100vh - 46px);
    border: none;
  }
}
</style>
