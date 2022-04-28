<template>
  <div class="shopping-container">
    <div class="shopping" :data-proid="proid">
      <div class="pro-img">
        <img class="lazyload" :src="showpic" />
      </div>
      <div class="pro-detail">{{ detail }}</div>
      <div class="pro-info">
        <span class="pro-price">￥ {{ price }} </span>
        <span class="pro-customers" v-if="check"> 有7人已购买 </span>
        <van-icon @click="add" v-else size="18" name="cart" color="#e93b3d" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showpic', 'proid', 'price', 'detail', 'proname', 'check'],
  name: 'Shop',
  setup(props) {
    // 添加商品入购物车
    const add = () => {
      console.log(props.proid)
    }
    return {
      add,
    }
  },
}
</script>

<style lang="less" scoped>
.shopping-container {
  width: 49%;
  .shopping {
    background-color: #fff;
    margin-bottom: 10px;
    // border: 1px solid red;
    > div {
      padding-left: 10px;
    }
    .pro-img {
      padding: 0;
      img {
        cursor: pointer;
        width: 100%;
      }
    }
    .pro-detail {
      color: #333;
      font-size: 13px;
      margin: 4px;
    }
    .pro-info {
      position: relative;
      padding-bottom: 10px;
      .pro-price {
        color: #d44d44;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .pro-customers {
        margin-left: 5px;
        color: #d0d0d0;
        font-size: 12px;
      }
      .van-icon {
        position: absolute;
        right: 16px;
      }
    }
  }
}
</style>
