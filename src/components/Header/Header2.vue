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
      <!-- <template #right> <van-icon name="ellipsis" size="22" /> </template> -->
    </van-nav-bar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Header_s',
  props: ['title'],
  setup() {
    const router = useRouter()
    const showPopover = ref(false)
    const actions = [
      { path: '/home', text: '首页', icon: 'shop-collect-o' },
      { path: '/car', text: '购物车', icon: 'cart-o' },
      { path: '/address', text: '收货地址', icon: 'logistics' },
      { path: '/category', text: '商品分类', icon: 'qr' },
      { path: '/mine', text: '我的', icon: 'contact' },
    ]
    const onClickLeft = () => history.back()
    const onSelect = (action) => {
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
