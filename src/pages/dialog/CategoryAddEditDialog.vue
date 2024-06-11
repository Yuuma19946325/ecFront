
<script setup lang="ts">
import { ref, SetupContext, watch } from "vue";
import { Category, useCategoryStore } from "../../shared/stores/category-store";

import { commonDialog } from "./CommonDialog";

const categoryStore = useCategoryStore();

const props = defineProps({
  dialogOpen: Boolean,
  editCategoryId: number | null
});

const emits = defineEmits(['update:dialogOpen']);

const { localDialogOpen, closeDialog } = commonDialog(props, { emit: emits } as SetupContext);

const buttonLabel = ref('追加');
const textValue = ref<string>("");

watch(
    () => props.editCategoryId,
    (newVal) => {
        if(newVal){
            const category:Category | undefined = categoryStore.ggetCategory(newVal)
            textValue.value = category?.categoryName || ""
            buttonLabel.value = "編集"
        }else{
            textValue.value = ""
            buttonLabel.value = "追加"
        }
    }
  )
  
const addEdit = () => {
    console.log(textValue.value);
}

</script>

<template>
    <q-dialog v-model="localDialogOpen" persistent>
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                    <label v-if="editCategoryId">カテゴリ追加</label>
                    <label v-else>カテゴリ編集</label>
                </div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeDialog" />
            </q-card-section>
            <q-card-section>
                <q-input v-model="textValue" label="カテゴリ名" filled />
            </q-card-section>
            <q-card-section class="row justify-end q-pt-none">
                <q-btn color="primary" :label="buttonLabel" @click="addEdit()" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
</style>