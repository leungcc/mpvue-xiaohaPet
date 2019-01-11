<!--
  推测：生命周期钩子 created触发 - 进入首页时，就把要跳转的页面的 created都触发
-->

<template>
  <div class="p-nearby">
    <map id="map"
      style="width:100%; height:600rpx;"
      :longitude="longitude" :latitude="latitude"
      scale="14" show-location
      sub-key="F3PBZ-UT5RR-27ZWE-WXK45-SNDNZ-P5F5T"
      :controls="controls" :markers="markers">
      <!-- <cover-view class="search-result">
        <cover-view class="search-result-wrap">
          
        </cover-view>
      </cover-view> -->
    </map>
    <div class="petcard-wrap">
      <nearby-petcard
        v-for="item in petStar"
        :key="item._id"
        :item="item"
      ></nearby-petcard>
    </div>
  </div>
</template>

<script>
import nearbyPetcard from './nearbyPetcard';
import httpServer from '@/utils/http';
import CONSTANT from '@/base/constant';
import { cloudFunctionHasNext } from '@/utils/index';

const QQMapWX = require('../../../static/wxmap/qqmap-wx-jssdk.min.js');
let qqmapsdk = null;

export default {
  components: { nearbyPetcard },
  created() {
    const self = this;

    console.log('Page nearby created...');

    //过3秒后移动到

    qqmapsdk = new QQMapWX({
      key: 'F3PBZ-UT5RR-27ZWE-WXK45-SNDNZ-P5F5T'
    });
    qqmapsdk.search({
      keyword: '萝岗地铁站',
      success(resp) {
        if(resp.data && resp.data[0]) {
          self.longitude = resp.data[0].location.lng;
          self.latitude = resp.data[0].location.lat;
        }
      },
      fail(resp) {
        console.error(resp)
      },
      complete: function (res) {
        //console.log(res);
      }
    })
    
  },
  mounted() {
    const self = this;
    console.log('Page nearby mounted...');

    self.getPetstarList();
    
    //创建地图实例
    self.MapInst = wx.createMapContext('map');



    //xc test 进入该页面后3秒移动地图到所在地
    setTimeout(() => {
      self.MapInst.moveToLocation();
    }, 3*1000)
  },
  data() {
    return {
      MapInst: null,        //地图实例

      petStar: [],

      longitude: 113.324520,
      latitude: 23.099994,
      markers: [],
      controls: [{
        id: 1,
        iconPath: '/resources/location.png',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  },

  methods: {
    /**
     * @desc 获取明星宠物列表
     */
    getPetstarList() {
      httpServer.getPetstar().then(resp => {
        this.petStar = resp.data;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.p-nearby {
  height: 100%;
  overflow: hidden;
}
.search-result-wrap {
  width: 100%;
  height: 100rpx;
  background-color: rgba(0,0,0,.2);
  position: absolute;
  bottom: 0;
}
.petcard-wrap {
  height: calc(100% - 600rpx);
  overflow: auto;
}
</style>
