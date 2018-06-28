<template>
  <div class="container">
    <div class="tips">
      {{ configText.tips }}
    </div>
    <div class="letter-wrap">
      <div class="form-group">
        <input class="title" :placeholder="configText.titlePlaceholder" type="text" v-model="letter.title">
      </div>
      <div class="form-group">
        <textarea :maxlength="-1" v-model="letter.content" :placeholder="configText.letterPlaceholder" class="content"></textarea>
      </div>
      <div class="form-group">
        <div class="select-title">到达时间</div>
        <div class="select-content">
          <div class="select-left" v-if="isShowDefaultYear">
            <label class="select-label">
              <input class="select-radio" v-model="arriveYear" type="radio" name="arrive" :value="1" checked>
              <div class="select-radio-tips" :class="{active: arriveYear === 1}">1年</div>
            </label>
            <label class="select-label">
              <input class="select-radio" v-model="arriveYear" type="radio" name="arrive" :value="3">
              <div class="select-radio-tips" :class="{active: arriveYear === 3}">3年</div>
            </label>
            <label class="select-label">
              <input class="select-radio" v-model="arriveYear" type="radio" name="arrive" :value="5">
              <div class="select-radio-tips" :class="{active: arriveYear === 5}">5年</div>
            </label>
          </div>
          <div class="select-left" v-else>
            <datetime
              class="select-date-show"
              :start-date="startDate"
              :end-date="endDate"
              @on-change="arriveDateChange"
              year-row="{value}年"
              month-row="{value}月"
              day-row="{value}日">
              {{ letter.arrive_time }}
            </datetime>
          </div>
          <div class="select-right" v-if="isShowDefaultYear">
            <datetime
              class="select-radio-tips"
              :start-date="startDate"
              :end-date="endDate"
              @on-change="arriveDateChange"
              year-row="{value}年"
              month-row="{value}月"
              day-row="{value}日">
              自定义
            </datetime>
          </div>
          <div class="select-right" v-else>
            <div class="select-radio-tips" @click="cancelCustomerSelect">
              取消
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="select-title">信件到达后，是否公开阅读</div>
        <div class="select-content">
          <div class="select-left">
            <label class="select-label">
              <input class="select-radio" v-model="letter.is_public" type="radio" name="public" :value="1" checked>
              <div class="select-radio-tips" :class="{'active': letter.is_public === 1}">公开</div>
            </label>
            <label class="select-label">
              <input class="select-radio" v-model="letter.is_public" type="radio" name="public" :value="0">
              <div class="select-radio-tips" :class="{'active': letter.is_public === 0}">不公开</div>
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <input class="title" type="text" placeholder-style="font-size: 14px;" placeholder="请输入邮箱,信件将会发送到邮箱里" v-model="letter.email">
      </div>
      <div class="form-group">
        <input class="title" type="text" placeholder-style="font-size: 14px;" placeholder="请输入手机号，用于提醒信件（保密不外泄）" v-model="letter.phone">
      </div>
      <div class="form-froup">
        <button @click="submit" :disabled="isDisabled" :loading="isSending" class="send animate-background"> {{ sendText }} </button>
      </div>
    </div>
    <toast :toast-msg.sync="toastMsg" :is-show.sync="isShow"></toast>
    <main-nav></main-nav>
  </div>
</template>

<script>
import miment from 'miment'
import API from '@/api'
import Validator from 'validator.tool'
import Toast from '@/components/common/toast'
import { Datetime } from 'vux'
import MainNav from '@/components/common/main-nav'

export default {
  data () {
    return {
      userInfo: {},
      letter: {
        title: '一封来自' + miment().format('YYYY年MM月DD日') + '的信件',
        content: '未来的自己，',
        is_public: 1,
        email: '',
        phone: '',
        arrive_time: miment().add(1, 'YYYY').format('YYYY-MM-DD')
      },
      // 默认配置文字
      configText: {
        tips: '把梦想寄给未来',
        titlePlaceholder: '标题',
        letterPlaceholder: '',
        share_message: '给10年后的自己写一封信如何？'
      },
      sendText: '寄送到未来',
      // 时间选择
      arriveYear: 1,
      isShowDefaultYear: true,
      startDate: miment().add(1, 'MM').format('YYYY-MM-DD'),
      endDate: miment().add(20, 'YYYY').format('YYYY-MM-DD'),
      // 提交过程
      isSending: false,
      isDisabled: false,
      // toast
      isShow: false,
      toastMsg: ''
    }
  },
  components: {
    Toast,
    Datetime,
    MainNav
  },
  watch: {
    arriveYear (to) {
      this.letter.arrive_time = miment().add(~~to, 'YYYY').format('YYYY-MM-DD')
    }
  },
  computed: {
  },
  created () {
    this.getPrompt()
  },
  mounted () {
    this.judeTheUserInfo()
  },
  methods: {
    async getPrompt () {
      try {
        const res = await API.getPrompt()
        if (res.data !== null) {
          this.configText = res.data.data
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 默认到达年份选择
    arriveYearChange (e) {
      this.arriveYear = Number(e.target.value)
      this.letter.arrive_time = miment().add(this.arriveYear, 'YYYY').format('YYYY-MM-DD')
    },
    // 自定义到达日期选择
    arriveDateChange (val) {
      this.isShowDefaultYear = false
      this.letter.arrive_time = val
    },
    // 取消自定义选择日期
    cancelCustomerSelect () {
      this.isShowDefaultYear = true
      this.letter.arrive_time = miment().add(1, 'YYYY').format('YYYY-MM-DD')
      this.arriveYear = 1
    },
    // 是否是公开邮件
    isPublicChange (e) {
      this.letter.is_public = Number(e.target.value)
    },
    // 提交
    async submit () {
      let res = this.validate(this.letter)
      if (!res.bool) {
        this.show(res.msg)
        return
      }

      this.letter.arrive_time = this.letter.arrive_time + miment().format(' hh:mm:ss')
      this.startSend()
      try {
        await API.sendLetter(this.letter)
        this.successSend()
      } catch (e) {
        console.log(e)
        this.failSend()
      }
    },
    // 验证
    validate (data) {
      let v = new Validator()
      let bool = false
      let msg = ''

      if (!v.required(data.title)) {
        msg = '标题不能为空'
      } else if (!v.maxLength(data.title, 100)) {
        msg = '标题长度过长'
      } else if (!v.required(data.content)) {
        msg = '内容不能为空'
      } else if (!v.minLength(data.content, 5)) {
        msg = '内容太短咯～'
      } else if (!v.isEmail(data.email)) {
        msg = '邮箱格式错误哟～'
      } else if (!v.isPhone(data.phone)) {
        msg = '手机格式错误哟～'
      } else {
        bool = true
      }
      return {
        bool,
        msg
      }
    },
    // 分离提交状态
    startSend () {
      this.isSending = true
      this.isDisabled = true
      this.sendText = '寄送中'
    },
    successSend () {
      this.isSending = false
      this.isDisabled = false
      this.letter = {
        title: '一封来自' + miment().format('YYYY年MM月DD日') + '的信件',
        content: '未来的自己，',
        is_public: 1,
        email: '',
        phone: '',
        arrive_time: miment().add(1, 'YYYY').format('YYYY-MM-DD')
      }
      this.sendText = '寄送到未来'
      this.$router.push({name: 'Success'})
    },
    failSend () {
      this.isSending = false
      this.isDisabled = false
      this.sendText = '寄送失败，重新寄送'
    },
    // ToastPlugin
    show (msg) {
      this.isShow = true
      this.toastMsg = msg
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    },
    judeTheUserInfo () {
      if (localStorage.hasOwnProperty('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.letter.content = `未来的${this.userInfo.nickname}，`
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  padding-bottom: 50px;
  .tips {
    padding: 15px 50px;
    line-height: 1.7em;
    text-align: center;
    color: #fff;
    background-color: #0D45E4;
    // background: linear-gradient(180deg, #0D45E4, #3D45E4);
    font-size: 20px;
    letter-spacing: 4px;
  }
  .letter-wrap {
    padding: 15px 20px 20px 20px;
  }
  .form-group {
    margin-bottom: 15px;
    font-size: 14px;
  }
  .title {
    display: block;
    width: 100%;
    padding: 7px;
    border: none;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    outline: none;
  }
  .content {
    border: 1px solid #ccc;
    width: 100%;
    height: 300px;
    padding: 8px;
    line-height: 1.7em;
    box-sizing: border-box;
    font-size: 14px;
    outline: none;
  }
  .select-title {
    color: #888;
  }
  .select-content {
    position: relative;
    height: 34px;
    padding: 10px 0;
    display: flex;
    font-size: 14px;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    a {
      text-decoration: none;
    }
  }
  .select-left {
      flex: 3;
      display: flex;
  }
  .select-right {
    position: relative;
    flex: 1;
  }
  .select-date-show {
    height: 34px;
    padding: 0 25px;
    line-height: 34px;
    border-radius: 34px;
    border: 1px solid #EBEBEC;
    // color: #7A7881;
    background-color: #7A7881;
    color: #fff;
  }
  .select-label {
    position: relative;
    display: block;
    flex: 1;
    .active {
      transition: all .3s;
      background-color: #7A7881;
      border-color: #7A7881;
      color: #fff;
    }
  }

  .select-radio {
    opacity: 0;
  }
  .select-radio-tips {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 34px;
    line-height: 34px;
    border-radius: 34px;
    border: 1px solid #EBEBEC;
    color: #7A7881;
    font-size: 12px;
    text-align: center;
  }
  .send {
    width: 100%;
    height: 45px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 2px;
    background-color: #0D45E4;
    border-color: transparent;
    border-radius: 45px;
    color: #fff;
    outline: none;
    &[disabled] {
        opacity: .5;
    }
    &:active {
      opacity: .8;
    }
    &:after {
      background-color: #092f9c;
      display: none;
    }
  }
  .fixed-froup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
}
.animate-background {
  background: linear-gradient(241deg, #FF8C47, #0D45E4, #22E099, #FF5D36);
  background-size: 800%, 800%;
  animation: rainbow 8s ease infinite;
}
@keyframes rainbow {
  0%{
    background-position:0% 80%;
  }
  50%{
    background-position:100% 20%;
  }
  100%{
    background-position:0% 80%;
  }
}
</style>
