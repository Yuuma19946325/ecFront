<script setup>
import { ref } from 'vue';

// 初期データ
const availableItems = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']);
const selectedItems = ref([]);

// 選択されたアイテムのトラッキング
const selected = ref({
  available: null,
  selected: null
});

// アイテム選択ハンドラ
function selectItem(item, type) {
  selected.value[type] = item;
}

// アイテム移動ハンドラ
function moveSelectedToTarget() {
  if (selected.value.available !== null) {
    selectedItems.value.push(selected.value.available);
    availableItems.value = availableItems.value.filter(item => item !== selected.value.available);
    selected.value.available = null;
  }
}

function moveSelectedToSource() {
  if (selected.value.selected !== null) {
    availableItems.value.push(selected.value.selected);
    selectedItems.value = selectedItems.value.filter(item => item !== selected.value.selected);
    selected.value.selected = null;
  }
}
</script>

<template>
  <div class="picklist">
    <div class="picklist-container">
      <h3>Available Items</h3>
      <ul class="item-list">
        <li 
          v-for="item in availableItems" 
          :key="item" 
          @click="selectItem(item, 'available')"
          :class="{ 'selected-item': selected.available === item }"
        >
          {{ item }}
        </li>
        <li v-if="availableItems.length === 0" class="empty-placeholder">No Items</li>
      </ul>
    </div>
    <div class="picklist-actions">
      <button @click="moveSelectedToTarget">></button>
      <button @click="moveSelectedToSource"><</button>
    </div>
    <div class="picklist-container">
      <h3>Selected Items</h3>
      <ul class="item-list">
        <li 
          v-for="item in selectedItems" 
          :key="item" 
          @click="selectItem(item, 'selected')"
          :class="{ 'selected-item': selected.selected === item }"
        >
          {{ item }}
        </li>
        <li v-if="selectedItems.length === 0" class="empty-placeholder">No Items</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.picklist {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.picklist-container {
  width: 40%;
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