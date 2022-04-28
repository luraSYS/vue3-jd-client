<template>
  <div class="recommend">
    <van-divider :style="{ borderColor: '#222' }">
      {{ recommendTxt }}
    </van-divider>
    <van-list
      class="main-content"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <Shop
        v-for="item in $store.state.User.recommend.shops"
        :key="item"
        :proname="item.name"
        :showpic="item.showpic"
        :proid="item.proid"
        :price="item.price"
        :detail="item.detail"
      ></Shop>
    </van-list>
  </div>
</template>

<script>
import Shop from '../Shop'
import userstore from '@/store/user'
import { getRecommend } from '@/api'
import { ref } from 'vue'
export default {
  name: 'ShopsRecommend',
  props: ['recommendTxt'],
  components: { Shop },
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const onLoad = () => {
      if (userstore.state.recommend.have) {
        getRecommend(
          userstore.state.user.userid,
          userstore.state.recommend.page
        ).then(() => {
          loading.value = false
        })
      } else finished.value = true
    }
    return {
      loading,
      finished,
      onLoad,
    }
  },
}
</script>

<style lang="less" scoped>
.recommend {
  padding: 10px;
  .main-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
