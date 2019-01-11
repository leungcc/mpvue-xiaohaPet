<template>
  <div>
    <ul class="container log-list">
      <!-- <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li> -->
      <li v-for="(item, index) in historyUser" :key="index">
        <image :src="item.avatarUrl" />
        <text>{{ item.nickName }}</text>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import httpServer from '@/utils/http'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      logs: [],
      historyUser: []
    }
  },

  created () {
    this.getHistoryUser();
    httpServer.getBook().then(resp => {
      console.warn(resp);
    })
  },

  methods: {
    getHistoryUser() {
      httpServer.getUser().then(resp => {
        resp && resp.data && (this.historyUser = resp.data);
      })
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
