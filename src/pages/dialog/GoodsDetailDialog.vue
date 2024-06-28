<script setup lang="ts">
import { useCategoryStore } from '@/shared/stores/category-store';
import { useGoodsStore, type Goods } from '@/shared/stores/goods-store';
import { ref } from 'vue';

const goodsStore = useGoodsStore();
const categoryStore = useCategoryStore();

// ダイアログの開閉状態
const dialogOpen = ref<boolean>(false);

const goods = ref<Goods | any>(null);

// ダイアログを開くメソッド
const open = (goodsId:number): void => {
    dialogOpen.value = true;

    goods.value = goodsStore.getGoodsById(goodsId);
}

const columns = ref([
    { name: 'image', label: '画像' },
    { name: 'goodsName', label: '商品名' },
    { name: 'categoryId', label: 'カテゴリ' },
    { name: 'amount', label: '金額' },
    { name: 'stock', label: '在庫' },
    { name: 'set', label: 'セット個数' },
    { name: 'material', label: '材質' },
    { name: 'brand', label: 'ブランド' },
    { name: 'theme', label: 'テーマ' },
    { name: 'target', label: '対象年齢' },
    { name: 'point', label: '付与ポイント' },
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
                            <div class="vertical-cell header-cell">
                                {{ column.label }}
                            </div>
                            <div class="vertical-cell row-cell">
                                <div v-if="'image' === column.name">
                                    <q-img
                                        :src="'data:image/jpeg;base64,' + goods?.[column.name]"
                                        alt="Converted Image" width="200px"
                                        height="200px" />
                                </div>
                                <div v-else-if="'categoryId' === column.name">
                                    {{ categoryStore.getCategoryNameById(goods?.[column.name]) }}
                                </div>
                                <div v-else>
                                    {{ goods?.[column.name] }}
                                </div>
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