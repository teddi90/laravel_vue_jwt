<template>
    <div class="w-25">
        <input v-model="userName" type="text" class="form-control mb-3" placeholder="name">
        <input v-model="userEmail" type="email" class="form-control mb-3" placeholder="email">
        <input v-model="userPassword" type="password" class="form-control mb-3" placeholder="password">
        <input v-model="userPasswordConfirmation" type="password" class="form-control mb-3" placeholder="confirm password">
        <input type="submit" @click.prevent="userStore" class="btn btn-primary" >
    </div>
</template>
<script setup>
import {ref} from "vue";

const userName=ref(null);
const userEmail=ref(null);
const userPassword=ref(null);
const userPasswordConfirmation=ref(null);

function userStore(){
    axios.post('/api/users',{
        name:userName.value,
        email:userEmail.value,
        password:userPassword.value,
        password_confirmation:userPasswordConfirmation.value
    }).then(res=>{
        console.log(res);
    })
}
</script>

