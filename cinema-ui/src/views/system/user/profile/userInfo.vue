<template>
  <el-form ref="userRef" :model="userForm" :rules="rules" label-width="150px" class="common-form">
    <el-form-item :label="$t('profile.editInfo.nickNameLb')" prop="nickName" class="form-item-row">
      <el-input v-model="userForm.nickName" maxlength="30" />
    </el-form-item>
    <el-form-item :label="$t('profile.editInfo.phonenumberLb')" prop="phonenumber" class="form-item-row">
      <el-input v-model="userForm.phonenumber" maxlength="11" />
    </el-form-item>
    <el-form-item :label="$t('profile.editInfo.emailLb')" prop="email" class="form-item-row">
      <el-input v-model="userForm.email" maxlength="50" />
    </el-form-item>
    <el-form-item :label="$t('profile.editInfo.sexLb')" class="form-item-row">
      <el-radio-group v-model="userForm.sex">
        <el-radio label="0">{{ $t('profile.editInfo.sexMaleLb') }}</el-radio>
        <el-radio label="1">{{ $t('profile.editInfo.sexFemaleLb') }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item></el-form-item>
  </el-form>
  <div class="common-form-button">
    <IrButton colorStyle="blue" type="primary" :title="$t('profile.editInfo.submitBtn')" :width="100" @onClick="submit" />
    <IrButton colorStyle="gray" type="secondary" :title="$t('profile.editInfo.cancelBtn')" :width="100" @onClick="close" />
  </div>
</template>

<script setup lang="ts">
import { updateUserProfile } from "@/api/system/user";
import { FormRules } from "element-plus";
import { PropType } from "vue";
import { ElForm } from "element-plus";
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
  user: {
    type: Object as PropType<any>,
  }
});
const userForm = computed(() => props.user);
const userRef = ref(ElForm);
const rules = ref<FormRules>({
  nickName: [{ required: true, message: i18n.global.t('profile.editInfo.infoRules.nickNameRqMsg'), trigger: "blur" }],
  email: [{ required: true, message: i18n.global.t('profile.editInfo.infoRules.emailRqMsg'), trigger: "blur" }, { type: "email", message: i18n.global.t('profile.editInfo.infoRules.emailPtMsg'), trigger: ["blur", "change"] }],
  phonenumber: [{ pattern: /[0-9*]{10}$/, message: i18n.global.t('profile.editInfo.infoRules.phonenumberPtMsg'), trigger: "blur" }],
});
/** Submit button */
const submit = () => {
  userRef.value.validate(async (valid: boolean) => {
    if (valid) {
      await updateUserProfile(props.user)
      proxy?.$modal.msgSuccess(i18n.global.t('profile.editInfo.editSuccess'));
    }
  });
};
/** close button */
const close = () => {
  proxy?.$tab.closePage();
};
</script>
