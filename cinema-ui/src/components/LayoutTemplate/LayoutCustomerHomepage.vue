<template>
  <div class="app-wrapper">
    <div class="fixed-main-header">
      <customerNavbar ref="customerNavbarRef" />
    </div>
    <div class="login-body" id="loginBody">
      <div class="breadcrumb">
      </div>
      <div class="homepage-body">
        <slot name="content" />
      </div>
      <div class="contact-container" id="contact">
        <div class="contact-address">
          <img class="contact-logo" src="@/assets/logo/logo.png" />
          <div class="contact-address-detail">
            <div class="main-info">
              <div class="title-text">{{ $t('homepage.contactInfo.contactAddrLb') }}</div>
              <div class="sub-title-text">STAR CINEMA</div>
            </div>
            <div class="sub-info">
              <div class="sub-info-item">
                <svg-icon icon-class="location" />
                <div class="content">
                  <div class="label-text">{{ $t('homepage.contactInfo.addrLb') }}</div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.addrContent1') }}<br />{{ $t('homepage.contactInfo.addrContent2') }}</div>
                </div>
              </div>
              <div class="sub-info-item">
                <svg-icon icon-class="phone" />
                <div class="content">
                  <div class="label-text">{{ $t('homepage.contactInfo.phoneLb') }}</div>
                  <div class="normal-text">(84-28) 9999 9999</div>
                </div>
              </div>
              <div class="sub-info-item">
                <svg-icon icon-class="mail" />
                <div class="content">
                  <div class="label-text">Email</div>
                  <div class="normal-text">info@star-cinema.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contact-others">
          <div class="policy">
            <div class="title-text">{{ $t('homepage.contactInfo.customerPolicyTt') }}</div>
            <div class="term">
              <div class="term-column1">
                <div class="term-item">
                  <div class="icon-background"><svg-icon icon-class="play" /></div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.serviceTermLb') }}</div>
                </div>
                <div class="term-item">
                  <div class="icon-background"><svg-icon icon-class="play" /></div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.refundPolicyLb') }}</div>
                </div>
                <div class="term-item">
                  <div class="icon-background"><svg-icon icon-class="play" /></div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.customerPolicyLb') }}</div>
                </div>
              </div>
              <div class="term-column2">
                <div class="term-item">
                  <div class="icon-background"><svg-icon icon-class="play" /></div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.confidentialPolicyLb') }}</div>
                </div>
                <div class="term-item">
                  <div class="icon-background"><svg-icon icon-class="play" /></div>
                  <div class="normal-text">{{ $t('homepage.contactInfo.paymentTermLb') }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="support">
            <div class="title-text">{{ $t('homepage.contactInfo.supportTt') }}</div>
            <div class="normal-text">
              {{ $t('homepage.contactInfo.supportContent') }}
            </div>
            <div class="support-info">
              <div class="support-info-item">
                <div class="normal-text">Hotline</div>
                <div class="hotline">
                  <div class="hotline-background-icon">
                    <svg-icon icon-class="phone" />
                  </div>
                  <div class="hotline-text">(84-28) 8342 9999</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomerNavbar } from '../../layout/components'
import { getRouteTitle } from '@/utils/i18n';

const route = useRoute();
const activeIndex = ref('');
const customerNavbarRef = ref(CustomerNavbar);
const router = useRouter();

const goToHomepage = () => {
  router.push({path: '/', query: {
  }});
}

const handleNavigate = (key: string) => {
  router.push('/login?active=' + key);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.fixed-main-header{
  position: fixed;
  top: 0;
  width: 100%;
  height: $base-header-height;
  z-index: 9;
  background-color: #FFDAB9;
}

.fixed-header {
  position: fixed;
  top: $base-header-height;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 60px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}

.nav-header {
  height: 60px;
  padding: 0 191px;
  background-color: #FFDAB9;
  border-bottom: 1px solid #3b76ff;

  .el-menu-item {
    display: flex;
    height: 60px;
    padding: 20px 24px 16px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    color: $gray-700 !important;
    font-size: 16px;
    border-bottom: none !important;
    height: 59px;

    &:hover {
      background: $gray-0;
      color: $gray-700 !important;
      border-top: 4px solid $blue-500;
    }

    &.is-active {
      border-top: 4px solid $blue-500;
      color: $gray-700 !important;
      background: $gray-0;
      font-size: 16px;
    }
  }
}
.login-background {
  min-width: 100%;
}
.login-body {
  /* 84 = navbar + tags-view = 50 + 34 */
  max-height: calc(100vh - $base-header-height);
  top: calc($base-header-height);
  overflow: auto;
  position: fixed;
  width: 100%;

  &::-webkit-scrollbar-track-piece {
    background: $gray-0;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray-400;
    border-radius: 100px;

    &:hover {
      background: $gray-500;
    }

    &:active {
      background: $gray-600;
    }
  }
  .contact-container {
    min-height: 446px;
    width: 100%;
    background-image: url("../../assets/images/homepage-footer.png");
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 35px 60px;
    gap: 149px;
    .contact-logo {
      width: 144px;
      height: 64px;
    }
    .contact-address {
      display: flex;
      flex-direction: row;
      gap: 140px
    }
    .contact-address-detail {
      display: flex;
      flex-direction: column;
      gap: 32px
    }
    .contact-others {
      display: flex;
      flex-direction: column;
      width: 459px;
      height: 353px;
      gap: 81px;
      .policy {
        display: flex;
        flex-direction: column;
        gap: 24px;
        .term {
          display: flex;
          flex-direction: row;
          gap: 90px;

          .term-column1, .term-column2 {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .term-item {
            display: flex;
            flex-direction: row;
            gap: 16px;
            .icon-background {
              background: $blue-500;
              width: 14px;
              height: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50px;
            }
            svg {
              filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7497%) hue-rotate(218deg) brightness(108%) contrast(101%);
              width: 14px;
              height: 14px;
            }
          }
        }
      }
      .support {
        display: flex;
        flex-direction: column;
        gap: 24px;
        .support-info {
          display: flex;
          flex-direction: row;
          gap: 45px;
          .support-info-item {
            display: flex;
            flex-direction: row;
            gap: 16px;
          }
          .hotline {
            display: flex;
            flex-direction: row;
            gap: 10px;
            justify-content: center;
            align-items: center;
            .hotline-background-icon {
              width: 20px;
              height: 20px;
              border-radius: 50px;
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              background: $red-500;
              svg {
                width: 12px;
                height: 12px;
                filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7497%) hue-rotate(218deg) brightness(108%) contrast(101%);
              }
            }
          }
        }
      }
    }
    .title-text {
      color: $blue-25;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    .sub-title-text {
      color: $blue-50;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
    }
    .label-text {
      color: $blue-50;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .normal-text {
      color: $blue-50;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .email-text {
      color: $blue-500;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .hotline-text {
      color: $red-500;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .main-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      border-bottom: 1px solid $blue-50;
      padding-bottom: 24px;
    }
    .sub-info {
      display: flex;
      flex-direction: column;
      gap: 24px;
      .sub-info-item {
        display: flex;
        flex-direction: row;
        gap: 24px;
        width: 382px;
        height: 57px;
        svg {
          width: 18px;
          height: 18px;
          filter: brightness(0) saturate(100%) invert(57%) sepia(33%) saturate(7495%) hue-rotate(192deg) brightness(100%) contrast(96%);
        }
        .content {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
      }
    }
  }
  @media (max-width:1300px) {
    .contact-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.title {
  color: $gray-0;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  margin: 0 0 40px 0;
  text-align: center;
}

.nav-login {
  height: 42px;
  margin-bottom: 56px;
  background: unset !important;
  border-bottom: none;
  width: 100%;

  li.el-menu-item {
    padding: 8px 16px 10px 16px;
    gap: 12px;
    background: unset !important;
    flex: 1;
    svg {
      width: 24px;
      height: 24px;
      filter: brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(136%) hue-rotate(174deg) brightness(89%) contrast(93%);
    }

    span {
      color: $gray-300 !important;
      font-size: 17px;
      font-weight: 600;
      line-height: 24px;
    }

    &.is-active {
      border-bottom: 2.5px solid $blue-500;

      svg {
        filter: brightness(0) saturate(100%) invert(66%) sepia(56%) saturate(7018%) hue-rotate(194deg) brightness(102%) contrast(96%);
      }

      span {
        color: $gray-0 !important;
      }
    }

    &:hover {
      border-bottom: 2.5px solid $blue-500;
    }
  }
}

.breadcrumb {
  display: block;
  border-bottom: 6px solid #f4f4f4;
  transform: matrix(1,0,0,-1,0,0);

  .home-icon {
    width: 16px;
    height: 16px;
    filter: brightness(0) saturate(100%) invert(100%) invert(48%) sepia(3%) saturate(1428%) hue-rotate(179deg) brightness(93%) contrast(94%);
  }
  .home-link {
    color: $gray-500;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    &:hover {
      color: $blue-500;
    }
  }
  .arrow-icon {
    width: 16px;
    height: 16px;
    filter: brightness(0) saturate(100%) invert(100%) invert(59%) sepia(63%) saturate(5209%) hue-rotate(193deg) brightness(101%) contrast(96%);
  }
  .title {
    color: $blue-500;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.homepage-body {
  width: 100%;
  min-height: calc(100vh - 60px - $base-header-height - 80px - 446px);
}
</style>
