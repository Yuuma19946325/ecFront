<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCounterStore } from './shared/stores/counter'
import { useGoodsStore, type Goods } from './shared/stores/goods-store'
import Header from './pages/components/Header.vue'
import Footer from './pages/components/Footer.vue'
import { useCategoryStore, type Category } from './shared/stores/category-store'
import { useErrorResponseStore } from './shared/stores/error-response-store'

const counterStore = useCounterStore()
const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()
const errorResponseStore = useErrorResponseStore()

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

const add = (category: Category) => {
  categoryStore.add(category)
}
const update = (categoryId: number, category: Category) => {
  categoryStore.update(categoryId, category)
}
const delete1 = (categoryId: number) => {
  categoryStore.delete(categoryId)
}
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <RouterView />
      <p>count: {{ count }}</p>
      <p>doubleCount: {{ doubleCount }}</p>
      <p>doubleCount: {{ doubleCount }}</p>
      <p>テスト: {{ aaa }}</p>
      <p>テスト: {{ categoryStore.getCategoryList }}</p>
      <p>テスト: {{ categoryStore.$state.categoryList }}</p>
      <p>エラーレスポンス: {{ errorResponseStore.$state.errorResponse }}</p>
      <p>count: {{ count }}</p>
      <button v-on:click="add({ categoryName: 'テスト' })">追加</button>
      <button v-on:click="update(33, { categoryName: 'テスト2' })">編集</button>
      <button v-on:click="delete1(33)">削除</button>
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style scoped></style>
