<script setup>
import {onMounted, ref} from "vue";

const accessToken = ref(null);

function getAccessToken() {
  accessToken.value = localStorage.getItem('access_token')
}

onMounted(() => {
  getAccessToken();
  //lesson 6 11:50
})

</script>

<template>
  <div class="container">
    <div class="py-3">
      <router-link class="btn btn-secondary mx-2" :to="{name:'fruit.index'}">Fruits</router-link>
      <router-link v-if="!accessToken" class="btn btn-secondary mx-2" :to="{name:'user.login'}">Login</router-link>
      <router-link v-if="!accessToken" class="btn btn-secondary mx-2" :to="{name:'user.registration'}">Registration</router-link>
      <router-link v-if="accessToken" class="btn btn-secondary mx-2" :to="{name:'user.personal'}">Personal</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>


