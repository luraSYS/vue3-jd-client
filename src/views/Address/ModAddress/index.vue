<template>
  <van-address-edit
    :address-info="data"
    show-delete
    :area-list="areaList"
    show-set-default
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script>
import { areaList } from '@vant/area-data'

import { Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { addAddress2, modAddress } from '@/api'
import userstore from '@/store/user'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = route.params

    data.isDefault = data.isDefault == 'true' ? true : false
    const onSave = (e) => {
      let area = e.province + e.city + e.county
      let full = area + e.addressDetail
      let userid = userstore.state.user.userid
      const data = {
        address: full,
        detail: e.addressDetail,
        code: e.areaCode,
        province: e.province,
        city: e.city,
        county: e.county,
        phone: e.tel,
        name: e.name,
        area: area,
        def: e.isDefault,
      }
      if (route.query.type == 'edit') modAddress(data, e.id, userid)
      else {
        data.userid = userid
        addAddress2(data)
      }
      router.push({ path: '/address' })
    }
    const onDelete = () => Toast('delete')
    return {
      data,
      onSave,
      onDelete,
      areaList,
    }
  },
}
</script>

<style></style>
