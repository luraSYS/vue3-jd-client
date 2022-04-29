<template>
  <van-swipe-cell class="item-cell">
    <van-card
      :price="price"
      :desc="desc"
      :title="title"
      class="goods-card"
      :data-proid="proid"
    >
      <template #thumb>
        <input type="checkbox" :checked="checked" @click="change" />
        <img :src="showpic" />
      </template>
      <template #num>
        <van-stepper
          v-model="quantity"
          theme="round"
          button-size="22"
          max="99"
          :integer="true"
          @plus="numchange('plus')"
          @minus="numchange('minus')"
          @blur="numchange('blur')"
        />
      </template>
    </van-card>
    <template #right>
      <van-button @click="del" square text="删除" type="danger" class="btn" />
      <van-button square text="收藏" type="primary" class="btn" />
    </template>
  </van-swipe-cell>
</template>

<script>
import store from '@/store'
import { DelFromCar } from '@/api'
export default {
  name: 'Shopitem',
  props: ['quantity', 'price', 'desc', 'title', 'showpic', 'checked', 'proid'],
  setup(props) {
    // 改变购物车中商品选中状态
    const change = (e) => {
      let data = { proid: props.proid, checked: e.target.checked }
      store.commit('User/modCarChecked', data)
    }
    // 购物车中商品数量变化
    const numchange = (type) => {
      let typeN = type == 'plus' ? 1 : -1
      typeN = type == 'blur' ? 0 : typeN
      let data = { proid: props.proid, quantity: props.quantity, typeN }
      store.commit('User/modCarNum', data)
    }
    // 商品移出购物车
    const del = () => {
      let data = {
        userid: store.state.User.user.userid,
        proid: props.proid,
      }
      DelFromCar(data)
    }
    return {
      change,
      numchange,
      del,
    }
  },
}
</script>

<style lang="less" scoped>
.item-cell {
  .goods-card {
    border-bottom: 1px solid #ccc;
    padding: 8px 16px 8px 8px;
    :deep(.van-card__thumb) {
      width: 88px;
      display: flex;
      align-items: center;
      padding-right: 28px;
      img {
        margin-left: 3px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .btn {
    height: 100%;
  }
}
</style>
