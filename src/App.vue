<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      url: window.location.href
    }
  },
  created () {
    this.getPrompt()
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth === fromDepth) {
        this.transitionName = 'page'
      } else if (toDepth < fromDepth) {
        this.transitionName = 'page-out'
      } else {
        this.transitionName = 'page-in'
      }
    }
  },
  methods: {
    ...mapActions('prompt', [
      'getPrompt'
    ])
  }
}
</script>

<style lang="less">
@import "~@/assets/theme/vux.less";

/*
 *  过渡效果
 */
// 页面切换过渡 in
.page-in-enter-active,
.page-in-leave-active {
  transition: all .4s;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  perspective: 1000;
}
.page-in-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.page-in-leave-to {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
// 页面切换过渡 out
.page-out-enter-active,
.page-out-leave-active {
  transition: all .4s;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  perspective: 1000;
}

.page-out-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}

.page-out-leave-to {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
  padding: 0;
  margin: 0 !important;
}
</style>
