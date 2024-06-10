<script setup lang="ts">
import { SetupContext } from 'vue';
import { commonDialog } from './CommonDialog';
import { ref } from 'vue';
import { useCategoryStore, type Category } from '../../shared/stores/category-store';


const categoryStore = useCategoryStore()

const props = defineProps({
  dialogOpen: Boolean
});

const emits = defineEmits(['update:dialogOpen']);

const { localDialogOpen, closeDialog } = commonDialog(props, { emit: emits } as SetupContext);

// 初期データ
const operationItems = ref<Category[]>(categoryStore.getCategoryOperationList);
const stopItems = ref<Category[]>(categoryStore.getCategoryStopList);

// 選択されたアイテムのトラッキング
const selected = ref({
  operation: null as Category | null,
  stop: null as Category | null
});

// アイテム選択ハンドラ
const selectItem = (item, type) => {
  selected.value[type] = item;
}

// アイテム移動ハンドラ
const moveSelectedToStop = () => {
  if (selected.value.operation !== null) {
    stopItems.value.push(selected.value.operation);
    categoryStore.delete(selected.value.operation.categoryId)
    operationItems.value = operationItems.value.filter(item => item !== selected.value.operation);
    selected.value.operation = null;
  }
}

const moveSelectedToOperation = () => {
  if (selected.value.stop !== null) {
    operationItems.value.push(selected.value.stop);
    categoryStore.update(selected.value.stop.categoryId, { categoryId:selected.value.stop.categoryId,categoryName:selected.value.stop.categoryName, deleteFlag:false})
    stopItems.value = stopItems.value.filter(item => item !== selected.value.stop);
    selected.value.stop = null;
  }
}
</script>

<template>
    <q-dialog v-model="localDialogOpen" persistent>
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">カテゴリ管理</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="closeDialog" />
            </q-card-section>

            <q-card-section>
                <div class="picklist">
                    <div class="picklist-container">
                        <h5>稼働中</h5>
                        <ul class="item-list">
                            <li 
                            v-for="item in operationItems" 
                            :key="item.categoryId" 
                            @click="selectItem(item, 'operation')"
                            :class="{ 'selected-item': selected.operation?.categoryId === item.categoryId }"
                            >
                            {{ item.categoryName }}
                            </li>
                            <li v-if="operationItems.length === 0" class="empty-placeholder">No Items</li>
                        </ul>
                    </div>
                    <div class="picklist-actions">
                    <button @click="moveSelectedToStop">></button>
                    <button @click="moveSelectedToOperation"><</button>
                    </div>
                    <div class="picklist-container">
                        <h5>停止中</h5>
                        <ul class="item-list">
                            <li 
                            v-for="item in stopItems" 
                            :key="item.categoryId" 
                            @click="selectItem(item, 'stop')"
                            :class="{ 'selected-item': selected.stop?.categoryId === item.categoryId }"
                            >
                            {{ item.categoryName }}
                            </li>
                            <li v-if="stopItems.length === 0" class="empty-placeholder">No Items</li>
                        </ul>
                        </div>
                    </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.picklist {
    height: 400px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.picklist-container {
    width: 50%;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    height: 350px;
}

.picklist-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: center;
    align-items: center;
    height: 350px; 
}

button {
    margin: 5px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.item-list {
    flex: 1;
    margin: 0;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
}

li {
    padding: 5px;
    border: 1px solid #ccc;
    margin: 5px 0;
    cursor: pointer;
}

li:hover {
    background-color: #eee;
}

.empty-placeholder {
    text-align: center;
    color: #aaa;
    padding: 10px 0;
}

/* 選択中のアイテムに色を付ける */
.selected-item {
    background-color: #d3e9ff;
    border-color: #80bfff;
}
</style>