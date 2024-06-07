<script setup lang="ts">
import { useCategoryStore, type Category } from '@/shared/stores/category-store';
import { useCounterStore } from '@/shared/stores/counter';
import { useErrorResponseStore } from '@/shared/stores/error-response-store';
import { useGoodsStore, type Goods } from '@/shared/stores/goods-store';
import { computed } from 'vue';

const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()
const counterStore = useCounterStore()
const errorResponseStore = useErrorResponseStore()

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
</template>
