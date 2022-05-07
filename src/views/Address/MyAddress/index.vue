<template>
  <van-cell
    style="margin-top: 10px"
    v-show="!$store.state.User.addressList.address.length"
    title="您还没收获地址，赶紧来设置一个吧"
  />
  <van-address-list
    v-model="$store.state.User.addressList.current.id"
    :list="$store.state.User.addressList.address"
    default-tag-text="默认"
    @add="modAdd"
    @edit="editAdd"
  />
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'MyAddress',
  setup() {
    // console.log('myaddress')
    const router = useRouter()
    const modAdd = () => {
      router.push({ path: '/address/mod', query: { type: 'add' } })
    }
    const editAdd = (e) => {
      router.push({
        name: 'mod',
        query: { type: 'edit' },
        params: {
          ...e,
          addressDetail: e.detail,
          areaCode: e.code,
          isDefault: Boolean(e.isDefault),
        },
      })
    }
    // @select="changeDef"
    return { modAdd, editAdd }
  },
}
</script>

<style></style>
