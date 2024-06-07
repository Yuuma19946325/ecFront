<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useGoodsStore } from './shared/stores/goods-store'
import Header from './pages/components/Header.vue'
import Footer from './pages/components/Footer.vue'
import { useCategoryStore } from './shared/stores/category-store'

const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()

// lang属性を設定
useHead({
  htmlAttrs: {
    lang: 'ja'
  }
})

// 画面起動時に実行される処理
onMounted(() => {
  // 商品情報を取得
  goodsStore.increment()
  // カテゴリ情報を取得
  categoryStore.increment()
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <RouterView />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<style scoped></style>
