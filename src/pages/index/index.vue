<template>
  <div class="p-wrap p-index">
    <!-- 顶部容器 -->
    <div class="index-top-wrap">
      <div class="l-wrap" style="width:130rpx;">
        <span class="cald-block common-radius common-shadow"></span>
        <span class="search-block common-radius pr common-shadow">
          <i class="i-search2 common-icon ver-center"></i>
        </span>
      </div>
      <div class="banner-wrap common-radius common-shadow">
        <image 
          src="https://7863-xctest1-62e0ce-1257796632.tcb.qcloud.la/banner/banner.png?sign=1d90af401350ed567137ac3332d50eb0&t=1543308940"
          mode="scaleToFill"/>
      </div>
    </div>

    <!-- 快速通道容器 -->
    <div class="hyperchannel-wrap">
      <span class="hyperchannel-item">{{motto}}</span>
      <span class="hyperchannel-item"></span>
      <span class="hyperchannel-item"></span>
      <span class="hyperchannel-item"></span>
    </div>

    <!--各大模块容器-->
    <div class="modules-wrap">
      <!-- m-精彩阅读 -->
      <indexModule
        custom-class="im-reading"
        title="精彩阅读"
        :data="imReadingData">
        <div style="height:360rpx;" slot>
          <swiper
            style="height: 100%;"
            :interval="1000"
            next-margin="100rpx">
            <block v-for="(item, index) in data" :key="index">
              <swiper-item>
                <image 
                  class="swiper-img common-radius"
                  :src="item.img"
                  width="600"
                  mode="scaleToFill" 
                  height="360"/>
              </swiper-item>
            </block>
          </swiper>
        </div>  
      </indexModule>
      <!-- m-明星宠物 -->
    </div>
  </div>
</template>

<script>
import card from '@/components/card';
import indexModule from '@/components/indexModule';


//数据库
const db = wx.cloud.database();

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      imReadingData: [{
        type: '热门推荐',
        title: '宠物天下',
        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2645270468,2305942404&fm=173&app=49&f=JPEG?w=218&h=146&s=A2A1DB0596EB73110F35ADB703001012',
        personNum: 3286
      }, {
        type: '热门推荐11',
        title: '宠物天下22',
        img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1526156770,4220481624&fm=173&app=49&f=JPEG?w=218&h=146&s=304348B4EE2E029EA84B71830300A088'
      }]
    }
  },

  components: {
    card, 
    indexModule
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
            }
          })
        }
      })
    },

    /**
     * @desc 测试云函数
     */
    testCloud() {
      //查询数据
      db.collection('dog').get({
        success: function (res) {
          // res.data 包含该记录的数据
          console.log(res)
        }
      });

      //测试云函数
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
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();

    this.testCloud();
    
  }
}
</script>

<style lang="scss">
.p-wrap.p-index {
  > div {
    width: 100%;

  }

  .index-top-wrap {
    height: 200rpx;
    display: flex;
    justify-content:space-between;
    margin-bottom: 14rpx;

    .l-wrap {
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }

    > div {
      height: 100%;
    }
    .cald-block {
      height: 130rpx;
      width: 130rpx;
      display: inline-block;
      background: url('https://7863-xctest1-62e0ce-1257796632.tcb.qcloud.la/icon/rilibg.png') no-repeat;
      background-size:100% auto;

    }
    .search-block {
      height: 56rpx;
      width: 130rpx;
      display: inline-block;
      
      .i-search2 {
        width: 30rpx;
        height: 30rpx;
        background-repeat: no-repeat;
        background-size: auto 100%;
      }
    }

    .banner-wrap {
      height: 100%;
      width: 560rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .hyperchannel-wrap {
    height: 200rpx;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hyperchannel-item {
      width: 120rpx;
      height: 120rpx;
      border: 1rpx solid $--color-border-gray;
    }
  }

  .modules-wrap {
    > div {
      margin-top: 30rpx;
    }
    .index-module {
      margin-top: 30rpx;
    }

    .im-reading {
      .swiper-img {
        width: 600rpx;
        height: 360rpx;
      }
    }
  }
}

</style>
