<template>
    <div class="w-25">
        <input v-model="userEmail" type="email" class="form-control mb-3" placeholder="email">
        <input v-model="userPassword" type="password" class="form-control mb-3" placeholder="password">
        <input type="submit" @click.prevent="login" class="btn btn-primary">
    </div>
</template>
<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
const router =useRouter()
const userEmail = ref();
const userPassword = ref();

function login() {
    axios.post('/api/auth/login', {
        email: userEmail.value,
        password: userPassword.value
    }).then(res => {
        localStorage.access_token=res.data.access_token;
        router.push({name:'user.personal'});
    })
}

</script>

