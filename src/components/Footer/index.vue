<template>
  <div class="footer">
    <van-tabbar v-model="$store.state.Shop.currentRoute">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="qr">分类</van-tabbar-item>
      <van-tabbar-item to="/address" icon="location">地址</van-tabbar-item>
      <van-tabbar-item
        to="/car"
        icon="shopping-cart"
        :badge="$store.state.User.myCar.tnum"
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
export default {
  name: 'Footer',
  setup() {},
}
</script>

<style lang="less" scoped>
.footer {
  margin-top: 50px;
}
</style>
