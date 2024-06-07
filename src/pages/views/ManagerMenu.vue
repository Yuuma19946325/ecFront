<script setup lang="ts">
import { ref } from 'vue'
import CategoryDialog from '../dialog/CategoryDialog.vue'

const categoryDialogOpen = ref<boolean>(false);
</script>

<template>
  <div class="admin-menu">
    <div class="title">管理者メニュー</div>
    <div class="buttons">
      <q-btn color="primary" class="large-btn" label="商品管理" />
      <q-btn color="secondary" class="large-btn" label="カテゴリ管理" @click="categoryDialogOpen = true"/>
      <q-btn color="white" text-color="black" class="large-btn" label="注文管理" />
    </div>
  </div>
  <CategoryDialog :dialogOpen="categoryDialogOpen" @update:dialogOpen="categoryDialogOpen = $event"></CategoryDialog>
</template>

<style scoped>
.admin-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  gap: 20px;
}

.large-btn {
  font-size: 18px;
  padding: 20px 40px;
}
</style>
