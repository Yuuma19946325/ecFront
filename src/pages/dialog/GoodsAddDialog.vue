<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import ImageUploader from '@/pages/components/ImageUploader.vue';
import CategorySelectBox from '@/pages/components/CategorySelectBox.vue';
import { useGoodsStore, type Goods } from '@/shared/stores/goods-store';

const goodsStore = useGoodsStore()

// ダイアログの開閉状態
const dialogOpen = ref<boolean>(false);

// ダイアログを開くメソッド
const open = (): void => {
    dialogOpen.value = true;
}

// バリデーションスキーマの定義
const schema  = yup.object<Goods>({
    image: yup.string().required('画像が設定されておりません'),
    goodsName: yup.string().required('商品名が入力されておりません'),
    categoryId: yup.string().required('カテゴリが選択されておりません'),
    amount: yup.number().required('金額が入力されておりません'),
    stock: yup.number().required('在庫が入力されておりません'),
    set: yup.number(),
    material: yup.string(),
    brand: yup.string(),
    theme: yup.string(),
    target: yup.number(),
    point: yup.number(),
});


// useFormフックの使用
const { handleSubmit, errors } = useForm({
    validationSchema: schema,
});

// 各フィールドの定義
const { value: image } = useField('image');
const { value: goodsName } = useField('goodsName');
const { value: categoryId } = useField('categoryId');
const { value: amount } = useField('amount');
const { value: stock } = useField('stock');
const { value: set } = useField('set');
const { value: material } = useField('material');
const { value: brand } = useField('brand');
const { value: theme } = useField('theme');
const { value: target } = useField('target');
const { value: point } = useField('point');

// フォーム送信ハンドラー
const onSubmit = handleSubmit((values) => {
    goodsStore.add(values as Goods);

    dialogOpen.value = false;
});

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
                    <label>商品追加</label>
                </div>
                <q-space />
                <q-btn icon="close" flat round dense @click="dialogOpen = false" />
            </q-card-section>
            <q-card-section>
                <q-page>
                    <div class="vertical-table">
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <ImageUploader @imageBase64="image = $event"/>
                                <div class="error-message">{{ errors.image }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="goodsName" type="text" id="goodsName" label="商品名" filled dense />
                                <div class="error-message">{{ errors.goodsName }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <CategorySelectBox @categoryId="categoryId = $event"/>
                                <div class="error-message">{{ errors.categoryId }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="amount" type="number" id="amount" label="金額" filled dense />
                                <div class="error-message">{{ errors.amount }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="stock" type="number" id="stock" label="在庫" filled dense />
                                <div class="error-message">{{ errors.stock }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="set" type="number" id="set" label="セット個数" filled dense />
                                <div class="error-message">{{ errors.set }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="material" type="text" id="material" label="材質" filled dense />
                                <div class="error-message">{{ errors.material }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="brand" type="text" id="brand" label="ブランド" filled dense />
                                <div class="error-message">{{ errors.brand }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="theme" type="text" id="theme" label="テーマ" filled dense />
                                <div class="error-message">{{ errors.theme }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="target" type="number" id="target" label="対象年齢" filled dense />
                                <div class="error-message">{{ errors.target }}</div>
                            </div>
                        </div>
                        <div class="vertical-header">
                            <div class="vertical-cell">
                                <q-input v-model="point" type="number" id="point" label="付与ポイント" filled dense />
                                <div class="error-message">{{ errors.point }}</div>
                            </div>
                        </div>
                    </div>
                </q-page>
            </q-card-section>
            <q-card-section class="row justify-end q-pt-none">
                <q-btn class="action-button" color="primary" label="新規追加" @click="onSubmit()" />
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
    min-width: 500px;
}

.error-message {
    color: red;
    font-size: 0.75rem;
    margin-top: 4px; /* エラーメッセージとの間隔を調整 */
}
</style>