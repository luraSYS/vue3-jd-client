<template>
  <div class="checkstate">
    <div class="title">
      <van-icon name="checked" /><span style="margin-left: 5px">完成</span>
    </div>
    <van-button plain round color="#ff423f">再次购买</van-button>
  </div>
  <div class="order-desc">
    <div class="top">
      <van-cell
        icon="logistics"
        title="订单已完成配送，感谢您选择HBMark，期待再次为您服务"
        is-link
        :label="orders[0].time"
        center
      />
    </div>
    <div class="bottom">
      <van-cell
        icon="location-o"
        :title="address.name + ' ' + address.tel"
        :label="address.address"
        center
      />
    </div>
  </div>
  <div class="my-orders">
    <div class="order-items">
      <div class="title">
        <div class="left" style="font-size: 14px">
          订单号：
          {{ orders[0].orderitemid }}
        </div>
        <div class="right" style="color: #999999; font-size: 12px">
          共计 {{ orders.length }} 件商品
        </div>
      </div>
      <van-card
        v-for="(item, i2) in orders"
        :key="i2"
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
        <template #footer>
          <van-button round color="#333" plain size="mini">
            卖了换钱
          </van-button>
          <van-button round color="#f2270c" plain size="mini">
            申请售后
          </van-button>
        </template>
      </van-card>
      <van-cell :title="orders[0].time" :value="'实付金额：' + tprice" />
    </div>
  </div>
  <ShopsRecommend recommendTxt="可能您还想要" />
</template>

<script>
import ShopsRecommend from '@/components/ShopPart/Shops_rec'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderDetail',
  components: { ShopsRecommend },
  setup() {
    const route = useRoute()
    const orders = JSON.parse(route.params.orders)
    const address = JSON.parse(route.params.address)
    const tprice = orders.reduce(
      (amt, i) => (amt += parseFloat(i.price) * i.quantity.toFixed(2)),
      0
    )
    return {
      orders,
      address,
      tprice,
    }
  },
}
</script>

<style lang="less" scoped>
.checkstate {
  padding: 30px 10px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ff423f;
  .title {
    margin-bottom: 15px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
  }
  .van-button {
    width: 130px;
    height: 36px;
  }
}
.order-desc {
  border-radius: 18px;
  overflow: hidden;
  .top {
    border-bottom: 1px solid #fafafa;
  }
  :deep(.van-cell__left-icon) {
    color: #cccccc;
    font-size: 23px;
  }
}
.my-orders {
  margin: 10px 0;
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
