<template>
  <el-form ref="pwdRef" :model="user" :rules="rules" label-width="150px" class="common-form">
    <el-form-item :label="$t('profile.editInfo.oldPasswordLb')" prop="oldPassword" class="form-item-row">
      <el-input v-model="user.oldPassword" :placeholder="$t('profile.editInfo.oldPasswordPh')" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('profile.editInfo.newPasswordLb')" prop="newPassword" class="form-item-row">
      <el-input v-model="user.newPassword" :placeholder="$t('profile.editInfo.newPasswordPh')" type="password" show-password />
    </el-form-item>
    <el-form-item :label="$t('profile.editInfo.confirmPasswordLb')" prop="confirmPassword" class="form-item-row">
      <el-input v-model="user.confirmPassword" :placeholder="$t('profile.editInfo.confirmPasswordPh')" type="password" show-password />
    </el-form-item>
  </el-form>
  <div class="common-form-button">
    <IrButton colorStyle="blue" type="primary" :title="$t('profile.editInfo.submitBtn')" :width="100" @onClick="submit" />
    <IrButton colorStyle="gray" type="secondary" :title="$t('profile.editInfo.cancelBtn')" :width="100" @onClick="close" />
  </div>
</template>

<script setup lang="ts">
import { updateUserPwd } from '@/api/system/user';
import { ResetPwdForm } from '@/api/system/user/types'
import { ElForm } from 'element-plus';
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const pwdRef = ref(ElForm);
const user = ref<ResetPwdForm>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});
const equalToPassword = (rule: any, value: string, callback: any) => {
  if (user.value.newPassword !== value) {
    callback(new Error(i18n.global.t('profile.editInfo.passwordRules.confirmPasswordRqMsg')));
  } else {
    callback();
  }
};
const rules = ref({
  oldPassword: [{ required: true, message: i18n.global.t('profile.editInfo.passwordRules.oldPasswordRqMsg'), trigger: "blur" }],
  newPassword: [{ required: true, message: i18n.global.t('profile.editInfo.passwordRules.newPasswordRqMsg'), trigger: "blur" }, { min: 5, max: 255, message: i18n.global.t('profile.editInfo.passwordRules.newPasswordMinMaxMsg', { min: 5, max: 255 }), trigger: "blur" }],
  confirmPassword: [{ required: true, message: i18n.global.t('profile.editInfo.passwordRules.passwordNotMatch'), trigger: "blur" }, { required: true, validator: equalToPassword, trigger: "blur" }]
});
/** Submit button */
const submit = () => {
  pwdRef.value.validate(async (valid: boolean) => {
    if (valid) {
      await updateUserPwd(user.value.oldPassword, user.value.newPassword)
      proxy?.$modal.msgSuccess(i18n.global.t('profile.editInfo.editSuccess'));
    }
  });
};
/** close button */
const close = () => {
  proxy?.$tab.closePage();
};
</script>
