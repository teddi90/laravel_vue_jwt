<template>
    <div class="w-25">
        <input v-model="userName" type="text" class="form-control mb-3" placeholder="name">
        <input v-model="userEmail" type="email" class="form-control mb-3" placeholder="email">
        <input v-model="userPassword" type="password" class="form-control mb-3" placeholder="password">
        <input v-model="userPasswordConfirmation" type="password" class="form-control mb-3"
               placeholder="confirm password">
        <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
        <input type="submit" value="Registration" @click.prevent="userStore" class="btn btn-primary">
    </div>
</template>
<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const userName = ref(null);
const userEmail = ref(null);
const userPassword = ref(null);
const userPasswordConfirmation = ref(null);
const errorMessage = ref(null)

function userStore() {
    axios.post('/api/users', {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
        password_confirmation: userPasswordConfirmation.value
    }).then(res => {
        localStorage.setItem('access_token', res.data.access_token);
        router.push({name: 'user.personal'});
        console.log(res);
    }).catch(error => {
        errorMessage.value = error.response.data.error;
    })
}
</script>

