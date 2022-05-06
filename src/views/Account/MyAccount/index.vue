<template>
  <van-cell title="管理我的账户" class="title" />
  <div class="user">
    <div class="content">
      <div class="user-info">
        <div class="user-left">
          <img :src="$store.state.User.user.userpic" />
        </div>
        <div class="user-right">
          <div class="r-top">{{ $store.state.User.user.username }}</div>
          <div class="r-down" v-if="true">用户权限：普通用户</div>
          <div class="r-down" v-else>用户权限：高级管理员</div>
          <div class="set">当前登录</div>
        </div>
      </div>
    </div>
  </div>
  <div class="features">
    <van-cell
      @click="$router.push({ path: '/address' })"
      title="收货地址管理"
      is-link
      value="管理我的地址"
    />
    <van-cell
      @click="
        $router.push({
          path: '/account/order',
          query: { userid: $store.state.User.user.userid },
        })
      "
      title="订单查询"
      is-link
      value="管理我的订单"
    />
  </div>
  <div class="secure">
    <van-cell
      title="账号与安全"
      @click="$router.push({ path: '/account/mod' })"
      is-link
      value="修改个人信息"
    />
    <van-cell @click="tips" title="HBmark支付密码" is-link value="去设置" />
    <van-cell @click="tips" title="隐私设置" is-link />
  </div>
  <div class="serve">
    <van-cell
      @click="go"
      title="联系客服"
      is-link
      value="向作者提出您宝贵的意见"
    />
    <van-cell title="切换站点" is-link @click="tips" />
    <van-cell @click="logout" title="退出登录" is-link />
  </div>
  <div class="footer">
    <van-notice-bar
      scrollable
      left-icon="warning-o"
      text="欢迎各位提出宝贵的意见！！！"
      @click="go"
    />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'MyAccount',
  setup() {
    const logout = () => {
      localStorage.setItem('token', 'logout')
      Toast('已安全退出')
      location.reload()
    }
    const go = () => {
      window.open('https://gitee.com/lura-syxilia/vue3-jd-client')
    }
    const tips = () => {
      Toast('正在完善中')
    }
    return {
      logout,
      go,
      tips,
    }
  },
}
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  padding: 0 10px 18px;
  .content {
    overflow: hidden;
    background: #fff9f9;
    position: relative;
    padding: 20px 10px;
    border: 1px solid #ffb2b7;
    border-radius: 16px;
    .user-info {
      display: flex;
      font-size: 13px;
      color: #9a9797;
      .user-left {
        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
      }
      .user-right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 20px;
        flex: 1;
        .r-top {
          font-size: 16px;
          color: #4f4e4e;
        }
        .set {
          position: absolute;
          top: 0;
          right: 0px;
          padding: 2px 11px 2px 9px;
          border-bottom-left-radius: 10px;
          color: #e2231a;
          background-color: #ffe4e4;
        }
      }
    }
  }
}
.features,
.secure,
.serve {
  overflow: hidden;
  border-radius: 15px;
  margin-top: 15px;
}
.footer {
  margin-top: 40px;
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
