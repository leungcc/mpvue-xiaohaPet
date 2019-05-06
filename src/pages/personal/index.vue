<template>
  <div class="main-wrap">
      <vant-button @click="uploadImgBtnCb">上传图片</vant-button>
      <vant-button @click="getUserInfo">个人信息</vant-button>
      <vant-button @click="removeAllUser">删除所有user</vant-button>
      <image v-if="uploadImgPath" :src="uploadImgPath" class="upload-img-wrap" mode="aspectFit"/>

      <form 
        :report-submit="true"
        @submit="submitTestForm">
        <!-- <vant-button form-type="submit">提交</vant-button> -->
        <button form-type="submit">测试表单提交推送</button>
      </form>
  </div>
</template>

<script>
import card from '@/components/card';
import CONSTANT from '@/base/constant';
import httpServer from '@/utils/http';
import cloudFn from '@/utils/cloudFn';
import { formatTime } from '@/utils/index';

//数据库
const db = wx.cloud.database();

export default {
  
  created () {
    //xc test 蓉老板内网穿透
    //this.testRongServer();
    //xc test
    this.testpciServer();
    
  },

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
     * @desc 测试提交表单
     */
    async submitTestForm(event) {
      console.warn('submitTestForm..')
      // const formResp = await cloudFn.callFunc('testFormSubmitSend', {
      //   content: '哈哈'
      // })
      console.log(event)
      const formId = event.mp.detail.formId;
      console.log(1)
      const uniformMsgSendResp = await cloudFn.callFunc('uniformMsgSend', {
        formId
      });
      console.log(2)

    },
    /**
     * 
     */
    testpciServer() {
      // wx.request({
      //   url: "https://www.pcitech.com:8084/face-manage/api/weixin/saveVisitor",
      //   success(resp) {
      //     console.log(resp);
      //   },
      //   fail(err) {
      //     console.log(err)
      //   }
      // })
    },
    /**
     * @desc 测试蓉老板内网穿透
     */
    testRongServer() {
      wx.request({
        url: 'http://rong.easy.echosite.cn/face-manage/api/weixin/code2Session',
        data: {
          appid: '123',
          secret: '123',
          js_code: 'js_code',
          grant_type: 'authorization_code'
        },
        header: {
          "Content-Type": "application/json",
          //"token": "6c1561405673943b7dd579e0b0e93696"
        },
        success: function(resp) {
          console.warn('测试蓉老板接口成功')
          console.log(resp)
        },
        fail: function(resp) {
          console.error('测试蓉老板接口失败')
          console.log(resp)
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
