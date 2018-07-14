<template>
  <div class="letter">
    <x-header title="我的信件"></x-header>
    <div class="letter-main">
      <pull-to :top-load-method="pullToRefresh" @infinite-scroll="loadMore">
        <div class="letter-ul" v-if="letters.length">
          <div v-for="item in letters" :key="item.id">
            <find-item :data="item"></find-item>
          </div>
        </div>
        <div class="letter-empty" v-else>
          <div class="letter-empty_text">
            暂时还没有信件~
          </div>
          <button class="letter-empty_btn" @click="goHome">
            赶紧去写一封
          </button>
        </div>
        <load-more v-if="letters.length" :tip="isLastPage ? '暂无更多数据' : '正在加载'" :show-loading="!isLastPage"></load-more>
      </pull-to>
    </div>
  </div>
</template>

<script>
import { LoadMore, XHeader } from 'vux'
import { mapState, mapActions } from 'vuex'
import FindItem from '@/components/common/FindItem'
import PullTo from 'vue-pull-to'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('myLetter', {
      letters: state => state.list,
      page: state => state.page,
      isLastPage: state => state.isLastPage
    })
  },
  components: {
    PullTo,
    LoadMore,
    FindItem,
    XHeader
  },
  created () {
    this.getPublicLetters()
  },
  methods: {
    ...mapActions('myLetter', [
      'getLetters'
    ]),
    pullToRefresh (loaded) {
      this.getPublicLetters('refresh', loaded)
    },
    loadMore () {
      this.getPublicLetters('loadmore')
    },
    async getPublicLetters (type = 'cache', cb) {
      try {
        await this.getLetters(type)
        if (typeof cb === 'function') cb()
      } finally {}
    },
    goHome () {
      this.$router.push({name: 'Write'})
    }
  }
}
</script>

<style scoped lang="less">
.letter {
  min-height: 100vh;
  .tips {
    position: relative;
    z-index: 10;
    padding: 15px 50px;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    font-size: 20px;
    letter-spacing: 8px;
  }
  &-main {
    position: fixed;
    top: 47px;
    width: 100%;
    height: calc(100vh - 47px);
    background-color: #f8f8f8;
  }
  &-empty {
    padding: 100px 20px;
    text-align: center;
  }
  &-empty_text {
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  &-empty_btn {
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

<style lang="less">
  .default-text {
    margin: 0 !important;
    font-size: 12px;
    color: #999;
  }
  .weui-loadmore_line .weui-loadmore__tips {
    top: 0 !important;
  }
  .weui-loadmore_line {
    &:before,
    &:after {
      top: 10px !important;
    }
  }
  .weui-loadmore__tips {
    color: #999;
  }
  .weui-loadmore {
    margin: 15px auto !important;
    font-size: 12px !important;
  }
</style>
