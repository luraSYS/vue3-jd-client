<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="qr">分类</van-tabbar-item>
      <van-tabbar-item to="/address" icon="location">地址</van-tabbar-item>
      <van-tabbar-item to="/car" icon="shopping-cart" badge=""
        >购物车</van-tabbar-item
      >
      <van-tabbar-item
        to="/mine"
        icon="manager"
        v-if="!$store.state.User.isLogin"
        >登录</van-tabbar-item
      >
      <van-tabbar-item to="/mine" icon="manager" dot v-else
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Footer',
  setup() {
    const active = ref('home')
    return { active }
  },
}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 50px;
}
</style>
