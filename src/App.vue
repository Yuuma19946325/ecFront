<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCounterStore } from './shared/stores/counter'
import { useGoodsStore, type Goods } from './shared/stores/goods-store'
import Header from './pages/components/Header.vue'
import Footer from './pages/components/Footer.vue'

const counterStore = useCounterStore()
const goodsStore = useGoodsStore()

// 画面起動時に実行される処理
onMounted(() => {
  // 商品情報を取得
  goodsStore.increment()
})

const count = computed((): number => {
  return counterStore.count
})

const doubleCount = computed((): number => {
  return counterStore.doubleCount
})

const aaa = computed((): Goods[] => {
  return goodsStore.goodsList
})

const onIncrementClick2 = () => {
  goodsStore.increment()
}
</script>

<template>
  <Header />
  <main>
    <RouterView />
    <p>count: {{ count }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <p>doubleCount: {{ doubleCount }}</p>
    <p>テスト: {{ aaa }}</p>
    <p>count: {{ count }}</p>
    <button v-on:click="onIncrementClick2">加算</button>
  </main>
  <Footer />
</template>

<style scoped></style>
