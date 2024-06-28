<script setup lang="ts">
import { Goods, useGoodsStore } from '@/shared/stores/goods-store';
import { ref } from 'vue';

const goodsStore = useGoodsStore();

// ダイアログの開閉状態
const dialogOpen = ref<boolean>(false);

const goods = ref<Goods>(new Object() as Goods);

// ダイアログを開くメソッド
const open = (goodsId:number): void => {
    dialogOpen.value = true;

    goods.value = goodsStore.getGoodsById(goodsId);
}

const goodsDelete = (): void => {
    goodsStore.delete(goods.value?.goodsId);
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
                    <label>商品削除</label>
                </div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogOpen = false" />
            </q-card-section>
            <q-card-section>
                <label>商品名:<label class="color">{{ goods?.goodsName }}</label><br>を削除しても宜しいですか？</label>
            </q-card-section>
            <q-card-section class="row justify-end q-pt-none">
                <q-space />
                <q-btn class="action-button" color="primary" label="はい" @click="goodsDelete" />
                <q-space />
                <q-btn class="action-button" color="secondary" label="いいえ" @click="dialogOpen = false" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.color{
    color: red;
}

.q-card-section {
    display: flex;
    align-items: center;
}

.action-button {
    width: 80px; /* Adjust the width as needed */
    min-width: 80px;
    max-width: 80px;
    font-size: 14px; /* Adjust the font size as needed */
    height: 32px; /* Adjust the height as needed */
    padding: 4px 8px; /* Adjust the padding as needed */
}
</style>