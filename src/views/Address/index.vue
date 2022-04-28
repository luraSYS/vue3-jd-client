<template>
  <Header2 title="收货地址" />
  <router-view></router-view>
</template>

<script>
import Header2 from '@/components/Header/Header2.vue'
export default {
  name: 'Address',
  components: { Header2 },
}
</script>

<style></style>
