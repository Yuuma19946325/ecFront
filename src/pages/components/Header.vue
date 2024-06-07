<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref<String>('My Website')
const menuItems = [
  {
    id: 1,
    label: 'Home',
    onClick: () => {
      router.push({ path: '/' })
    }
  },
  {
    id: 2,
    label: 'About',
    onClick: () => {
      router.push({ path: '/about' })
    }
  },
  {
    id: 3,
    label: 'Services',
    onClick: () => {
      /* Add your click logic here */
    }
  },
  {
    id: 4,
    label: '管理者',
    onClick: () => {
      router.push({ path: '/managerMenu' })
    }
  }
]
</script>

<template>
  <q-header>
    <q-toolbar>
      <q-toolbar-title>
        {{ title }}
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar>
      <q-breadcrumbs active-color="#333" style="font-size: 16px">
        <q-breadcrumbs-el v-for="item in menuItems" :key="item.id" :label="item.label" v-on:click="item.onClick" />
      </q-breadcrumbs>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
header {
  background-color: #f2f2f2;
  padding: 20px;
}

.q-toolbar {
  color: #333;
}
</style>
