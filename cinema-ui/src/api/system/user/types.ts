import { DeptVO } from './../dept/types';
import { RoleVO } from '@/api/system/role/types';
import { PostVO } from '@/api/system/post/types';
import { CinemaVO } from "@/api/portCustomer/cinemaManagement/types";

/**
 * User Info
 */
export interface UserInfo {
  user: UserVO;
  roles: string[];
  permissions: string[];
}

/**
 * User Query Object Type
 */
export interface UserQuery extends PageQuery {
  userName?: string;
  phonenumber?: string;
  status?: string;
  deptId?: string | number;
  roleId?: string | number;
}

/**
 * user return object
 */
export interface UserVO extends BaseEntity {
  cinemaId: string | number;
  userId: string | number;
  deptId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: string;
  remark: string;
  dept: DeptVO;
  roles: RoleVO[];
  roleIds: any;
  postIds: any;
  roleId: any;
  admin: boolean;
  deptName: string;
}

/**
 * user form type
 */
export interface UserForm {
  id?: string;
  userId?: string;
  deptId?: number;
  userName: string;
  nickName?: string;
  password: string;
  phonenumber?: string;
  email?: string;
  sex?: string;
  status: string;
  remark?: string;
  postIds: string[];
  roleIds: string[];
  cinemaId?: number;
}

export interface UserInfoVO {
  user: UserVO;
  roles: RoleVO[];
  cinemas: CinemaVO[];
  roleIds: string[];
  posts: PostVO[];
  postIds: string[];
  roleGroup: string;
  postGroup: string;
}

export interface ResetPwdForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
