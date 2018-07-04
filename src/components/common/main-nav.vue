<template>
  <div class="man-nav">
    <tabbar>
      <tabbar-item :selected="selectTag === 'write' ? true : false" :link="{name: 'Write'}">
        <i slot="icon" class="icon icon-write"></i>
        <i slot="icon-active" class="icon icon-write-hover"></i>
        <span class="tab-label" slot="label">写信</span>
      </tabbar-item>
      <tabbar-item :selected="selectTag === 'find' ? true : false" :link="{name: 'Find'}">
        <i slot="icon" class="icon icon-find"></i>
        <i slot="icon-active" class="icon icon-find-hover"></i>
        <span class="tab-label" slot="label">发现</span>
      </tabbar-item>
      <tabbar-item :selected="selectTag === 'user' ? true : false" link="/user">
        <i slot="icon" class="icon icon-user"></i>
        <i slot="icon-active" class="icon icon-user-hover"></i>
        <span class="tab-label" slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  props: {
    selectTag: {
      type: String,
      default: 'write'
    }
  },
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

<style media="screen">
  .weui-tabbar__label {
    margin: 0 !important;
  }
</style>
<style scoped lang="less">
@primary-color: #0D45E4;
.man-nav {
  .weui-tabbar {
    position: fixed;
    z-index: 40;
    background-color: #fff;
  }
  a {
    text-decoration: none;
  }
  .weui-bar__item_on .weui-tabbar__label {
    color: #0D45E4 !important;
    margin: 0 !important;
  }
  .icon {
    display: block;
    width: 25px;
    height: 25px;
    margin: 0 auto 10px auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 23px auto;
  }
  .icon-write {
    background-image: url(./img/write.png);
  }
  .icon-find {
    background-image: url(./img/find.png);
  }
  .icon-user {
    background-image: url(./img/user.png);
  }
  .icon-write-hover {
    background-image: url(./img/write-hover.png);
  }
  .icon-find-hover {
    background-image: url(./img/find-hover.png);
  }
  .icon-user-hover {
    background-image: url(./img/user-hover.png);
  }
  .weui-bar__item_on {
    .tab-label {
      color: @primary-color;
    }
  }
  .tab-label {
    color: #929292;
  }
}
</style>
