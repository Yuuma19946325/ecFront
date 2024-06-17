<script setup lang="ts">
import { ref } from 'vue';
import CategoryDialog from '../dialog/CategoryDialog.vue';

// 子コンポーネントへの参照
const categoryDialogRef = ref<InstanceType<typeof CategoryDialog> | null>(null);

// 子コンポーネントのメソッドを呼び出す関数
const categoryDialogOpen = (): void => {
  categoryDialogRef.value?.open();
}
</script>


<template>
  <div class="admin-menu">
    <div class="title">管理者メニュー</div>
    <div class="buttons">
      <q-btn color="primary" class="large-btn" label="商品管理" @click="$router.push({ path: '/goodsManager' })"/>
      <q-btn color="secondary" class="large-btn" label="カテゴリ管理" @click="categoryDialogOpen"/>
      <q-btn color="white" text-color="black" class="large-btn" label="注文管理" />
    </div>
  </div>
  <CategoryDialog ref="categoryDialogRef"></CategoryDialog>
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
