<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="fruit in fruits" :key="fruit.id">
      <th scope="row">{{ fruit.id }}</th>
      <td>{{ fruit.name }}</td>
      <td>{{ fruit.price }}</td>
    </tr>

    </tbody>
  </table>
</template>
<script setup>
import {onMounted, ref} from "vue";
import useApi from "../../useApi.js";

const fruits = ref([]);
const api = useApi();

function getFruits() {
  api.get('api/auth/fruits')
      .then(res => {
        fruits.value = res.data.data;
      }).catch(err => {
    console.log(err.message)
  })
}


onMounted(() => {
  getFruits();
})
</script>


<style scoped>

</style>
