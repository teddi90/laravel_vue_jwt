<script setup>
import {onMounted,  ref, onUpdated} from "vue";
import useApi from "../useApi.js";
import {useRouter} from "vue-router";

const router=useRouter();
const api = useApi();
const accessToken = ref(null);

function getAccessToken() {
  accessToken.value = localStorage.getItem('access_token')
    console.log('update')

}
function logout(){
    api.post('/api/auth/logout')
        .then(res=>{
            localStorage.removeItem('access_token');
            router.push({name:'user.login'})
        })
}
onMounted(() => {
  getAccessToken();
});
onUpdated(()=>{
    getAccessToken();
})

</script>

<template>
  <div class="container">
    <div class="py-3">
      <router-link class="btn btn-secondary mx-2" :to="{name:'fruit.index'}">Fruits</router-link>
      <router-link v-if="!accessToken" class="btn btn-secondary mx-2" :to="{name:'user.login'}">Login</router-link>
      <router-link v-if="!accessToken" class="btn btn-secondary mx-2" :to="{name:'user.registration'}">Registration</router-link>
      <router-link v-if="accessToken" class="btn btn-secondary mx-2" :to="{name:'user.personal'}">Personal</router-link>
        <a href="#"  @click.prevent="logout" v-if="accessToken" class="btn btn-secondary">Logout</a>
    </div>
    <router-view></router-view>
  </div>
</template>


