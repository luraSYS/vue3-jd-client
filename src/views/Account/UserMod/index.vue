<template>
  <!-- <h3 style="text-align: center">修改用户信息</h3> -->
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field name="userpic" label="用户头像">
        <template #input>
          <van-uploader
            :disabled="!$store.state.User.profile.canMod"
            v-model="picUrl"
            :max-count="1"
          />
        </template>
      </van-field>
      <van-field
        v-model="$store.state.User.user.username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ validator: checkname }]"
      />
      <van-field
        :disabled="$store.state.User.userstate.disModPsd"
        v-model="password"
        type="password"
        name="password"
        label="密码"
        :rules="[{ validator: checkpsd }]"
      />
      <van-field
        v-model="$store.state.User.user.phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ validator: checkphone }]"
      />
    </van-cell-group>
    <div style="margin: 16px" class="btns">
      <van-button
        type="primary"
        :disabled="!$store.state.User.userstate.disModPsd"
        plain
        round
        @click="show = true"
        >修改密码</van-button
      >
      <van-button
        :loading="disbtn"
        loading-text="更新用户信息中..."
        :disabled="disbtn"
        round
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        native-type="submit"
      >
        提交
      </van-button>
    </div>
  </van-form>
  <van-popup v-model:show="show">
    <van-field
      v-model="password"
      placeholder="请输入原密码"
      :rules="[{ validator: checkpsd }]"
    />
    <van-button color="#7232dd" plain @click="unlock">确认</van-button>
  </van-popup>
  <van-notice-bar
    scrollable
    left-icon="warning-o"
    text="图库空间有限，请不要频繁上传图片，图片过多会定期清理，如有问题还请指正与提出 (点击前往该项目主页)"
    @click="go"
  />
</template>

<script>
import { checkname, checkpsd, checkphone } from '@/utils/checkinfo'
import { ref } from 'vue'
import userstore from '@/store/user'
import axios from 'axios'
import { checkPsd, usermodInfo, userModPic } from '@/api'
export default {
  name: 'UserMod',
  setup() {
    const userid = userstore.state.user.userid
    const currPic = userstore.state.user.userpic
    const password = ref('your_old_psd')
    const picUrl = ref([
      { url: currPic, deletable: userstore.state.profile.canMod },
    ])
    const disbtn = ref(false)
    const show = ref(false)
    const go = () => {
      window.open('https://gitee.com/lura-syxilia/vue3-jd-client')
    }

    const unlock = () => {
      checkPsd({ userid, password: password.value })
      show.value = false
    }
    const onSubmit = (e) => {
      disbtn.value = true
      setTimeout(() => {
        disbtn.value = false
      }, 5000)
      // 1.修改用户信息
      const data = {
        username: e.username,
        phone: e.phone,
        password: e.password,
      }
      if (userstore.state.userstate.disModPsd) delete data.password
      usermodInfo(data, userid)
      password.value = 'your_old_psd'
      // 2.修改头像信息(先检查数据是否变化与是否可修改)
      if (
        !e.userpic.length ||
        userstore.state.user.userpic == e.userpic[0].url ||
        !userstore.state.profile.canMod
      )
        return
      const file = new FormData()
      file.append('file', e.userpic[0].file)
      file.append('upload_preset', 'goupan')
      modUserPic(file, userid)
    }
    async function modUserPic(file, userid) {
      const { data: res } = await axios({
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/alren001/upload',
        data: file,
      })
      userModPic(res.secure_url, userid)
    }
    return {
      password,
      picUrl,
      disbtn,
      show,
      go,
      unlock,
      onSubmit,
      modUserPic,
      checkname,
      checkpsd,
      checkphone,
    }
  },
}
</script>

<style lang="less" scoped>
.van-form {
  margin-top: 18px;
  .btns {
    display: flex;
    .van-button {
      flex: 1;
    }
  }
}
.van-popup {
  .van-field {
    width: 300px;
    border-bottom: 1px solid #ccc;
  }
  .van-button {
    float: right;
    margin: 10px 20px 5px;
    height: 30px;
  }
}
</style>
