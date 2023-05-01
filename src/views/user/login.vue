<template>
    <div class="login">
        <div class="login-card">
            <div class="label">邮箱</div>
            <input type="email" v-model="account"/>
            <div class="label" >密码</div>
            <input v-model="password" type="password"/>
            <button class="btn" @click="login(account,password)" style="margin-top: 1.8rem">登 录</button>
        </div>
    </div>
</template>

<script setup>


import {userLogin} from "@/api/user.js";
import Message from "@/components/Message/index.js";
import {navTo} from "@/api/utils.js";
import {ref} from "vue";

let account = ref('');
let password = ref('');

function login(account, password) {
    userLogin(account, password).then(result => {
        if (result.data.code === 200) {
            let token = result.data.data;
            localStorage.setItem("user.token", token);
            Message({
                type: "success",
                message: '登录成功',
            });
            navTo('/list')
        } else {
            Message({
                message: '登录失败',
                type: "error",
            })
        }
    });
}

</script>

<style scoped>
.login {
    width: 100vw;
    height: 100%;
    padding: 0.5em 1rem;
}

.login-card {
    display: flex;
    flex-direction: column;
}

.label {
    margin: .3rem 0;
}

input {
    height: 40px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 0 3px 0;
    outline: none;
    padding: .8rem;
    border-radius: .4rem;
    border: 1px solid transparent;
}

input:focus {
    border: 1px solid cornflowerblue;
}

.btn {
    margin-top: 1.8rem;
    height: 40px;
    border: 0;
    background-color: #747bff;
    font-size: 16px;
    border-radius: 4px;
    color: white;
}

.btn:active{
    background-color: #7400ff;
}


</style>