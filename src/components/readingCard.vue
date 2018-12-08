<!-- 文章卡片 -->
<template>
  <div class="reading-card">
    <image class="bg-img" :src="data.imgpath" mode="scaleToFill"/>
    <span class="read-title">{{ data.title }}</span>
    <span class="column-txt">{{ data.column }}></span>
  </div>
</template>

<script>
export default {
  name: 'ReadingCard',
  props: {
    data: Object
  },
  created() {

  },
  data() {
    return {
      ss__columnTxt: '',
      ss__title: '',
      ss__imgpath: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.reading-card {
  position: relative;
  width: 100%;
  height: 180rpx;
  overflow: hidden;
  background-color: #f1f1f1;
  image {
    width: 100%;
    height: 100%;
  }
  .read-title {
    position: absolute;
    left: 25rpx;
    bottom: 25rpx;
    color: $--color-white;
  }
  .column-txt {
    color: $--color-white;
    position: absolute;
    right: 23rpx;
    top: 32rpx;
    font-size: 24rpx;
  }
}
</style>
