<template>
  <div class="p-nearby">
    <map id="map"
      style="width:100%; height:300px;"
      longitude="113.324520" latitude="23.099994"
      scale="14"
      show-location
      sub-key="F3PBZ-UT5RR-27ZWE-WXK45-SNDNZ-P5F5T"
      :controls="controls"
    >

    </map>
  </div>
</template>

<script>

const QQMapWX = require('../../../static/wxmap/qqmap-wx-jssdk.min.js');
let qqmapsdk = null;

export default {
  created() {
    console.warn('nearby created');
    qqmapsdk = new QQMapWX({
      key: 'F3PBZ-UT5RR-27ZWE-WXK45-SNDNZ-P5F5T'
    });
    qqmapsdk.search({
      keyword: '萝岗',
      success(resp) {
        console.warn(resp)
      },
      fail(resp) {
        console.error(resp)
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  mounted() {
    console.log('mounted...')
  },
  data() {
    return {
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
  }
}
</script>

<style>

</style>
