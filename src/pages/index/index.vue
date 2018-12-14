<template>
  <div class="p-wrap p-index">
    <!-- 顶部容器 -->
    <div class="index-top-wrap lrpadding20">
      <div class="l-wrap" style="width:130rpx;">
        <span class="cald-block common-radius common-shadow">
          <span class="txt-today">Today</span>
          <span class="txt-date">30</span>
        </span>
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
      <span class="hyperchannel-item" @click.stop="hyperchannelGo('petType')">
        <i class="i-hyperchannel i-hyper-dog"></i>
        <span class="hyperchannel-txt text-overflow">宠物类型</span>
      </span>
      <span class="hyperchannel-item" @click.stop="hyperchannelGo('petRead')">
        <i class="i-hyperchannel i-hyper-chat"></i>
        <span class="hyperchannel-txt text-overflow">宠物文章</span>
      </span>
      <span class="hyperchannel-item" @click.stop="hyperchannelGo('nearby')">
        <i class="i-hyperchannel i-hyper-heart"></i>
        <span class="hyperchannel-txt text-overflow">身边宠物</span>
      </span>
      <span class="hyperchannel-item" @click.stop="hyperchannelGo('my')">
        <i class="i-hyperchannel i-hyper-my"></i>
        <span class="hyperchannel-txt text-overflow">我的地盘</span>
      </span>
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
      <!-- m-明星宠物 --> <!-- !!!slot内套 patstar-card组件有问题！ -->
      <index-module
        custom-class="pat-star"
        title="明星宠物"
        :data="patStar">
      </index-module>
      <div class="pat-star-bd">
        <div class="card-wrap">
          <patstar-card
            v-for="(item,index) in patStar"
            :key="index"
            :data="item"
          ></patstar-card>
        </div>
      </div>
      <!-- m-精彩阅读 --> <!-- !!!slot内套 patstar-card组件有问题！ -->
      <index-module
        custom-class="splendid-reading"
        title="精彩阅读"
        :data="readingList">
      </index-module>
      <div class="splendid-reading-bd">
        <div class="card-wrap">
          <reading-card
            v-for="item in readingList"
            :key="item._id"
            :data="item"
          ></reading-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card';
import line from '@/components/line';
import indexModule from '@/components/indexModule';
import patstarCard from '@/components/patstarCard';
import readingCard from '@/components/readingCard';
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
    patstarCard,
    readingCard
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
    this.getPatstarList();
    this.getReadingList();

    //this.testCloud();
  },

  data() {
    return {
      date_td: new Date(),
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
      patStar: [],
      readingList: [{
        "column": "猫咪专栏",
        "title": "猫咪开心的时候会有什么表现",
        "imgpath": "cloud://xctest1-62e0ce.7863-xctest1-62e0ce/banner/read1.png",
        "content": "猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会猫咪开心的时候会"
      }]
      
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
        this.patStar = resp.data;
      })
    },

    getReadingList() {
      httpServer.getReadingList().then(resp => {
        this.readingList = resp.data;
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
    },

    /**
     * @desc 快速通道点击跳转
     */
    hyperchannelGo(channel) {
      console.warn(channel);
      if(channel === 'nearby') {
        //wx.navi
        wx.navigateTo({
          url: '../nearby/main',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
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
      text-align: center;
      > span {
        color: $--color-white;
        display: block;
      }

      .txt-today {
        font-size: 28rpx;
        height: 64rpx;
        line-height: 64rpx;
      }
      .txt-date {
        font-size: 46rpx;
        height: 54rpx;
        line-height: 54rpx;
      }
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
      //border: 1rpx solid $--color-border-gray;

      .hyperchannel-txt {
        display: block;
        height: 40rpx;
        line-height: 40rpx;
        width: 100%;
        text-align: center;
        font-size: 24rpx;
        color: $--color-font-black;
      }
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

    .pat-star-bd {
      width: auto;
      margin-top: 0;
      padding-left: 20rpx;
      
      height: 360rpx;
      overflow: hidden;

      .card-wrap{
        height: 375rpx;
        width: auto;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
       
        > div {
          margin-right: 20rpx;
        }
      }
    }

    .splendid-reading-bd {
      margin-top: 0;
      padding: 0 20rpx;

      .card-wrap {
        > div:not(:first-child) {
          margin-top: 30rpx;
        }
      }
    }
  }
}

</style>
