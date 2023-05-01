<template>
    <div class="login">
        <div class="login-card">
            <div class="label">邮箱</div>
            <input type="email" v-model="account"/>
            <div style="display:flex;flex-direction: row;margin-top: 0.8rem">
                <input v-model="code" type="text" style="width: calc(100% - 100px)">
                <button style="margin-left: auto;min-width: 80px" class="btn">验证码</button>
            </div>
            <div class="label">密码</div>
            <input v-model="password" type="password"/>
            <button @click="register(account,password,code)" class="btn" style="margin-top: 1.8rem">注 册</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {userLogin, userRegister} from "@/api/user.js";
import Message from "@/components/Message/index.js";
import {navTo} from "@/api/utils.js";

let account = ref('');
let password = ref('');
let code = ref('');

function register(account, password, code) {
    userRegister(account, password, code).then(result => {
        if (result.data.code === 200) {
            Message({
                type: "success",
                message: '注册成功',
            });
        } else {
            Message({
                type: "error",
                message: '注册失败'
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
    border: 1px solid transparent;
    height: 40px;
    box-shadow: rgba(100, 100, 111, 0.2) 0 0 3px 0;
    outline: none;
    padding: .8rem;
    border-radius: .4rem;
}

input:focus {
    border: 1px solid cornflowerblue;
}

.btn {
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