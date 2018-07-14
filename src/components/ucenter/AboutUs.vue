<template>
  <div class="feedback">
    <x-header title="关于我们"></x-header>
    <iframe class="feedback-iframe" :src="url"></iframe>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { aboutusUrl } from './config'
export default {
  components: {
    XHeader
  },
  data () {
    return {
      aboutusUrl
    }
  },
  computed: {
    url () {
      return aboutusUrl + this.$route.query.productId + ''
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
