<template>
  <div class="profile-layout-bg">
    <div class="profile-container">
      <div class="profile-basic-info">
        <div class="basic-title">{{ $t('profile.basicInfo.tt') }}</div>
        <div class="basic-avatar"><userAvatar :user="state.user" /></div>
        <div class="basic-info">
          <div class="basic-info-item">
            <div class="item-left"><svg-icon icon-class="user" />{{ $t('profile.basicInfo.tt') }}</div>
            <div class="item-right">
              {{ state.user.userName }}
            </div>
          </div>
          <div class="basic-info-divider"></div>
          <div class="basic-info-item">
            <div class="item-left"><svg-icon icon-class="phone-outline" />{{ $t('profile.basicInfo.phonenumberLb') }}</div>
            <div class="item-right">
              {{ state.user.phonenumber }}
            </div>
          </div>
          <div class="basic-info-divider"></div>
          <div class="basic-info-item">
            <div class="item-left"><svg-icon icon-class="email-outline" />{{ $t('profile.basicInfo.emailLb') }}</div>
            <div class="item-right">
              {{ state.user.email }}
            </div>
          </div>
          <div class="basic-info-divider"></div>
          <div class="basic-info-item">
            <div class="item-left"><svg-icon icon-class="calendar" />{{ $t('profile.basicInfo.createTimeLb') }}</div>
            <div class="item-right">
              {{ parseTime(state.user.createTime) }}
            </div>
          </div>
        </div>
      </div>
      <div class="profile-divider"></div>
      <div class="profile-edit">
        <div class="edit-title"><svg-icon icon-class="edit" />{{ $t('profile.editInfo.tt') }}</div>
        <div>
          <el-tabs v-model="activeTab" class="custom">
            <el-tab-pane :label="$t('profile.editInfo.basicTab')" name="userinfo">
              <userInfo :user="userForm" />
            </el-tab-pane>
            <el-tab-pane :label="$t('profile.editInfo.passwordTab')" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Profile" lang="ts">
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import resetPwd from "./resetPwd.vue";
import { getUserProfile } from "@/api/system/user";

const activeTab = ref("userinfo");
const state = ref<{ user: any; roleGroup: string;  postGroup: string}>({
    user: {},
    roleGroup: '',
    postGroup: ''
});

const userForm = ref({});

const getUser = async () => {
    const res = await getUserProfile();
    state.value.user = res.data.user;
    userForm.value = { ...res.data.user }
    state.value.roleGroup = res.data.roleGroup;
    state.value.postGroup = res.data.postGroup;
};

onMounted(() => {
  getUser();
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.profile-layout-bg {
  background: $gray-100;
  height: calc(100vh - $base-header-height - 41px);
  padding: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 0px 10px -2px rgba(17, 25, 39, 0.04), 0px 2px 10px 2px rgba(17, 25, 39, 0.04);
}
.profile-container {
  padding: 40px 0;
  background-color: $gray-0;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
}
.profile-basic-info {
  padding: 24px 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 500px;
  .basic-title {
    color: $gray-700;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
  }
  .basic-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .basic-info {
    display: flex;
    flex-direction: column;
    min-width: 140px;
    .basic-info-item {
      height: 39px;
      padding: 12px 0 11px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: $gray-700;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      .item-left {
        .svg-icon {
          height: 16px;
          width: 16px;
          margin-right: 8px;
        }
      }
    }
    @media (max-width:1100px) {
      .basic-info-item {
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .basic-info-divider {
    height: 1px;
    background-color: $gray-200;
  }
}
.profile-divider {
  min-width: 1px;
  background-color: $gray-200;
}
.profile-edit {
  padding: 42px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 525px;
  width: 550px;
  .edit-title {
    color: $gray-700;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    .svg-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }
  }
}
</style>
