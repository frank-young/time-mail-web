<template>
  <div class="letter">
    <div class="tips">
      {{ configText.text1 }}
    </div>
    <div class="letter-main">
      <div class="letter-empty" v-if="letters.length === 0">
        <img class="letter-empty-icon" src="./img/empty-letter.png">
      </div>
      <div class="letter-ul" v-else>
        <div class="letter-li" v-for="letter in letters" :key="letter.id">
          <div class="letter-box" @click="toDetail(letter.id)">
            <div class="letter-avatar">
              <img class="letter-image" :src="letter.wxuser.data.avatar">
            </div>
            <div class="letter-content">
              <div class="letter-title">
                {{ letter.meta }}
              </div>
              <div class="letter-desc">
                {{ letter.description }}
              </div>
              <div class="letter-meta">
                <div class="letter-meta-left">
                    写于{{ letter.create_date }}
                </div>
                <div class="letter-meta-right">
                  <img class="letter-meta-right-icon" src="./img/heart.png">
                  <div class="letter-meta-right-text">
                    {{ letter.like_count }} 人喜欢
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <main-nav select-tag="find"></main-nav>
  </div>
</template>

<script>
import API from '@/api'
import MainNav from '@/components/common/main-nav'

export default {
  data () {
    return {
      letters: [],
      configText: {
        text1: ''
      },
      page: {
        page: 1,
        page_size: 15
      },
      loading: false
    }
  },
  components: {
    MainNav
  },
  created () {
    this.getPrompt()
    this.getPublicLetters()
  },
  methods: {
    async getPublicLetters () {
      try {
        const res = await API.getPublicLetters({include: 'wxuser', ...this.page})
        let { status, data } = res.data
        if (status) {
          this.letters = [...this.letters, ...data.data]
          this.page.page += 1
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 跳转详情
    toDetail (id) {
      this.$router.push({name: 'FindDetail', query: { id }})
    },
    async getPrompt () {
      try {
        const res = await API.getPrompt()
        if (res.data !== null) {
          this.configText = res.data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="less">
.letter {
  padding-bottom: 50px;
  .tips {
    padding: 15px 50px;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 20px;
    letter-spacing: 8px;
  }
  min-height: 100vh;
  /* background-color: #eceff1; */
  &-main {
  }
  &-li {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  &-box {
    display: flex;
  }
  &-avatar {
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    margin-right: 15px;
    padding: 1px;
  }
  &-image {
    width: 45px;
    height: 45px;
  }
  &-content {
    width: 100%;
  }
  &-title {
    font-size: 14px;
    color: #888;
  }
  &-desc {
    font-size: 14px;
    line-height: 1.5em;
    padding: 5px 0;
  }
  &-meta {
    display: flex;
    font-size: 12px;
  }
  &-meta-left {
    flex: 1;
    color: #999;
  }
  &-meta-right {
    flex: 1;
    text-align: right;
  }
  &-meta-right-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  &-meta-right-text {
    position: relative;
    top: -6px;
    display: inline-block;
    font-size: 12px;
    color: #888;
  }
  &-empty {
    width: 120px;
    height: 120px;
    margin: 100px auto;
    font-size: 14px;
    color: #888;
    text-align: center;
  }
  &-empty-icon {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }
}
</style>
