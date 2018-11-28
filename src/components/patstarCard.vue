<template>
  <div class="patstar-card">
    <div class="pat-wrap">
      <span class="pat-avatar pr">
        <image :src="data.patAvatar" />
      </span>
      <span class="pat-name">{{ data.patName }}</span>
    </div>
    <div class="host-wrap">
      <i class="host-avatar">
        <image :src="data.hostAvatar" mode="scaleToFill" />
      </i>
      <span class="host-name">{{ data.hostName }}</span>
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
    .pat-avatar {
      width: 220rpx;
      height: 220rpx;
      display: inline-block;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .pat-name {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 48rpx;
      line-height: 48rpx;
      background-color: rgba(0,0,0,.2);
    }
  }

  .host-wrap {
    .host-avatar {
      width: 44rpx;
      height: 44rpx;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
