<template>
  <div class="category" :style="{ minHeight: getH + 'px' }">
    <div class="left-nav" :style="{ height: getH + 'px' }">
      <van-sidebar v-model="active" @change="changenav">
        <van-sidebar-item title="数码产品" />
        <van-sidebar-item title="精品图书" />
        <van-sidebar-item title="时尚穿搭" />
        <van-sidebar-item title="美食甜品" />
        <van-sidebar-item title="家用电器" />
      </van-sidebar>
    </div>
    <div class="content" :style="{ maxHeight: getH + 'px' }">
      <div v-show="current[0]" class="cate digital">
        <div class="title">品牌手机</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.digital.iconName.length"
              :key="value"
              :icon="require(`./images/${value}.png`)"
              :text="$store.state.Shop.digital.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'digital' } }"
            />
          </van-grid>
        </div>
        <div class="title">电脑办公</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.digital.iconName2.length"
              :key="value"
              :icon="require(`./images/数码${value}.png`)"
              :text="$store.state.Shop.digital.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'digital' } }"
            />
          </van-grid>
        </div>
      </div>
      <div v-show="current[1]" class="cate books">
        <div class="title">热门分类</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.books.iconName.length"
              :key="value"
              :icon="require(`./images/书${value}.webp`)"
              :text="$store.state.Shop.books.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'books' } }"
            />
          </van-grid>
        </div>
      </div>
      <div v-show="current[2]" class="cate cloths">
        <div class="title">时尚穿搭</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.cloths.iconName.length"
              :key="value"
              :icon="require(`./images/穿搭${value}.webp`)"
              :text="$store.state.Shop.cloths.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'cloths' } }"
            />
          </van-grid>
        </div>
        <div class="title">风格馆</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.cloths.iconName2.length"
              :key="value"
              :icon="require(`./images/穿搭风格${value}.webp`)"
              :text="$store.state.Shop.cloths.iconName2[value - 1]"
              :to="{ name: 'cate', query: { cate: 'cloths' } }"
            />
          </van-grid>
        </div>
      </div>
      <div v-show="current[3]" class="cate food">
        <div class="title">美食甜品</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.food.iconName.length"
              :key="value"
              :icon="require(`./images/食品${value}.webp`)"
              :text="$store.state.Shop.food.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'food' } }"
            />
          </van-grid>
        </div>
      </div>
      <div v-show="current[4]" class="cate device">
        <div class="title">家用电器</div>
        <div class="items">
          <van-grid :column-num="3" icon-size="70px">
            <van-grid-item
              v-for="value in $store.state.Shop.device.iconName.length"
              :key="value"
              :icon="require(`./images/家电${value}.webp`)"
              :text="$store.state.Shop.device.iconName[value - 1]"
              :to="{ name: 'cate', query: { cate: 'device' } }"
            />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
export default {
  name: 'MyCategory',
  setup() {
    const active = ref(0)
    const current = reactive([true, false, false, false, false])
    const changenav = (index) => {
      current.forEach((v, i) => (current[i] = false))
      current[index] = true
    }
    const getH = computed(() => {
      return window.innerHeight - 96
    })
    return { active, current, getH, changenav }
  },
}
</script>

<style lang="less" scoped>
.category {
  display: flex;
  .left-nav {
    background-color: #f7f8fa;
  }
  .content {
    overflow: auto;
    flex: 1;
    background-color: #fff;
    .cate {
      height: 100%;
      display: flex;
      flex-direction: column;
      .title {
        padding: 10px 0;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        font-style: italic;
      }
      .items {
        flex: 1;
      }
    }
  }
}
</style>
