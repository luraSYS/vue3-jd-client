<template>
  <div class="header-title">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-popover
          v-model:show="showPopover"
          placement="bottom-end"
          theme="dark"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-icon name="ellipsis" size="22" />
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
  name: 'Header_s',
  props: ['title'],
  setup() {
    const router = useRouter()
    const showPopover = ref(false)
    const actions = [
      { private: false, path: '/home', text: '首页', icon: 'shop-collect-o' },
      { private: false, path: '/car', text: '购物车', icon: 'cart-o' },
      { private: true, path: '/address', text: '收货地址', icon: 'logistics' },
      { private: false, path: '/category', text: '商品分类', icon: 'qr' },
      { private: false, path: '/mine', text: '我的', icon: 'contact' },
    ]
    const onClickLeft = () => history.back()
    const onSelect = (action) => {
      if (!action.private) return router.push({ path: action.path })
      if (!userStore.state.isLogin) return Toast('请先登录')
      router.push({ path: action.path })
    }
    return {
      actions,
      showPopover,
      onClickLeft,
      onSelect,
    }
  },
}
</script>

<style lang="less" scoped>
.header-title {
  .van-nav-bar {
    --van-nav-bar-arrow-size: 22px;
    --van-nav-bar-title-font-size: 18px;
  }
}
</style>
