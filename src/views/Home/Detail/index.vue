<template>
  <div class="detail-container">
    <div class="img-part">
      <div class="img-num">
        {{ index + 1 }}
        <span style="font-size: 12px">
          / {{ $store.state.Shop.current.pics.length }}
        </span>
      </div>
      <van-swipe class="my-swipe" :show-indicators="false" @change="modindex">
        <van-swipe-item
          v-for="(pic, i) in $store.state.Shop.current.pics"
          :key="i"
        >
          <img :src="pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="price-part">
      <van-submit-bar
        :price="$store.state.Shop.current.info.price * 100"
        label="单价"
        :suffix-label="' ￥' + $store.state.Shop.current.info.yprice"
        text-align="left"
      >
        <template #button>
          <div class="icon-prompt">
            <van-icon name="refund-o" size="20" />
            <div class="title">降价提醒</div>
          </div>
          <div class="icon-prompt">
            <van-icon name="like" size="20" color="#ee0a24" />
            <div class="title">收藏</div>
          </div>
        </template>
      </van-submit-bar>
    </div>
    <div class="shop-info">
      <div class="ads"><span class="tag">HB超市</span>一站式屯生活好物</div>
      <div class="title">
        <span class="tag">自营</span>
        <span class="proname">
          {{ $store.state.Shop.current.info.proname }}
        </span>
      </div>
      <div class="desc">
        {{ $store.state.Shop.current.info.detail }}
      </div>
    </div>
    <div class="insurance">
      <img src="../MyHome/images/easy_buy.png" />
      <span>效期无忧· 破损包退换· 闪电退款· 上门换新</span>
      <van-icon name="weapp-nav" size="16" />
    </div>
    <div class="cut">
      <span style="font-weight: 700; padding-right: 16px">优惠</span>
      <div class="content">
        <div class="row">
          <span class="tag">多买优惠</span>
          <span class="info">满两件，总价8折</span>
        </div>
        <div class="row">
          <span class="tag">换购</span>
          <span class="info">购买1件可优惠换购热销商品</span>
        </div>
        <div class="row">
          <span class="tag">换购</span>
          <span class="info">购买1件可优惠换购热销商品</span>
        </div>
      </div>
      <div class="dot"><van-icon name="weapp-nav" size="14" /></div>
    </div>
    <div class="item-floor">
      <div class="row">
        <span style="font-weight: 700; padding-right: 16px">已选</span>
        <span class="text">酸菜巧克力味，1个</span>
        <van-icon name="weapp-nav" size="14" />
      </div>
      <div class="row">
        <span style="font-weight: 700; padding-right: 16px">送至</span>
        <span class="text">{{
          $store.state.User.addressList.current.address
        }}</span>
        <van-icon name="weapp-nav" size="14" />
      </div>
    </div>
    <div class="footer">
      <ul class="server">
        <li><van-icon name="passed" color="#f44933" />99元免基础运费</li>
        <li><van-icon name="passed" color="#f44933" />HB超市发货&售后</li>
        <li>
          <van-icon name="warning-o" color="#bebebe" />
          7天无理由退货（一次性包装破损不支持）
        </li>
        <li><van-icon name="passed" color="#f44933" />准时送达</li>
        <li><van-icon name="passed" color="#f44933" />211限时达</li>
        <li><van-icon name="passed" color="#f44933" />预约送货</li>
        <li><van-icon name="passed" color="#f44933" />部分收货</li>
      </ul>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="shop-o" color="#f22f15" text="店铺" />
      <van-action-bar-icon
        icon="cart-o"
        :badge="$store.state.User.myCar.tnum"
        text="购物车"
      />
      <van-action-bar-button type="danger" text="加入购物车" />
      <van-action-bar-button type="warning" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import { getProductDetail } from '@/api'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: 'Detail',
  setup() {
    let index = ref(0)
    const route = useRoute()
    const modindex = (e) => {
      index.value = e
    }
    getProductDetail(route.query.proid)
    return { index, modindex }
  },
}
</script>

<style lang="less" scoped>
.detail-container {
  font-size: 13px;
  color: #333;
  .img-part {
    position: relative;
    width: 375px;
    height: 375px;
    background-color: #fff;
    img {
      width: 100%;
    }
    .img-num {
      position: absolute;
      right: 0;
      bottom: 30px;
      padding: 4px 10px;
      border-radius: 10px 0 0 10px;
      background-color: #cbcbcb;
      font-size: 14px;
      color: #fff;
      z-index: 2;
    }
  }
  .price-part {
    position: relative;
    width: 100%;
    height: 50px;
    .van-submit-bar {
      position: absolute;
      top: 0;
      left: 0;
    }
    .icon-prompt {
      padding: 0 7px;
      text-align: center;
      font-size: 12px;
    }
  }
  .shop-info {
    padding: 0 16px 12px 16px;
    background-color: #fff;
    .tag {
      border-radius: 5px;
      padding: 2px 4px;
      margin-right: 10px;
      background: linear-gradient(to right, #f43a32, #ff6730);
      color: #fff;
      font-size: 12px;
    }
    .title {
      padding: 12px 0 18px;
      .proname {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .desc {
      padding-right: 30px;
      height: 37px;
      overflow: hidden;
      text-overflow: clip;
    }
  }
  .insurance {
    display: flex;
    align-items: center;
    padding: 12px 15px 12px 10px;
    background-color: #fbf0fd;
    color: #e93b3d;
    img {
      width: 70px;
      height: 13px;
      margin-right: 4px;
    }
    .van-icon {
      flex: 1;
      padding-top: 2px;
      text-align: center;
    }
  }
  .cut {
    margin: 20px 0;
    padding: 20px 24px 10px 16px;
    display: flex;
    border-radius: 12px;
    background-color: #fff;
    .content {
      flex: 1;
      .row {
        padding-bottom: 10px;
        .tag {
          margin-right: 5px;
          padding: 0 2px;
          border: 1px solid #e4393c;
          color: #e4393c;
          font-size: 12px;
        }
      }
    }
  }
  .item-floor {
    margin: 10px 0;
    padding: 10px 24px 10px 16px;
    border-radius: 12px;
    background-color: #fff;
    .row {
      display: flex;
      padding: 18px 0;
      .text {
        flex: 1;
      }
    }
  }
  .footer {
    height: 200px;
    .server {
      height: 100%;
      padding: 10px 30px 10px 16px;
      background-color: #f2f2f2;
      color: #8c8c8c;
      font-size: 12px;
      li {
        float: left;
        padding: 3px 0;
        margin-right: 14px;
        .van-icon {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
