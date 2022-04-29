<template>
  <!-- 头部轮播图 -->
  <div class="ad-pics">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fa2c19">
      <van-swipe-item v-for="i in 6" :key="i">
        <img :src="require(`./images/sw${i}.png`)" />
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- icons导航部分 -->
  <div class="mall-nav">
    <div class="icons-wrapper">
      <a v-for="i in 10" :key="i">
        <img :src="require(`./images/${i - 1}.png`)" />
        <div class="icon-des">{{ homeIconNav[i - 1] }}</div>
      </a>
    </div>
  </div>
  <!-- 商品模块 -->
  <ShopPart
    v-for="(name, i) in partName"
    :key="i"
    :part="name"
    :head="partTitle[i]"
    :title="partDesc[i]"
  ></ShopPart>
</template>

<script>
import ShopPart from '@/components/ShopPart'
import { mapState } from 'vuex'
export default {
  name: 'MyHome',
  components: { ShopPart },
  setup() {
    return {}
  },
  computed: {
    ...mapState('Shop', ['partName', 'partTitle', 'partDesc', 'homeIconNav']),
  },
}
</script>

<style scoped lang="less">
.ad-pics {
  padding: 10px;
  .my-swipe {
    .van-swipe-item {
      img {
        width: 100%;
      }
    }
  }
}
.mall-nav {
  margin-bottom: 20px;
  .icons-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      text-align: center;
      margin: 10px 0 6px;
      width: 20%;
      font-size: 13px;
      img {
        width: 40px;
      }
    }
  }
}
</style>
