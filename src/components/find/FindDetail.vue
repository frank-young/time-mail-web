<template>
  <div class="detail">
    <x-header title="信件详情"></x-header>
    <div class="detail-main">
      <div class="detail-box">
        <div class="detail-title">
          {{ letter.title }}
        </div>
        <div class="detail-auth">
          <div class="detail-auth-avatar">
            <img class="detail-image" :src="letter.wxuser.data.avatar">
          </div>
          <div class="detail-auth-name">
            <div class="">
              {{ letter.wxuser.data.nickname }}
            </div>
            <div class="detail-auth-meta">
              写于{{ letter.create_date }},{{ letter.meta }}
            </div>
          </div>
        </div>
        <div class="detail-content">
          <div class="detail-desc">
            {{ letter.content }}
          </div>
          <div class="detail-meta">
            <div class="detail-like">
              <like-btn @click="toggleLike" :is-like="!!letter.is_like" :count="letter.like_count"></like-btn>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <div class="detail-comment">
          <div class="comment-title">
            {{ letter.comment_count }} 人评论
          </div>
          <div class="comment-ul"  v-if="comments.length">
            <div class="comment-li" v-for="comment in comments" :key="comment.id">
              <div class="comment-box">
                <div class="comment-avatar">
                  <img class="comment-image" :src="comment.wxuser && comment.wxuser.data.avatar">
                </div>
                <div class="comment-desc">
                  <div class="comment-name">
                    {{ comment.wxuser && comment.wxuser.data.nickname }}
                  </div>
                  <div class="comment-datetime">
                    {{ comment.time.date }}
                  </div>
                  <div class="comment-content">
                    {{ comment.content }}
                  </div>
                </div>
                <!-- <div class="comment-meta">
                  {{ comment.comment_like_count }} 点赞
                </div> -->
              </div>
            </div>
          </div>
          <div class="comment-empty" v-else>
            暂无评论，赶紧留下评论支持他吧～
          </div>
        </div>
      </div>
    </div>
    <div class="comment-add">
      <input v-model="commentContent" placeholder="支持ta的梦想～" class="comment-input" type="text"/>
      <div class="comment-btn" @click="addComment">发送</div>
    </div>
    <toast :toast-msg.sync="toastMsg" :is-show.sync="isShow"></toast>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import API from '@/api'
import LikeBtn from '@/components/common/like-btn'
import Toast from '@/components/common/toast'

export default {
  components: {
    LikeBtn,
    Toast,
    XHeader
  },
  data () {
    return {
      letter: {
        is_like: false,
        like_count: 0,
        wxuser: {
          data: {
            avatar: ''
          }
        }
      },
      comments: [],
      commentContent: '',
      // toast
      isShow: false,
      toastMsg: ''
    }
  },
  computed: {
    letterId () {
      return this.$route.query.id
    }
  },
  created () {
    this.getLetter()
    this.getComments()
  },
  methods: {
    async getLetter () {
      try {
        const res = await API.getLetter({ id: this.letterId, include: 'wxuser' })
        const { status, data } = res.data
        if (status) this.letter = data.data
      } catch (e) {}
    },
    async getComments () {
      const res = await API.getComments({ letter_id: this.letterId, include: 'wxuser' })
      const { status, data } = res.data
      if (status) this.comments = data.data
    },
    toggleLike () {
      this.letter.is_like = !this.letter.is_like
      this.letter.is_like ? this.letter.like_count++ : this.letter.like_count--
      this.letter.is_like ? this.like() : this.dislike()
    },
    like () {
      API.like({letter_id: this.letterId})
    },
    dislike () {
      API.dislike({letter_id: this.letterId})
    },
    async addComment () {
      if (!this.commentContent) {
        this.show('评论不能为空')
        return
      }
      let res = await API.addComment({letter_id: this.letterId, content: this.commentContent})
      const { status, message } = res.data
      if (status) {
        this.letter.comment_count++
        this.getComments()
      }
      this.show(message)
    },
    show (msg) {
      this.isShow = true
      this.toastMsg = msg
      this.commentContent = ''
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    }
  }
}
</script>

<style lang="less">
.detail {
  min-height: 100vh;
  &-main {
    padding: 15px;
  }
  &-box {

  }
  &-title {
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }
  &-auth {
    width: 100%;
    display: flex;
    padding-bottom: 5px;
  }
  &-auth-avatar {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
    padding: 1px;
    border: 1px solid #eee;
  }
  &-image {
    width: 40px;
    height: 40px;
  }
  &-auth-name {
    flex: 1;
    font-size: 14px;
  }
  &-auth-meta {
    padding: 5px 0;
    color: #999;
    font-size: 12px;
  }
  &-content {
    padding-bottom: 10px;
    line-height: 1.7em;
    font-size: 14px;
    text-indent: 2em;
  }
  &-desc {
    font-size: 14px;
    padding: 5px 0;
  }
  &-meta {
    font-size: 12px;
    margin: 15px 0;
  }
  &-like {
    display: inline-block;
  }
  &-comment {
    padding-bottom: 50px;
  }
}

.comment {
  &-title {
    padding-top: 15px;
    font-size: 18px;
    color: #333;
  }
  &-empty {
    height: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  &-ul {

  }
  &-li {
  }
  &-box {
    position: relative;
    display: flex;
    padding: 15px 0 0 0;
  }
  &-avatar {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
  }
  &-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  &-desc {
    flex: 1;
    padding-left: 15px;
    border-bottom: 1px solid #eee;
  }
  &-name {
    color: #666;
    font-size: 12px;
  }
  &-datetime {
    color: #999;
    font-size: 10px;
  }
  &-content {
    padding: 10px 0;
    color: #333;
    font-size: 14px;
  }
  &-meta {
    position: absolute;
    right: 0;
    top: 15px;
    color: #888;
    font-size: 12px;
  }
  &-add {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    display: flex;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  &-input {
    flex: 1;
    border-bottom: 1px solid #eee;
    padding: 5px 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
  }
  &-btn {
    width: 50px;
    flex: 0 0 50px;
    line-height: 42px;
    font-size: 14px;
    color: #666;
    margin-left: 10px;
    text-align: center;
  }
}
.split {
  height: 10px;
  margin: 0 -15px;
  background-color: #eee;
}
</style>
