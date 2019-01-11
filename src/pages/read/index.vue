<template>
  <div class="p-read lrpadding20">
    <p class="textarea-title">宠友圈消息发布：</p>
    <textarea
      :value="textareaVal"
      class="textarea-publish"
    ></textarea>
    <div class="textarea-btn-wrap">
      <vant-button type="primary" size="small">发布</vant-button>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log('Page read created...');
  },
  data() {
    return {
      textareaVal: ''   //textarea的值
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.textarea-title {
  color: $--color-font-label;
}
.textarea-publish {
  border: 1px solid $--color-border-gray;
  width: 100%;
  border-radius: 4px;
}
.textarea-btn-wrap {
  margin-top: 10rpx;
}
</style>
