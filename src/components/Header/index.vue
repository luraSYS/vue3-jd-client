<template>
  <div class="header-container">
    <van-nav-bar fixed>
      <template #left>
        <van-popover
          v-model:show="showPopoverL"
          placement="right-start"
          theme="dark"
          :actions="actionsL"
          @select="onSelect"
        >
          <template #reference>
            <van-icon name="wap-nav" />
          </template>
        </van-popover>
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
import userStore from '@/store/user'
import { Toast } from 'vant'
export default {
  name: 'Header',
  setup() {
    const router = useRouter()
    const showPopover = ref(false)
    const actions = [
      { private: true, path: '/account', text: '个人中心', icon: 'flower-o' },
      {
        private: true,
        path: '/account/order',
        text: '我的订单',
        icon: 'orders-o',
      },
      { private: true, path: '/address', text: '我的地址', icon: 'logistics' },
    ]
    const showPopoverL = ref(false)
    const actionsL = [
      { private: false, path: '/home', text: '首页', icon: 'shop-collect-o' },
      { private: false, path: '/car', text: '购物车', icon: 'cart-o' },
      { private: true, path: '/address', text: '收货地址', icon: 'logistics' },
      { private: false, path: '/category', text: '商品分类', icon: 'qr' },
      { private: false, path: '/mine', text: '我的', icon: 'contact' },
    ]
    const onSelect = (action) => {
      if (!action.private) return router.push({ path: action.path })
      if (!userStore.state.isLogin) return Toast('请先登录')
      router.push({ path: action.path })
    }
    return {
      onSelect,
      showPopover,
      showPopoverL,
      actions,
      actionsL,
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
