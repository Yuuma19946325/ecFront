<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCounterStore } from './shared/stores/counter'
import { useGoodsStore, type Goods } from './shared/stores/goods-store'
import Header from './pages/components/Header.vue'
import Footer from './pages/components/Footer.vue'
import { useCategoryStore, type Category } from './shared/stores/category-store'

const counterStore = useCounterStore()
const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()

// 画面起動時に実行される処理
onMounted(() => {
  // 商品情報を取得
  goodsStore.increment()
  // カテゴリ情報を取得
  categoryStore.increment()
})

const count = computed((): number => {
  return counterStore.count
})

const doubleCount = computed((): number => {
  return counterStore.doubleCount
})

const aaa = computed((): Goods[] => {
  return goodsStore.getGoodsList
})

const bbb = computed((): Category[] => {
  return categoryStore.getCategoryList
})

const onIncrementClick2 = (category: Category) => {
  categoryStore.add(category)
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
    <p>テスト: {{ categoryStore.getCategoryList }}</p>
    <p>テスト: {{ categoryStore.$state.categoryList }}</p>
    <p>count: {{ count }}</p>
    <button v-on:click="onIncrementClick2({ categoryName: 'テスト' })">加算</button>
  </main>
  <Footer />
</template>

<style scoped></style>
