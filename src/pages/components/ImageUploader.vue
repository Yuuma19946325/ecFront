<script setup lang="ts">
import { ref, watch } from 'vue';


const emit = defineEmits(['imageBase64']);

const base64 = ref<string | null>(null);

const onFileAdded = (files: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
            if (typeof reader.result === 'string') {
            base64.value = reader.result.split(',')[1] || '';
        };
    };
};

watch(base64, (newValue: string | null) => {
    emit('imageBase64', newValue);
});

</script>

<template>
    <q-uploader
        label="画像"
        accept="image/*"
        hide-upload-btn
        hide-file-list
        @added="onFileAdded"
        @removed="base64 = null"
    />
</template>

<style scoped>
</style>