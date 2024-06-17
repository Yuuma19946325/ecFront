<script setup lang="ts">
import { useCategoryStore, watchCategoryList, type Category } from '@/shared/stores/category-store';
import { ref } from 'vue';


const categoryStore = useCategoryStore()

const model = ref<number | null>(null);
const options = ref<Category[]>(categoryStore.getCategoryOperationList);

watchCategoryList((newValue: Category[], oldValue: Category[]) => {
    options.value = categoryStore.getCategoryOperationList;
});
</script>

<template>
    <div class="category-select-box">
        <q-select v-model="model" :options="options" option-label="categoryName" option-value="categoryId" label="カテゴリ名"></q-select>
    </div>
</template>

<style scoped>
.category-select-box{
    width: 20rem;
}
</style>