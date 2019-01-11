<!--
附近宠物页面的 petCard 
显示头像、宠物名、宠物简述、距离
-->
<template>
  <div class="nearby-petcard">
    <span class="avatar-wrap">
      <img :src="item.patAvatar" alt="">
    </span>
    <div class="main-wrap">
      <span class="petname-txt text-overflow">小喵喵</span>
      <span class="introduct-txt text-overflow">喜欢游泳、晒太阳，还有黏住小主人哦...</span>
    </div>
    <div class="distance-wrap">
      <span class="dw-top">
        <i class="sprite-icon icon-size-24 i-map"></i>
        <span style="display:flex;flex-dirction:row;align-items:baseline;">
          <span>4</span>
          <em class="fontsize20">km</em>
        </span>
      </span>
      <span class="dw-bottom">万科东荟城</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NearbyPetcard',
  props: {
    item: Object  //就是宠物表单条记录对象
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.nearby-petcard {
  height: 140rpx;
  width: 100%;
  padding: 10rpx;
  display: flex;
  font-size: 24rpx;
  .avatar-wrap {
    margin-top: 20rpx;
    width: 80rpx;
    height: 80rpx;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .main-wrap {
    width: 66%;
    padding: 10rpx;
    margin-left: 20rpx;
    overflow: hidden;
    > span {
      display: block;
      width: 100%;
      height: 40rpx;
      line-height: 40rpx;
    }
    .introduct-txt {
      color: $--color-font-label;
    }
  }
  .distance-wrap {
    width: 140rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content:space-around;

    color: #999;

    .dw-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 50rpx;
      line-height: 50rpx;
    }
    .dw-bottom {
      font-size: 20rpx;
    }
  }
}
</style>
