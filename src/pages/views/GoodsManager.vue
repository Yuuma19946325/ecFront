<script setup lang="ts">
import { computed, ref } from 'vue';
import { QPage, QTable, QInput } from 'quasar';
import { useGoodsStore, watchGoodsList, type Goods } from '@/shared/stores/goods-store';
import { useCategoryStore } from '@/shared/stores/category-store';

const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()

const columns = [
    { name: 'image', label: '画像', field: 'image', sortable: true },
    { name: 'goodsName', label: '商品名', field: 'goodsName', sortable: true },
    { name: 'categoryId', label: 'カテゴリ名', field: 'categoryId', sortable: true },
    { name: 'amount', label: '金額', field: 'amount', sortable: true },
    { name: 'stock', label: '在庫', field: 'stock', sortable: true },
    { name: 'set', label: 'セット個数', field: 'set', sortable: true },
];

const rows = ref<Goods[]>(goodsStore.getGoodsList);

const filter = ref<string>('');
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});
watchGoodsList((newValue: Goods[], oldValue: Goods[]) => {
    rows.value = newValue;
});
</script>

<template>
    <q-page class="q-pa-md">
        <q-table
        class="fixed-header-table"
        :rows="rows"
        :columns="columns"
        row-key="goodsName"
        :pagination.sync="pagination"
        :rows-per-page-options="[10, 20, 30]"
        :filter="filter"
        rows-per-page-label="ページ毎のレコード"
        >
        <template v-slot:top="props">
            <q-input
            round
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
            :clearable="true"
            />
        </template>
        <template v-slot:body-cell="props">
            <q-td :props="props">
                <div v-if="'image' === props.col.field">
                    <img :src="'data:image/jpeg;base64,' + props.row.image" alt="Converted Image">
                </div>
                <div v-else-if="'categoryId' === props.col.field">
                    {{ categoryStore.getCategoryNameById(props.row.categoryId) }}
                </div>
                <div v-else>
                    {{ props.row[props.col.field] }}
                </div>
            </q-td>
        </template>
        </q-table>
    </q-page>
</template>

<style scoped>
.fixed-header-table {
    height: 650px; /* テーブルの高さを調整 */
    overflow-y: auto; /* 垂直方向のスクロールを有効にする */
}
.fixed-header-table thead th {
    position: sticky;
    top: 0;
    background: white; /* 背景色を設定 */
    z-index: 1; /* ヘッダーをボディの上に表示 */
}
.fixed-header-table tbody td {
    text-align: left;
}
.q-page {
    max-width: 800px;
    margin: auto;
}
.fixed-header-table tbody td{
    text-align: right;
}
</style>