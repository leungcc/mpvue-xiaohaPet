<template>
  <div class="index-module" :class="[customClass]">
    <div class="index-module-hd">
      <span class="hd-txt">{{ title }}</span>
      <span class="btn-more">更多></span>
    </div>
    <div class="index-module-bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexModule',
  props: {
    title: String,
    customClass: String,
    moreCb: Function,
    data: Array|Object 
  },
  data() {

  }
}
</script>

<style lang="scss" scoped>
.index-module {
  width: 100%;
  .index-module-hd {
    padding: 0 20rpx;
    height: 120rpx;
    line-height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hd-txt {
      font-size: 36rpx;
      color: $--color-font-black;
    }

    .btn-more {
      padding: 0 30rpx;
      height: 50rpx;
      line-height: 50rpx;
      background-color: $--color-theme;
      font-size: 24rpx;
      color: #fff;
      border-radius: 25rpx;
    }
  }
}
</style>
