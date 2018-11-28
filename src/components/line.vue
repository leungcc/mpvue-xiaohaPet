<template>
  <div class="line" :style="{'border-color': color, 'width': width}"></div>
</template>

<script>
export default {
  name: 'Line',
  props: {
    height: String,
    width: {
      default: '100%',
      type: String
    },
    color: {
      default: '#ddd',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1rpx;
  border-bottom: 1px solid #ccc;
  margin: 0 auto;
}
</style>
