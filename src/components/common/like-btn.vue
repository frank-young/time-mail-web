<template>
  <div class="like-group" @click="toggleLike" :class="{'like-animation': isLike}">
    <div class="like-icon">
      <img class="like-image" src="./img/like.png">
    </div>
    <div class="like-btn">
      喜欢
    </div>
    <div class="like-count">
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLike: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 1
    }
  },
  methods: {
    toggleLike () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes likechange {
    0% {
      left: 0;
    }
    100% {
      left: -950px;
    }
}

.like {
  &-group {
    position: relative;
    padding: 13px 25px 13px 10px;
    border: 1px solid #EA6F5A;
    border-radius: 40px;
    color: #EA6F5A;
    font-size: 16px;
  }
  &-animation {
    background-color: #EA6F5A;
    transition: all .3s;
    .like-image {
      animation: likechange 0.6s 1 steps(19);
      left: -950px;
    }
    .like-btn {
      color: #fff;
      border-right-color: #fff;
    }
    .like-count {
      color: #fff;
    }
  }
  &-icon {
    position: absolute;
    left: 8px;
    top: 0;
    width: 50px;
    height: 50px;
    overflow: hidden;
  }
  &-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 1000px;
    height: 50px;
  }
  &-btn {
    display: inline-block;
    padding-right: 5px;
    border-right: 1px solid #EA6F5A;
  }
  &-count {
    display: inline-block;
    min-width: 20px;
    text-align: center;
  }
}
</style>
