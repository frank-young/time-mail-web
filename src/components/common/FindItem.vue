<template>
  <div class="letter-li">
    <div class="letter-box" @click="toDetail(data.id)">
      <div class="letter-avatar">
        <img class="letter-image" :src="data.wxuser.data.avatar">
      </div>
      <div class="letter-content">
        <div class="letter-title">
          {{ data.meta }}
        </div>
        <div class="letter-desc">
          {{ data.description }}
        </div>
        <div class="letter-meta">
          <div class="letter-meta-left">
              写于{{ data.create_date }}
          </div>
          <div class="letter-meta-right">
            <img class="letter-meta-right-icon" src="./img/heart.png">
            <div class="letter-meta-right-text">
              {{ data.like_count }} 人喜欢
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    // 跳转详情
    toDetail (id) {
      this.$router.push({name: 'FindDetail', query: { id }})
    }
  }
}
</script>

<style lang="less" scoped>
.letter {
  &-li {
    padding: 15px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
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
