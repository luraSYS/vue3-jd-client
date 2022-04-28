<template>
  <div class="login">
    <div class="title">手机号登录</div>
    <van-form @submit="onSubmit" label-width="50px">
      <van-cell-group>
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          autocomplete="off"
          :rules="[{ validator: checkname }]"
        />
        <van-field
          v-model="phone"
          type="phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          autocomplete="off"
          :rules="[{ validator: checkphone }]"
        />
      </van-cell-group>
      <div style="margin: 16px 23px">
        <van-button round block type="warning" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="check">
      <div class="log-phone">
        <router-link to="/mine/login">账号登录</router-link>
      </div>
      <div class="register">
        <router-link to="/mine/register">注册</router-link>
      </div>
    </div>
    <div class="else-login">
      <van-divider class="line">其他方式登录</van-divider>
      <div class="icons-login">
        <div class="qq"><van-icon name="qq" /></div>
        <div class="wechat"><van-icon name="wechat" /></div>
        <div class="weibo"><van-icon name="weibo" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { checkname, checkphone } from '@/utils/checkinfo'
import { userLogin2 } from '@/api'

export default {
  name: 'LogByPhone',
  setup() {
    const username = ref('')
    const phone = ref('')

    function onSubmit(values) {
      userLogin2(values)
    }
    return {
      username,
      phone,
      onSubmit,
      checkname,
      checkphone,
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  margin: 5px 20px;
  padding: 10px 0 40px;
  background-color: #fff;
  .title {
    text-align: center;
    padding: 10px 0;
    font-weight: 700;
  }
  .van-button {
    text-indent: 10px;
    letter-spacing: 10px;
  }
  .check {
    padding: 10px 20px 10px 10px;
    display: flex;
    justify-content: space-between;
  }
  .else-login {
    margin: 50px 10px 0;
    .line {
      --van-divider-border-color: #ccc;
    }
    .icons-login {
      display: flex;
      justify-content: center;
      // width: 90%;
      margin: 0 20px;
      > div {
        width: 50px;
        height: 50px;
        font-size: 28px;
        background-color: #e7f7fe;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
      }
      .qq {
        color: #29bef6;
      }
      .wechat {
        background-color: #e6f8e6;
        margin: 0 30px;
        color: #26c325;
      }
      .weibo {
        color: #ca1e1e;
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
