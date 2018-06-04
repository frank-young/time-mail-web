<template>
  <div class="toast" v-if="isShow">
    <div class="toast-content">
      {{ toastMsg }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toastMsg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    show () {
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 2000)
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 10;
  height: 45px;
  line-height: 45px;
  padding: 0 30px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 14px;
}
.toast-content {

}
</style>
