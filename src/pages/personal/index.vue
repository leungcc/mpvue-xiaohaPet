<template>
  <div class="main-wrap">
      personal center11
      <vant-button>hello</vant-button>
  </div>
</template>

<script>
import card from '@/components/card';

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();

    const db = wx.cloud.database();

    //查询数据
    db.collection('dog').get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res)
      }
    });

    wx.cloud.callFunction({
      name: 'srcCloud',
      data: {
        a: 123
      }
    })
    .then(resp => {
      console.log(resp);
    });
  }
}
</script>

<style lang="scss" scoped>
.main-wrap {
  background-color: red;
}
</style>
