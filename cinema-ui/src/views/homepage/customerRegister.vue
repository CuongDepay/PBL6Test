<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <el-form ref="loginRef" :model="registerForm" :rules="registerRules" class="gradient-custom-3  bg-image login-form-customer">
        <el-form-item class="item-input" label="Họ và tên" prop="nickName">
          <el-input v-model="registerForm.nickName" type="text" size="small" auto-complete="off" placeholder="Nhập họ và tên"> </el-input>
        </el-form-item>
        <el-form-item class="item-input" prop="username" label="Tài Khoản">
          <el-input v-model="registerForm.username" type="text" size="small" auto-complete="off" placeholder="Nhập tài khoản"></el-input>
        </el-form-item>
        <el-form-item class="item-input" prop="password" label="Mật Khẩu">
          <el-input
            v-model="registerForm.password"
            type="password"
            size="small"
            auto-complete="off"
            placeholder="Nhập mật khẩu"
            @keyup.enter=""
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item class="item-input" prop="email" label="Email">
          <el-input v-model="registerForm.email" type="text" size="small" auto-complete="off" placeholder="Nhập email"></el-input>
        </el-form-item>
        <el-form-item class="item-input group-input">
          <el-form-item prop="sdt" label="Số điện thoại">
            <el-input
              v-model="registerForm.phonenumber"
              style="width: 480px;"
              type="text"
              size="small"
              auto-complete="off"
              placeholder="Nhập sdt"
            ></el-input>
          </el-form-item>
          <el-form-item style="margin-left:160px" prop="gerden" label="Giới Tính">
            <el-radio v-model="registerForm.gerden" label="1">Nam</el-radio>
            <el-radio v-model="registerForm.gerden" label="2">Nữ</el-radio>
            <el-radio v-model="registerForm.gerden" label="3">Khác</el-radio>
          </el-form-item>
        </el-form-item>
        <el-form-item class="item-input" style="width:100%;">
          <IrButton
            class="item-btn"
            colorStyle="blue"
            type="primary"
            buttonSize="large"
            :title="$t('homepage.register.registerBtnTt')"
            widthPercent="100%"
            @onClick="handleRegister"
            style="width:100%;"
          />
          <div style="width:100%;margin:24px 0 -48px 0;display: flex;justify-content: center;font-size: 18px;">
            <p>Đã có tài khoản? <a href="/homepage/customer-login">Đăng nhập</a></p>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="RegisterCustomer" lang="ts">
import { FormRules } from 'element-plus';
import { ComponentInternalInstance } from "vue";
import { useCustomerUserStore } from '@/store/modules/customer';
import { RegisterData, TenantVO } from '@/api/types';
import i18n from '@/lang';
import { to } from 'await-to-js';

const router = useRouter();
const userStore = useCustomerUserStore();
const register = ref(false);

const registerForm = ref<RegisterData>({
  tenantId: "000000",
  username: '',
  password: '',
  confirmPassword: '',
  phonenumber: '',
  email: '',
  nickName: '',
  gerden: '',
  code: '',
  uuid: 'nb'
});

const registerRules: FormRules = {
  nickName: [{ required: true, trigger: "blur", message: "Vui lòng nhập Họ và tên" }],
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.usernameRqMsg') }],
  password: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  email: [{ required: true, trigger: 'blur', message: "Vui lòng nhập email" }],
  confirmPassword: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

const loading = ref(false);
const redirect = ref(undefined);

const handleRegister = async () => {
  const [err] = await to(userStore.register(registerForm.value));
  if (!err) {
    await router.push({ path: redirect.value || '/homepage/customer-login' });
  } else {
    loading.value = false;
  }
};

onMounted(() => {
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
  background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');
  // height: 470px;
  width: 60%;
  margin: 10px auto;
  padding: 40px 60px;
  border-radius: 8px;
  opacity: 1;
}

.login-form-customer .el-checkbox .el-checkbox__label  {
  color: #000 !important;
}
.item-input{
  margin-bottom: 18px !important;
}
.group-input{
  margin-bottom: -32px !important;
  margin-top: 4px !important;
  // color: #000 !important;
}
.item-btn{
  margin-top: 12px !important;
  margin-bottom: -12px !important;
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
