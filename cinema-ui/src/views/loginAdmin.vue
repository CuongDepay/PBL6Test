<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form-admin">
      <div class="login-logo"><img src="@/assets/logo/logo.png" class="login-logo" /></div>
      <h3 class="title">Đăng nhập</h3>
      <!-- <el-form-item prop="tenantId" v-if="tenantEnabled">
        <el-select v-model="loginForm.tenantId" filterable placeholder="Please select/enter a company name" style="width: 100%">
          <el-option v-for="item in tenantList" :key="item.tenantId" :label="item.companyName" :value="item.tenantId"> </el-option>
          <template #prefix><svg-icon icon-class="company" class="el-input__icon input-icon" /></template>
        </el-select>
      </el-form-item> -->
      <el-form-item prop="username" label="Tên đăng nhập">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="password" label="Mật khẩu">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="Password"
          @keyup.enter="handleLogin"
          show-password
          clearable
        />
      </el-form-item>
      <!-- <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="Verification code"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img" />
        </div>
      </el-form-item> -->
      <el-checkbox v-model="loginForm.rememberMe"><span class="remember-pass-text">Ghi nhớ mật khẩu</span></el-checkbox>
      <el-form-item style="width:100%; margin-bottom: 0 !important;">
        <!-- <el-button :loading="loading" size="large" type="primary" style="width:100%; margin-top: 40px;" @click.prevent="handleLogin">
          <span v-if="!loading">Đăng nhập</span>
          <span v-else>Logging in...</span>
        </el-button> -->
        <IrButton
          colorStyle="blue"
          type="primary"
          buttonSize="large"
          title="Đăng nhập"
          widthPercent="100%"
          :loadingFlag="loading"
          @onClick="handleLogin"
          style="width:100%; margin-top: 40px;"
        />
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">Sign up now</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  bottom  -->
    <div class="el-login-footer">
      <span>Copyright © 2023 Irtech All Rights Reserved.</span>
    </div>
    <div class="waveWrapper waveAnimation">
      <!-- <div class="waveWrapperInner bgTop">
        <div class="wave waveTop"></div>
      </div> -->
      <div class="waveWrapperInner bgMiddle">
        <div class="wave waveMiddle"></div>
      </div>
      <div class="waveWrapperInner bgBottom">
        <div class="wave waveBottom"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IrButton from '@/components/IrButton/index.vue';
import { getTenantList } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { useUserStore } from '@/store/modules/user';
import { LoginData, TenantVO } from '@/api/types';
import { FormRules } from 'element-plus';
import { to } from 'await-to-js';

const userStore = useUserStore();
const router = useRouter();

const loginForm = ref<LoginData>({
  tenantId: "000000",
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: ''
});

const loginRules: FormRules = {
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: 'Please enter your username' }],
  password: [{ required: true, trigger: 'blur', message: 'Please enter your password' }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

const codeUrl = ref('');
const loading = ref(false);
// Captcha switch
const captchaEnabled = ref(true);
// tenant switch
const tenantEnabled = ref(true);

// registration switch
const register = ref(false);
const redirect = ref(undefined);
const loginRef = ref(ElForm);
// tenant list
const tenantList = ref<TenantVO[]>([]);

const handleLogin = () => {
  loginRef.value.validate(async (valid:boolean, fields: any) => {
    if (valid) {
      loading.value = true;
      // Checked the need to remember the password setting to set the remember username and password in the cookie
      if (loginForm.value.rememberMe) {
        Cookies.set("tenantId", loginForm.value.tenantId, { expires: 30 });
        Cookies.set('username', loginForm.value.username, { expires: 30 });
        Cookies.set('password', String(encrypt(loginForm.value.password)), { expires: 30 });
        Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 });
      } else {
        // otherwise remove
        Cookies.remove("tenantId");
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // Call the login method of action
      // prittier-ignore
      const [err] = await to(userStore.login(loginForm.value));
      if (!err) {
        await router.push({ path: redirect.value || '/' });
      } else {
        loading.value = false;
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

const getCookie = () => {
  const tenantId = Cookies.get("tenantId");
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const rememberMe = Cookies.get('rememberMe');
  loginForm.value = {
    tenantId: tenantId === undefined ? loginForm.value.tenantId : tenantId,
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : (decrypt(password) as string),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}


/**
 * Get a list of tenants
 */
const initTenantList = async () => {
  const { data } = await getTenantList();
  tenantEnabled.value = data.tenantEnabled === undefined ? true : data.tenantEnabled;
  if (tenantEnabled.value) {
    tenantList.value = data.voList;
    if (tenantList.value != null && tenantList.value.length !== 0) {
      loginForm.value.tenantId = tenantList.value[0].tenantId;
    }
  }
}

onMounted(() => {
  initTenantList();
  getCookie();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.login-logo {
  height: 42px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.title {
  color: $gray-700;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  margin: 0 0 16px 0;
}

.login-form-admin {
  background: $gray-0;
  width: 440px;
  padding: 40px 40px 80px 40px;
  // .el-input {
  //   height: 40px;
  //   input {
  //     height: 40px;
  //   }
  // }
  // .input-icon {
  //   height: 39px;
  //   width: 14px;
  //   margin-left: 0px;
  // }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: 1px;
  z-index: 99;
  display: none;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
.remember-pass-text {
  color: $gray-700;
}

@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1)
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55)
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1)
  }
}
.waveWrapper {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 140px;
}
.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  bottom: -1px;
  // background-image: linear-gradient(to top, #86377b 20%, #27273c 80%);
}
// .bgTop {
//     z-index: 15;
//     // opacity: 0.5;
// }
.bgMiddle {
  z-index: 10;
  // opacity: 0.75;
}
.bgBottom {
  z-index: 5;
}
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}
@media (max-height:700px) {
  .waveWrapper {
    display: none;
  }
}
</style>
