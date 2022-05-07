<template>
  <div class="part">
    <div class="title">
      <div class="title-head">{{ $store.state.Shop[cate].title }}</div>
      <div class="title-detail">{{ $store.state.Shop[cate].descTitle }}</div>
    </div>
    <van-list
      class="main-content"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
    >
      <Shop
        v-for="item in $store.state.Shop[cate].shops"
        :key="item.proid"
        :proname="item.proname"
        :showpic="item.showpic"
        :proid="item.proid"
        :price="item.price"
        :detail="item.detail"
        :check="true"
      ></Shop
    ></van-list>
    <div class="border"></div>
  </div>
</template>

<script>
import Shop from '@/components/ShopPart/Shop'
import { getProduct } from '@/api'
import { ref } from 'vue'
import shopStore from '@/store/shop'
import { useRoute } from 'vue-router'
export default {
  name: 'Cate',
  components: { Shop },
  setup() {
    const route = useRoute()
    const page = ref(1)
    const cate = route.query.cate
    const loading = ref(false)
    const finished = ref(false)
    const onLoad = () => {
      if (shopStore.state[cate].have == true) {
        getProduct(cate, page.value++).then(() => (loading.value = false))
      }
      // 数据全部加载完成(置findshed为true，关闭onload函数)
      else finished.value = true
    }
    return {
      page,
      cate,
      loading,
      finished,
      getProduct,
      onLoad,
    }
  },
}
</script>

<style lang="less" scoped>
.part {
  padding: 0 10px;
  .main-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .title {
    background-color: #f8f8fc;
    text-align: center;
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
    .title-head {
      font-size: 20px;
      font-weight: 700;
    }
    .title-detail {
      font-size: 14px;
      color: #999999;
      padding: 4px 0 8px;
    }
  }
  .border {
    height: 30px;
    background-color: #ededed;
  }
}
</style>
