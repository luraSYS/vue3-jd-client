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
    <van-cell title="收货地址管理" is-link value="管理我的地址" />
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
    <van-cell title="账号与安全" is-link value="实名认证管理" />
    <van-cell title="HBmark支付密码" is-link value="去设置" />
    <van-cell title="隐私设置" is-link />
  </div>
  <div class="serve">
    <van-cell title="联系客服" is-link value="即时解答用户疑惑" />
    <van-cell title="切换站点" is-link />
    <van-cell @click="logout" title="退出登录" is-link />
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'MyAccount',
  setup() {
    // console.log('myaccount')
    const logout = () => {
      localStorage.setItem('token', '')
      Toast('已安全退出')
      location.reload()
    }
    return {
      logout,
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
</style>
