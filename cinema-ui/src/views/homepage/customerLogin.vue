<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="login-form-container">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="gradient-custom-3 login-form-customer">
          <el-form-item prop="username" :label="$t('homepage.login.usernameLb')">
            <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="Nhập tên đăng nhập">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="$t('homepage.login.passwordLb')">
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              placeholder="Nhập mật khẩu"
              @keyup.enter="handleLogin"
              show-password
              clearable
            >
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="display: flex;justify-content: flex-start;margin-top: -18px;">
            <span class="remember-pass-text">{{ $t('homepage.login.rememberPassLb') }}</span>
          </el-checkbox>
          <el-form-item style="width:100%;">
            <IrButton
              colorStyle="blue"
              type="primary"
              buttonSize="large"
              :title="$t('homepage.login.loginBtnTt')"
              :loadingFlag="loading"
              widthPercent="100%"
              @onClick="handleLogin"
              style="width:100%; margin-top: 20px;"
            />
            <div class="text-center" style="width:100%;margin:8px 0;display: flex;justify-content: center;">
              <p>Chưa có tài khoản? <a href="/homepage/customer-register">Đăng ký</a></p>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="LoginCustomer" lang="ts">
import { FormRules } from 'element-plus';
import { ComponentInternalInstance } from "vue";
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { useCustomerUserStore } from '@/store/modules/customer';
import { LoginData, TenantVO } from '@/api/types';
import { getCodeImg, getTenantList } from '@/api/login';
import { to } from 'await-to-js';
import i18n from '@/lang';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorage';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()
const router = useRouter();
const userStore = useCustomerUserStore();

const activeLogin = ref('')
const codeUrl = ref('customer');
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

const loginForm = ref<LoginData>({
  tenantId: "000000",
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: 'nb'
});

const loginRules: FormRules = {
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.usernameRqMsg') }],
  password: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

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
        const beforePathLogin = getFromLocalStorage('beforePathLogin');
        if (beforePathLogin === "/login?redirect=/index") {
          await router.push({ path: "/homepage" });
        } else {
          await router.push({ path: beforePathLogin });
        }

      } else {
        loading.value = false;
        // Get verification code again
        if (captchaEnabled.value) {
            await getCode();
        }
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

/**
 * get verification code
 */
 const getCode = async () => {
  const res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
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

const handleNavigateLogin = (key: string) => {
  localStorage.setItem('system-type', key);
  activeLogin.value = key;
}

const loading = ref(false);

onMounted(() => {
  localStorage.setItem('system-type', 'customer');
  activeLogin.value = 'customer';
  getCode();
  initTenantList();
  getCookie();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.main-container {
  position: relative;
  top: -62px;
  display: flex;
  flex-direction: column;
  .search-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      // min-height: 366px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      border-left: 4px solid $blue-500;
      background: $gray-100;
      flex: 1;
      .search-detail-title {
        color: $gray-800;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .search-form {
        // height: 124px;
        width: 100%;
        padding: 0 90px;
      }
      .search-detail-button {
        display: flex;
        width: 100%;
        padding: 0 90px;
        justify-content: end;
        align-items: end;
      }
    }
  }
  @media (max-width:970px) {
  .search-row {
    flex-direction: column;
    .search-detail-container {
      width: 100%;
    }
  }
}
}

.table-container {
  padding: 0px  120px 100px 120px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    .title {
      color: white;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      margin: 0px 24px 0px 24px
    }
    .line {
      height: 1px;
      flex:1;
      background-color: $gray-200;
    }
  }
  .datagrid-body {
    overflow: visible;
    border: 1px solid $gray-200;
    background: $gray-0;
    margin-top: 16px;
    width: 100%;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}

.login-form-customer {
  border-radius: 8px;
  height: auto;
  width: 526px;
  margin: 30px auto 30px auto;
  padding: 40px 60px 0px 60px;
  background: rgba(17, 25, 39, 0.8);
}

.login-form-customer .el-checkbox .el-checkbox__label  {
  color: $gray-0 !important;
}

.title {
  color: white;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin: 0px 24px 0px 24px;
}

.nav-login{
    height: 42px;
    background: unset !important;
    border-bottom: none;
    width: 100%;
}

.nav-login li.el-menu-item span {
    color: #D2D6DB !important;
    font-size: 17px;
    font-weight: 600;
    line-height: 24px;
}

.nav-login li.el-menu-item {
    padding: 8px 16px 10px 16px;
    gap: 12px;
    background: unset !important;
    flex: 1;
}

.remember-pass-text {
  color: $gray-0;
}

.svg-icon {
  width: 24px;
  height: 24px;
  color: white !important;
  position: relative;
  fill: currentColor;
  filter: brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(136%) hue-rotate(174deg) brightness(89%) contrast(93%);
  vertical-align: -2px;
}
.gradient-custom-3 {
opacity: 1;

background: -webkit-linear-gradient(to right, rgba(140, 141, 140, 0.5), rgba(108, 213, 255, 0.5));

background: linear-gradient(to right, rgba(140, 141, 140, 0.5), rgba(108, 213, 255, 0.5))
}
</style>
