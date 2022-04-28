<template>
  <div class="part" :id="part">
    <div class="title">
      <div class="title-head">{{ head }}</div>
      <div class="title-detail">{{ title }}</div>
    </div>
    <van-list
      class="main-content"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      offset="0"
    >
      <Shop
        v-for="item in $store.state.Shop[part].shops"
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
import Shop from './Shop/index.vue'
import { getProduct } from '@/api'
import { ref } from 'vue'
import store from '@/store'
export default {
  name: 'ShopPart',
  props: ['part', 'head', 'title'],
  components: { Shop },
  setup(props) {
    const page = ref(1)
    if (props.part == 'boutique') getProduct(props.part, page.value++)
    const loading = ref(false)
    const finished = ref(false)
    const onLoad = () => {
      // 里面放异步函数
      // 执行异步函数期间loading为true，此时onload函数不再触发
      // 异步函数执行完毕手动改loading为flase,再次开启onload函数
      if (store.state.Shop[props.part].have == true) {
        // 加载状态结束后再置loading为false
        getProduct(props.part, page.value++).then(() => (loading.value = false))
      }

      // 数据全部加载完成(置findshed为true，关闭onload函数)
      else finished.value = true
    }
    return {
      page,
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
