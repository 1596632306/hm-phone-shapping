<template>
  <div class="order">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active">
      <van-tab name="all" title="全部"></van-tab>
      <van-tab name="payment" title="待支付"></van-tab>
      <van-tab name="delivery" title="待发货"></van-tab>
      <van-tab name="received" title="待收货"></van-tab>
      <van-tab name="comment" title="待评价"></van-tab>
    </van-tabs>
    <!-- <p v-for="i in orderList" :key="i.order_id">{{ i}}</p> -->

    <OrderListItem  v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs } from 'vant'
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
import { mapState } from 'vuex'
Vue.use(Tab)
Vue.use(Tabs)
export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      // 通过名称匹配van-tab , dataType
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  computed: {
    ...mapState('order', ['orderList', 'setMyorderList'])
  },
  methods: {
    // 获取订单列表
    async getOrderList () {
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      list.data.forEach((item) => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
</style>
