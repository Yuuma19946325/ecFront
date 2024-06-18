<script setup lang="ts">
import { computed, ref } from 'vue';
import { QPage, QTable, QInput } from 'quasar';
import { useGoodsStore, watchGoodsList, type Goods } from '@/shared/stores/goods-store';
import { useCategoryStore } from '@/shared/stores/category-store';
import CategorySelectBox from '@/pages/components/CategorySelectBox.vue';
import GoodsDetailDialog from '@/pages/dialog/GoodsDetailDialog.vue';
import GoodsDeleteDialog from '@/pages/dialog/GoodsDeleteDialog.vue';

// 子コンポーネントへの参照
const goodsDetailDialogRef = ref<InstanceType<typeof GoodsDetailDialog> | null>(null);
const goodsDeleteDialogRef = ref<InstanceType<typeof GoodsDeleteDialog> | null>(null);

const goodsStore = useGoodsStore()
const categoryStore = useCategoryStore()

const goodsList = ref<Goods[]>(goodsStore.getGoodsList);

const columns = [
    { name: 'image', label: '画像', field: 'image' },
    { name: 'goodsName', label: '商品名', field: 'goodsName', sortable: true },
    { name: 'categoryId', label: 'カテゴリ名', field: 'categoryId', sortable: true },
    { name: 'amount', label: '金額', field: 'amount', sortable: true },
    { name: 'stock', label: '在庫', field: 'stock', sortable: true },
    { name: 'set', label: 'セット個数', field: 'set', sortable: true },
    { name: 'detail', label: '詳細', field: 'detail'},
    { name: 'delete', label: '削除', field: 'delete'},
];
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

// 選択されたアイテムのトラッキング
const selected = ref<number | null>(null);

// 検索文字列
const searchGoodsName = ref<string | null>(null);
const searchCategoryId = ref<number | null>(null);

const rows = computed(() : Goods[] => {

    let filterGoodsList = goodsList.value;

    filterGoodsList = filterGoodsList.filter((goods) => {
        if (searchGoodsName.value) {
            return goods.goodsName.includes(searchGoodsName.value);
        }
        return true;
    });

    if (searchCategoryId.value) {
        filterGoodsList = filterGoodsList.filter((goods) => {
            return goods.categoryId === searchCategoryId.value;
        });
    }

    return filterGoodsList;
});

const goodsDetail = (goodsId?: number) => {
    goodsDetailDialogRef.value?.open(goodsId);
}

const goodsDelete = (goodsId?: number) => {
    goodsDeleteDialogRef.value?.open(goodsId);
}

watchGoodsList((newValue: Goods[], oldValue: Goods[]) => {
    goodsList.value = newValue;
});

</script>

<template>
    <q-page class="q-pa-md">
        <q-table
        class="fixed-header-table"
        :rows="rows"
        :columns="columns"
        :pagination.sync="pagination"
        :rows-per-page-options="[10, 20, 30]"
        rows-per-page-label="ページ毎のレコード"
        :separator="'cell'"
        >
        <template v-slot:top="props">
            <div class="input">
                <q-input
                round
                dense
                debounce="300"
                v-model="searchGoodsName"
                placeholder="商品名検索"
                :clearable="true"
                />
                <div class="select-box">
                    <CategorySelectBox @categoryId="searchCategoryId = $event"/>
                </div>
            </div>
        </template>
        <template v-slot:body-cell="props">
            <q-td :props="props" @click="selected = props.row?.goodsId" :class="{ 'selected-item': props.row?.goodsId === selected }">
                <div v-if="'image' === props.col.field">
                    <q-img :src="'data:image/jpeg;base64,' + props.row.image" alt="Converted Image" />
                </div>
                <div v-else-if="'categoryId' === props.col.field">
                    {{ categoryStore.getCategoryNameById(props.row.categoryId) }}
                </div>
                <div v-else-if="'detail' === props.col.field">
                    <q-btn
                        flat
                        round
                        dense
                        icon="style"
                        @click="goodsDetail(props.row?.goodsId)"
                    />
                </div>
                <div v-else-if="'delete' === props.col.field">
                    <q-btn
                        flat
                        round
                        dense
                        icon="delete"
                        @click="goodsDelete(props.row?.goodsId)"
                    />
                </div>
                <div v-else>
                    {{ props.row[props.col.field] }}
                </div>
            </q-td>
        </template>
        </q-table>
    </q-page>
    <GoodsDetailDialog ref="goodsDetailDialogRef"></GoodsDetailDialog>
    <GoodsDeleteDialog ref="goodsDeleteDialogRef"></GoodsDeleteDialog>
</template>

<style scoped>
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

.input{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.select-box{
    height: 4.5rem;
    margin-left: 15px;
}

/* 選択中のアイテムに色を付ける */
.selected-item {
    background-color: #d3e9ff;
    border-color: #80bfff;
}
</style>