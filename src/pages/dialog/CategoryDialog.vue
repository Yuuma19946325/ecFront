<script setup lang="ts">
import { SetupContext } from 'vue';
import { commonDialog } from './CommonDialog';

const props = defineProps({
  dialogOpen: Boolean
});

const emits = defineEmits(['update:dialogOpen']);

const { localDialogOpen, closeDialog } = commonDialog(props, { emit: emits } as SetupContext);
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
                <div class="main">
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<style scoped>
.main{
    height: 500px;
    width: 500px;
}
</style>