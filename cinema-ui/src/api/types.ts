import { DatetimeFormatProps } from "vue-i18n";

/**
 * register
 */
export type RegisterForm = {
  tenantId: string;
  username: string;
  password: string;
  confirmPassword?: string;
  code?: string;
  uuid?: string;
  userType?: string;
};

/**
 * login request
 */
export interface LoginData {
  tenantId: string;
  username: string;
  password: string;
  rememberMe?: boolean;
  code?: string;
  uuid?: string;
}

/**
 * register request
 */
export interface RegisterData {
  tenantId: string;
  nickName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phonenumber: string;
  email: string;
  gerden: string;
  code?: string;
  uuid?: string;
}

/**
 * login response
 */
export interface LoginResult {
  token: string;
}

/**
 * Verification code returned
 */
export interface VerifyCodeResult {
  captchaEnabled: boolean;
  uuid?: string;
  img?: string;
}

/**
 * tenant
 */
export interface TenantVO {
  companyName: string;
  domain: any;
  tenantId: string;
}

export interface TenantInfo {
  tenantEnabled: boolean;
  voList: TenantVO[];
}
