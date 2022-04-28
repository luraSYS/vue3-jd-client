<template>
  <Header2 :title="'账户设置'" />
  <router-view></router-view>
</template>

<script>
import Header2 from '@/components/Header/Header2.vue'
export default {
  name: 'Account',
  components: { Header2 },
}
</script>

<style lang="less" scoped></style>
