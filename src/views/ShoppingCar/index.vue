<template>
  <Header2 title="购物车" />
  <!-- 操作地址相关部分 -->
  <van-cell
    is-link
    :title="$store.state.User.addressList.current.area"
    v-show="$store.state.User.isLogin"
    value="编辑地址"
    icon="location-o"
    @click="showAddress"
  />
  <!-- 展示用户地址 -->
  <van-action-sheet v-model:show="show" title="选择其他地址">
    <div class="content">
      <van-address-list
        v-model="currentId"
        :list="$store.state.User.addressList.address"
        default-tag-text="默认"
        @add="toggleShow"
        @edit="editAdd"
        @select="changeDef"
      />
    </div>
  </van-action-sheet>
  <!-- 新增用户地址 -->
  <van-action-sheet v-model:show="showArea">
    <div class="content">
      <van-area
        title="添加其他地址"
        :area-list="areaList"
        cancel-button-text="返回"
        @confirm="submitAddress"
        @cancel="toggleShow"
      />
    </div>
  </van-action-sheet>
  <!-- 用户购物车商品部分 -->
  <div class="no-shop" v-if="$store.state.User.myCar.isEmpty">
    <div class="empty-car"></div>
    <p class="empty-txt">购物车空空如也，去逛逛吧~</p>
    <div class="go-home">
      <img src="./images/goToHome.png" />
    </div>
  </div>
  <div class="car-items" v-else>
    <Shopitem
      v-for="item in $store.state.User.myCar.shops"
      :key="item.proid"
      :title="item.proname"
      :price="item.price"
      :showpic="item.showpic"
      :desc="item.detail"
      :quantity="item.quantity"
      :checked="item.checked"
      :proid="item.proid"
    />
  </div>
  <ShopsRecommend recommendTxt="可能您还想要" class="a" />
  <div class="border"></div>
  <!-- 总计部分 -->
  <van-submit-bar
    class="submitbar"
    :price="$store.state.User.myCar.tprice * 100"
    button-text="领劵结算"
    @submit="submitCar"
  >
    <input
      type="checkbox"
      v-model="$store.state.User.myCar.checkedAll"
      @click="checkall"
    />全选
  </van-submit-bar>
</template>

<script>
import Header2 from '@/components/Header/Header2.vue'
import Shopitem from './Shopitem'
import ShopsRecommend from '@/components/ShopPart/Shops_rec'
import { ref } from 'vue'
import { addAddress, setDefAddress } from '@/api'
import userStore from '@/store/user'
import store from '@/store'
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
export default {
  name: 'Car',
  components: { Header2, Shopitem, ShopsRecommend },
  setup() {
    // console.log('car')
    const currentId = ref(-1)
    const show = ref(false)
    const showArea = ref(false)
    const toggleShow = () => {
      show.value = !show.value
      showArea.value = !showArea.value
    }
    const showAddress = () => {
      if (!userStore.state.isLogin) Toast('请先登录')
      else {
        show.value = true
        currentId.value = userStore.state.addressList.current.id
      }
    }
    const editAdd = () => Toast('请去地址栏编辑')
    // 提交新地址
    const submitAddress = (result) => {
      let newaddress = ''
      result.forEach((n) => (newaddress += n.name))
      let data = {
        userid: userStore.state.user.userid,
        name: userStore.state.user.username,
        phone: userStore.state.user.phone,
        address: newaddress,
        code: result[2].code,
      }
      addAddress(data)
      toggleShow()
    }
    // 更改默认地址
    const changeDef = (e) => {
      if (e.id == userStore.state.addressList.current.id) return
      let data = {
        userid: userStore.state.user.userid,
        receiptid: e.id,
      }
      setDefAddress(data)
    }
    // 结算购物车
    const submitCar = () => {
      console.log('结算')
    }
    const checkall = (e) => {
      store.commit('User/modCarCheckedAll', e.target.checked)
    }
    return {
      currentId,
      show,
      showArea,
      areaList,
      toggleShow,
      showAddress,
      editAdd,
      submitAddress,
      changeDef,
      submitCar,
      checkall,
    }
  },
}
</script>

<style lang="less" scoped>
.van-cell {
  border-top: 1px solid #ccc;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-bottom: 14px;
}
.no-shop {
  padding: 70px 0 0px;
  text-align: center;
  .empty-car {
    display: inline-block;
    width: 90px;
    height: 90px;
    background: url('./images/no-shop.png') no-repeat;
    background-size: 90px;
  }
  .go-home {
    padding: 40px 20px 0px 8px;
    img {
      width: 100%;
    }
  }
}
.car-items {
  overflow: hidden;
  border-radius: 18px;
}
.border {
  border: 1px solid transparent;
  margin-top: 50px;
}
.submitbar {
  bottom: 49px;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
