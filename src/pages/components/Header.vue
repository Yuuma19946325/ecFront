<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = 'My Website'
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
      /* Add your click logic here */
    }
  }
]
</script>
<template>
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.id" v-on:click="item.onClick">{{ item.label }}</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #f2f2f2;
  padding: 20px;
}

h1 {
  color: #333;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav li {
  display: inline-block;
  margin-right: 10px;
}

nav li:last-child {
  margin-right: 0;
}
</style>
