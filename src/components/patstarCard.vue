<template>
  <div class="patstar-card">
    <div class="pat-wrap pr">
      <span class="pat-avatar">
        <image :src="data.patAvatar" />
      </span>
      <span class="pat-name text-overflow">{{ data.patName }}</span>
    </div>
    <div class="host-wrap">
      <span class="host-avatar">
        <image :src="data.hostAvatar" mode="scaleToFill" />
      </span>
      <span class="host-name text-overflow">{{ data.hostName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatstarCard',
  props: {
    data: Object
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.patstar-card {
  width: 220rpx;
  height: 300rpx;
  position: relative;

  .pat-wrap {
    width: 220rpx;
    height: 220rpx;
    overflow: hidden;
    border-radius: 10rpx;
    .pat-avatar {
      width: 100%;
      height: 100%;
      display: inline-block;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .pat-name {
      width: 100%;
      font-size: 28rpx;
      text-indent: 14rpx;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 48rpx;
      line-height: 48rpx;
      color: $--color-white;
      background-color: rgba(0,0,0,.2);
    }
  }

  .host-wrap {
    height: 80rpx;
    line-height: 80rpx;
    display: flex;
    align-items: center;

    .host-avatar {
      width: 44rpx;
      height: 44rpx;
      vertical-align: middle;
      border-radius: 50%;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
        display: inline;
      }
    }
    .host-name {
      width: calc(100% - 44rpx);
      font-size: 24rpx;
      color: $--color-font-host;
      margin-left: 8rpx;
    }
  }
}
</style>
