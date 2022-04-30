<template>
  <van-search shape="round" placeholder="搜索我的订单" />
  <van-tabs>
    <van-tab title="全部">
      <lazy-component
        v-for="(items, i) in $store.state.User.myOrder.orders"
        :key="i"
      >
        <div class="my-orders">
          <div class="order-items">
            <div class="title">
              <div class="left">HBmar专卖店</div>
              <div class="right" style="color: #999999; font-size: 14px">
                <span>完成</span> | <van-icon name="delete-o" />
              </div>
            </div>
            <van-card
              v-for="(item, i) in items"
              :key="i"
              class="item"
              :price="item.price"
              :title="item.proname"
              :thumb="item.showpic"
            >
              <template #desc>
                <div class="content">
                  <div class="desc">
                    {{ item.detail }}
                  </div>
                  <div class="num">x {{ item.quantity }}</div>
                </div>
              </template>
              <template #num> 实付：{{ item.price * item.quantity }}</template>
              <template #footer>
                <van-button round color="#333" plain size="mini">
                  评价晒单
                </van-button>
                <van-button round color="#f2270c" plain size="mini">
                  再次购买
                </van-button>
              </template>
            </van-card>
          </div>
        </div>
      </lazy-component>
    </van-tab>
    <van-tab title="待付款">待付款</van-tab>
    <van-tab title="待收货">待收货</van-tab>
    <van-tab title="已完成">已完成</van-tab>
  </van-tabs>
</template>

<script>
import { getOrder } from '@/api'
import userstore from '@/store/user'
export default {
  name: 'Order',
  setup() {
    const handler = (e) => {
      console.log(e)
    }
    setTimeout(() => {
      if (userstore.state.firstGetOrders) getOrder(userstore.state.user.userid)
    }, 200)
    return { handler }
  },
}
</script>

<style lang="less" scoped>
:deep(.van-tabs__content) {
  margin-top: 20px;
}
.my-orders {
  padding: 0 10px;
  .order-items {
    margin-bottom: 10px;
    border-radius: 12px;
    background-color: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 8px 10px;
    }
    .item {
      margin: 0;
      font-size: 13px;
      .content {
        display: flex;
        .desc {
          flex: 1;
        }
        .num {
          text-align: right;
          width: 36px;
          line-height: 48px;
        }
      }
      :deep(.van-card__footer) {
        padding: 10px 0;
        .van-button {
          font-size: 14px;
          height: 30px;
          width: 80px;
        }
      }
    }
  }
}
</style>
