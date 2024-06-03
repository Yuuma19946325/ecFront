<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from "./shared/stores/counter";
import { useGoodsStore } from "./shared/stores/goods";
import { Subject } from 'rxjs';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import axios from 'axios';

const counterStore = useCounterStore();
const goodsStore = useGoodsStore();

const count = computed(
  (): number => {
    return counterStore.count;
  }
);

const doubleCount = computed(
  (): number => {
    return counterStore.doubleCount;
  }
);

const onIncrementClick = () => {
  counterStore.increment();
};

const onIncrementClick2 = () => {
  goodsStore.increment();
};

const fetchData = () => {
      const apiObservable = from(axios.get('http://localhost:8080/api/goods/list')).pipe(
        map(response => response.data),
        catchError(err => {
          return [];
        })
      );

      apiObservable.subscribe({
        next: result => {
          console.log(result)
        },
        error: err => {
          console.log(err)
        }
      });
    }
</script>

<template>
  <header>
  </header>
  <p>count: {{ count }}</p>
  <p>doubleCount: {{ doubleCount }}</p>
  <button v-on:click="onIncrementClick2">加算</button>
</template>

<style scoped>

</style>
