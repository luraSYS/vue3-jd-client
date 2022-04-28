<template>
  <div class="header-container">
    <van-nav-bar @click-left="onClickLeft" fixed>
      <template #left>
        <van-icon name="wap-nav" />
      </template>
      <template #title>
        <div class="search">
          <van-icon name="search" />
          <input type="text" placeholder="请输入商品信息" />
        </div>
      </template>

      <template #right>
        <van-popover
          v-model:show="showPopover"
          placement="bottom-end"
          :actions="actions"
          @select="onSelect"
          :offset="[12, 16]"
        >
          <template #reference>
            <van-icon name="user-o" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
export default {
  name: 'Header',
  setup() {
    const onClickLeft = () => history.back()
    const router = useRouter()
    const showPopover = ref(false)
    const actions = [
      { path: '/account', text: '个人中心', icon: 'flower-o' },
      { path: '/account/order', text: '我的订单', icon: 'orders-o' },
      { path: '/address', text: '我的地址', icon: 'logistics' },
    ]
    const onSelect = (action) => {
      router.push({ path: action.path })
    }
    return {
      onClickLeft,
      onSelect,
      showPopover,
      actions,
    }
  },
}
</script>

<style scoped lang="less">
.header-container {
  margin-bottom: 46px;
  :deep(.van-nav-bar) {
    background-color: #c82519;
    .search {
      position: relative;
      overflow: hidden;
      border-radius: 20px;
      input {
        width: 200px;
        height: 25px;
        outline: none;
        border: none;
        font-size: 13px;
        padding-left: 20px;
      }
      .van-icon {
        color: #bdbdbd;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .van-icon {
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
