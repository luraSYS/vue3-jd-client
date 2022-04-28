<template>
  <van-address-list
    v-model="currentId"
    :list="$store.state.User.addressList.address"
    default-tag-text="默认"
    @add="modAdd"
    @edit="editAdd"
  />
</template>

<script>
import { getAddress } from '@/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userStore from '@/store/user'
export default {
  name: 'MyAddress',
  setup() {
    // console.log('myaddress')
    const currentId = ref(-1)
    setTimeout(() => {
      if (!userStore.state.visitedAddress) {
        getAddress(userStore.state.user.userid)
      }
    }, 200)

    setTimeout(() => {
      currentId.value = userStore.state.addressList.current.id
    }, 300)
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
    return { currentId, modAdd, editAdd }
  },
}
</script>

<style></style>
