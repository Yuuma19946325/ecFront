<script setup lang="ts">
import { ref, type SetupContext, watch } from "vue";
import { type Category, useCategoryStore } from "../../shared/stores/category-store";

import { commonDialog } from "./CommonDialog";

const categoryStore = useCategoryStore();

// ダイアログの開閉状態
const dialogOpen = ref<boolean>(false);

const editCategoryId = ref<number | null>(null);
const textValue = ref<string>("");

// ダイアログを開くメソッド
const open = (categoryId?:number): void => {
    dialogOpen.value = true;
    editCategoryId.value = categoryId || null;

    if(categoryId){
        const categoryName:string = categoryStore.getCategoryNameById(categoryId)
        textValue.value = categoryName
    }else{
        textValue.value = ""
    }
}

const addEdit = () => {
    if(editCategoryId.value){
        categoryStore.update(editCategoryId.value,{ categoryId:editCategoryId.value, categoryName:textValue.value})
    }else{
        categoryStore.add({ categoryName:textValue.value})
    }

    dialogOpen.value = false;
}

// コンポーネントのメソッドを公開
defineExpose({
    open
});
</script>

<template>
    <q-dialog v-model="dialogOpen" persistent>
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                    <label v-if="!editCategoryId">カテゴリ追加</label>
                    <label v-else>カテゴリ編集</label>
                </div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogOpen = false" />
            </q-card-section>
            <q-card-section>
                <q-input v-model="textValue" label="カテゴリ名" filled />
            </q-card-section>
            <q-card-section class="row justify-end q-pt-none">
                <q-btn color="primary" v-if="!editCategoryId" label="追加" @click="addEdit()" />
                <q-btn color="secondary" v-else label="編集" @click="addEdit()" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
</style>