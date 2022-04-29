<template>
  <a href="javascript:;" class="to-top" v-show="showToTop" @click="goTop"></a>
  <Header v-show="$route.meta.showH" />
  <router-view></router-view>
  <Footer v-show="$route.meta.showF" />
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ref, watch } from 'vue'
import { getUser } from '@/api'
import { useRoute } from 'vue-router'
import store from '@/store'

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    getUser()
    const route = useRoute()
    let showToTop = ref(false)
    const goTop = () => {
      scrollTo(0, 0)
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY > 440) showToTop.value = true
      else showToTop.value = false
    })
    watch(route, () => {
      store.commit('Shop/modCurrentRoute', route.path)
      goTop()
    })
    return {
      showToTop,
      goTop,
    }
  },
}
</script>

<style lang="less" scoped>
.to-top {
  position: fixed;
  width: 38px;
  height: 38px;
  z-index: 9;
  right: 10px;
  bottom: 110px;
  background: url('./assets/images/upload/top.png') no-repeat;
  background-size: 38px;
}
</style>
