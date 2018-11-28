<template>
  <div class="p-wrap p-index">
    <!-- 顶部容器 -->
    <div class="index-top-wrap lrpadding20">
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
    <div class="hyperchannel-wrap lrpadding80">
      <span class="hyperchannel-item">{{motto}}</span>
      <span class="hyperchannel-item"></span>
      <span class="hyperchannel-item"></span>
      <span class="hyperchannel-item"></span>
    </div>

    <line width="90.6%"></line>

    <!--各大模块容器-->
    <div class="modules-wrap">
      <!-- m-为你推荐 -->
      <indexModule
        custom-class="im-reading"
        title="为你推荐"
        :data="imReadingData">
        <div style="height:360rpx;" slot>
          <swiper
            style="height: 100%;"
            :interval="1000"
            next-margin="100rpx">
            <block v-for="(item, index) in data" :key="index">
              <swiper-item>
                <div class="swiper-item-wrap">
                  <image 
                    class="swiper-img common-radius"
                    :src="item.img"
                    width="600"
                    mode="scaleToFill" 
                    height="360"/>
                  <span class="type">{{item.type}}</span>
                  <span class="title">{{item.title}}</span>
                </div>
              </swiper-item>
            </block>
          </swiper>
        </div>  
      </indexModule>
      <!-- m-明星宠物 -->
      <index-module
        custom-class="pat-star"
        title="明星宠物"
        :data="patStar">
        <div style="height:360rpx;" slot>

          <patstarCard 
            v-for="(item, index) in patStar"
            :key="item._id"
            :data="item"></patstarCard>  
        </div>
      </index-module>
    </div>
  </div>
</template>

<script>
import card from '@/components/card';
import line from '@/components/line';
import indexModule from '@/components/indexModule';
import patstarCard from '@/components/patstarCard';
import CONSTANT from '@/base/constant';
import httpServer from '@/utils/http';
import { cloudFunctionHasNext } from '@/utils/index';


//数据库
const db = wx.cloud.database();

export default {
  
  components: {
    card, 
    line,
    indexModule,
    patstarCard
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.getPatstarList();

    //this.testCloud();
  },

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
        type: '精彩瞬间',
        title: '温馨生活',
        img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1526156770,4220481624&fm=173&app=49&f=JPEG?w=218&h=146&s=304348B4EE2E029EA84B71830300A088'
      }],
      patStar: []
    }
  },

  methods: {
    /**
     * @desc 获取用户信息
     */
    getUserInfo () {
      const __this = this;
      // 调用登录接口
      wx.login({
        success: (respLg) => {
          wx.getUserInfo({
            success: (resp) => {
              //存储用户信息
              CONSTANT.USER_INFO = this.userInfo = resp.userInfo;

              __this.getOpenId()
                .then(cloudFunctionHasNext)
                .then(resp => {
                  let openid = CONSTANT.OPEN_ID = resp.result.userInfo.openId;
                  let params = { openid };
                  return httpServer.getUser(params)
                })
                .then(resp => {
                  //没有该数据就请求入库
                  if(resp && resp.data && !resp.data.length) {
                    let params = {
                      ...CONSTANT.USER_INFO,
                      openid: CONSTANT.OPEN_ID
                    }
                    return httpServer.addUser(params);
                  }
                  return Promise.reject();
                })

            }
          })
        }
      })
    },

    /**
     * @desc 获取明星宠物列表
     */
    getPatstarList() {
      httpServer.getPatstar().then(resp => {
        console.warn('patStar')
        console.warn(resp)
        this.patStar = resp.data;
      })
    },

    getOpenId() {
      return wx.cloud.callFunction({
        name: 'srcCloud',
        data: {}
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
    //border-bottom: 1px solid #ddd;
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
      .index-module-bd {
        padding-left: 20rpx;
      }
      .swiper-item-wrap {
        position: relative;

        .swiper-img {
          width: 600rpx;
          height: 360rpx;
        }

        .title {
          position: absolute;
          font-size: 40rpx;
          font-weight: bold;
          top: 100rpx;
          left: 50rpx;
          color: $--color-white;
        }
        .type {
          position: absolute;
          font-size: 28rpx;
          top: 50rpx;
          left: 50rpx;
          color: $--color-white;
          letter-spacing: 2rpx;
        }
      }
    }

    .pat-star {
      padding-left: 20rpx;
    }
  }
}

</style>
