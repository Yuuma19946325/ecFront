<script setup lang="ts">
import { useCategoryStore, watchCategoryList, type Category } from '@/shared/stores/category-store';
import { ref, watch } from 'vue';

const categoryStore = useCategoryStore();

const emit = defineEmits(['categoryId']);

const model = ref<Category | null>(null);
const options = ref<Category[]>(categoryStore.getCategoryOperationList);

watch(model, (newValue: Category | null) => {
   emit('categoryId', newValue?.categoryId);
});

watchCategoryList((newValue: Category[], oldValue: Category[]) => {
    options.value = categoryStore.getCategoryOperationList;
});
</script>

<template>
    <div class="category-select-box">
        <q-select v-model="model" :options="options" option-label="categoryName" option-value="categoryId" label="カテゴリ" clearable></q-select>
    </div>
</template>

<style scoped>
.category-select-box{
    width: 15rem;
}
</style>