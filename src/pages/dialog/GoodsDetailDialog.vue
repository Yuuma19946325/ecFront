<script setup lang="ts">
import { useGoodsStore, type Goods } from '@/shared/stores/goods-store';
import { ref } from 'vue';

const goodsStore = useGoodsStore();

// ダイアログの開閉状態
const dialogOpen = ref<boolean>(false);

const goods = ref<Goods | null>(null);

// ダイアログを開くメソッド
const open = (goodsId?:number): void => {
    dialogOpen.value = true;

    goods.value = goodsStore.getGoodsById(goodsId);
}

const columns = ref([
        { name: 'name', label: 'Name' },
        { name: 'age', label: 'Age' },
        { name: 'email', label: 'Email' },
]);

const rows = ref([
    { id: 1, name: 'John Doe', age: 25, email: 'john@example.com' },
]);

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
                    <label>商品詳細</label>
                </div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogOpen = false" />
            </q-card-section>
            <q-card-section>
                <q-page>
                    <div class="vertical-table">
                    <div v-for="column in columns" :key="column.name" class="vertical-header">
                        <div class="vertical-cell header-cell">{{ column.label }}</div>
                        <div v-for="row in rows" :key="row.id" class="vertical-cell row-cell">
                        {{ row[column.name] }}
                        </div>
                    </div>
                    </div>
                </q-page>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.vertical-table {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
}

.vertical-header {
    display: flex;
    flex-direction: row;
}

.vertical-cell {
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
}

.row-cell {
    min-width: 300px;
}

.header-cell {
    font-weight: bold;
    background-color: #f0f0f0;
    min-width: 150px;
}
</style>