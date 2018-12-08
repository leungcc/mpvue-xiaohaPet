<template>
  <div class="main-wrap">
      <vant-button @click="uploadImgBtnCb">上传图片</vant-button>
      <vant-button @click="getUserInfo">个人信息</vant-button>
      <vant-button @click="removeAllUser">删除所有user</vant-button>
      <image v-if="uploadImgPath" :src="uploadImgPath" class="upload-img-wrap" mode="aspectFit"/>
  </div>
</template>

<script>
import card from '@/components/card';
import CONSTANT from '@/base/constant';
import httpServer from '@/utils/http';
import { formatTime } from '@/utils/index';

//数据库
const db = wx.cloud.database();

export default {
  data () {
    return {
      uploadImgPath: ''
    }
  },

  components: {
    card
  },

  methods: {
    /**
     * @desc 获取用户信息
     */
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(res)
            }
          })
        }
      })
    },

    /**
     * @desc “上传图片”按钮点击的回调
     */
    uploadImgBtnCb() {
      const self = this;
      wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        success: self.showAcsSuc
      })
    },

    /**
     * @desc actionSheet 选择后的回调
     */
    showAcsSuc(resp) {
      const self = this;
      let sourceType = resp.tapIndex === 0 ? 'album' : 'camera';
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [sourceType],
        success(resp) {
          console.log('chooseImage resp: ', resp);
          self.uploadImgPath = resp.tempFilePaths[0]
          console.log*('!!!')
        }
      })
    },

    /**
     * @desc 删除所有user
     */
    removeAllUser() {
      wx.cloud.callFunction({
        name: 'deleteUser',
        data: {}
      }).then(resp => {
        console.log(resp);
      })
    }
    
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
}
</script>

<style lang="scss" scoped>
$--color-gold: gold;
.main-wrap {
  //background-color: $--color-gold;

  .upload-img-wrap {
    width: 100%;
  }
}
</style>
