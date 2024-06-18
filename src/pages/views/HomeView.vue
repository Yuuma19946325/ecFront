<script setup lang="ts">
import { useCategoryStore, type Category } from '@/shared/stores/category-store';
import { useErrorResponseStore } from '@/shared/stores/error-response-store';
import { useGoodsStore, type Goods } from '@/shared/stores/goods-store';
import { computed } from 'vue';

const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()
const errorResponseStore = useErrorResponseStore()

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
    <p>テスト: {{ aaa }}</p>
    <p>テスト1: {{ categoryStore.getCategoryList }}</p>
    <p>テスト2: {{ categoryStore.$state.categoryList }}</p>
    <p>テスト3: {{ categoryStore.getCategoryOperationList }}</p>
    <p>テスト4: {{ categoryStore.getCategoryStopList }}</p>
    <p>エラーレスポンス: {{ errorResponseStore.$state.errorResponse }}</p>
    <button v-on:click="add({ categoryName: 'テスト2' })">追加</button>
    <button v-on:click="update(36, { categoryName: 'テスト編集' })">編集</button>
    <button v-on:click="delete1(36)">削除</button>
</template>
