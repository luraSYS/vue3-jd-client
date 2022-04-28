<template>
  <div class="user-container">
    <Header2 title="我的HBmark" />
    <div class="header-part">
      <div class="user-info">
        <div class="user-left">
          <img v-if="!isLogin" :src="require('./images/user-no.jpg')" />
          <img v-else :src="user.userpic" />
        </div>
        <div class="user-right">
          <div class="r-top">{{ user.username }}</div>
          <div class="r-down">
            <span class="ditem" @click="toLogin" v-show="!isLogin"
              ><van-icon size="16" name="user-circle-o" /> 点击登录</span
            >
            <span class="ditem" v-show="isLogin"> 开启小白特权</span>
            <span class="ditem" v-show="isLogin"> 我的vip值</span>
          </div>
          <van-popover
            v-if="isLogin"
            v-model:show="showPopover"
            placement="bottom-end"
            :actions="actions"
            @select="onSelect"
            :offset="[10, -10]"
          >
            <template #reference>
              <van-icon class="set" name="setting-o" color="#fff" size="23" />
            </template>
          </van-popover>
        </div>
      </div>
      <div class="my-track">
        <div class="track-content">
          <div>
            <div class="up">{{ user.collection_pro }}</div>
            <div class="down">商品收藏</div>
          </div>
          <div>
            <div class="up">{{ user.collection_shops }}</div>
            <div class="down">店铺收藏</div>
          </div>
          <div>
            <div class="up">{{ user.my_track }}</div>
            <div class="down">我的足迹</div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-orders">
      <van-grid>
        <van-grid-item icon="debit-pay" text="待付款" />
        <van-grid-item icon="send-gift-o" text="待收货" />
        <van-grid-item icon="balance-pay" text="退换/售后" />
        <van-grid-item icon="orders-o" text="全部订单" icon-color="#ee6370" />
      </van-grid>
    </div>
    <div class="my-cut">
      <div class="cut-content">
        <div>
          <div class="up">{{ user.coupon }}</div>
          <div class="down">优惠劵</div>
        </div>
        <div style="position: relative">
          <div class="message">立减40元</div>
          <div class="up" style="font-size: 13px">开通有礼</div>
          <div class="down">白条</div>
        </div>
        <div>
          <div class="up">{{ user.vip_point }}</div>
          <div class="down">VIP点</div>
        </div>
        <div>
          <div class="up">{{ user.hongbao }}</div>
          <div class="down">红包</div>
        </div>
        <div>
          <van-icon class="up" size="27" name="balance-o" color="#ee6370" />
          <div class="down">￥{{ user.account }}</div>
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="title">工具与服务</div>
      <van-grid :column-num="4" icon-size="36">
        <van-grid-item :icon="require('./images/1.webp')" text="客户服务" />
        <van-grid-item :icon="require('./images/2.webp')" text="我的预约" />
        <van-grid-item :icon="require('./images/3.webp')" text="我的问答" />
        <van-grid-item :icon="require('./images/4.webp')" text="闲置换钱" />
        <van-grid-item :icon="require('./images/5.webp')" text="高价回收" />
        <van-grid-item :icon="require('./images/6.webp')" text="聚划算" />
        <van-grid-item :icon="require('./images/7.webp')" text="签到有礼" />
        <van-grid-item :icon="require('./images/8.webp')" text="领劵中心" />
      </van-grid>
    </div>
    <ShopsRecommend recommendTxt="为你推荐" />
  </div>
</template>

<script>
import Header2 from '@/components/Header/Header2.vue'
import Shop from '@/components/ShopPart/Shop'
import ShopsRecommend from '@/components/ShopPart/Shops_rec'
import { mapState } from 'vuex'
import userStore from '@/store/user'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { ref } from 'vue'
export default {
  name: 'User',
  components: { Shop, Header2, ShopsRecommend },
  setup() {
    // console.log('User')
    const router = useRouter()
    const showPopover = ref(false)
    const actions = [
      { path: '/account', text: '个人中心', icon: 'flower-o' },
      { path: '/account/order', text: '我的订单', icon: 'orders-o' },
      { path: '/address', text: '我的地址', icon: 'logistics' },
    ]
    const onSelect = (action) => {
      router.push({ path: action.path })
    }
    const toLogin = () => {
      router.push({ path: '/mine/login' })
    }
    setTimeout(() => {
      if (!userStore.state.isLogin) Toast('请前往登录')
    }, 200)
    return {
      actions,
      showPopover,
      onSelect,
      toLogin,
    }
  },
  computed: {
    ...mapState('User', ['user', 'isLogin']),
  },
}
</script>

<style lang="less" scoped>
.user-container {
  .header-part {
    position: relative;
    height: 150px;
    padding: 10px 20px;
    background: linear-gradient(to right, #ff485b, #f83f2d);
    font-size: 12px;
    .user-info {
      display: flex;
      .user-left {
        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
      }
      .user-right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 20px;
        color: #fff;
        flex: 1;
        .r-top {
          font-size: 16px;
        }
        .ditem {
          padding: 4px 10px;
          background-color: rgba(0, 0, 0, 0.16);
          border-radius: 10px;
          margin-right: 10px;
        }
        .set {
          position: absolute;
          top: 16px;
          right: 15px;
        }
      }
    }
    .my-track {
      margin: 10px 0;
      .track-content {
        display: flex;
        text-align: center;
        > div {
          flex: 1;
          font-size: 13px;
          color: #fff;
          .up {
            width: 100%;
            height: 30px;
            line-height: 30px;
            font-weight: 700;
            font-size: 16px;
          }
        }
      }
    }
  }
  .my-orders {
    overflow: hidden;
    border-radius: 12px;
  }
  .my-cut {
    margin: 10px 0;
    padding: 10px 0 18px;
    background-color: #fff;
    border-radius: 12px;
    .cut-content {
      display: flex;
      text-align: center;
      > div {
        width: 25%;
        font-size: 12px;
        .message {
          position: absolute;
          padding: 0px 4px;
          top: -6px;
          right: -5px;
          border-radius: 10px;
          border-bottom-left-radius: 0;
          background: linear-gradient(to right, #ea4345, #fc8c6e);
          color: #fff;
        }
        .up {
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-weight: 700;
          font-size: 19px;
        }
      }
    }
  }
  .tools {
    overflow: hidden;
    margin: 16px 0px;
    border-radius: 12px;
    background-color: #fff;
    .title {
      padding: 10px 20px;
      font-weight: 700;
    }
  }
}
</style>
