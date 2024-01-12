import { MenuTypeEnum } from '@/enums/MenuTypeEnum';

/**
 * Menu tree structure type
 */
export interface MenuTreeOption {
  id: string | number;
  label: string;
  parentId: string | number;
  weight: number;
  children?: MenuTreeOption[];
}

export interface RoleMenuTree {
  menus: MenuTreeOption[];
  checkedKeys: string[];
}

/**
 * Menu query parameter type
 */
export interface MenuQuery {
  keywords?: string;
  menuName?: string;
  status?: string;
}

/**
 * menu view object type
 */
export interface MenuVO extends BaseEntity {
  parentName: string;
  parentId: string | number;
  children: MenuVO[];
  menuId: string | number;
  menuName: string;
  orderNum: number;
  path: string;
  component: string;
  queryParam: string;
  isFrame: string;
  isCache: string;
  menuType: MenuTypeEnum;
  visible: string;
  status: string;
  icon: string;
  remark: string;
}

export interface MenuForm {
  parentName?: string;
  parentId?: string | number;
  children?: MenuForm[];
  menuId?: string | number;
  menuName: string;
  orderNum: number;
  path: string;
  component?: string;
  queryParam?: string;
  isFrame?: string;
  isCache?: string;
  menuType?: MenuTypeEnum;
  visible?: string;
  status?: string;
  icon?: string;
  remark?: string;
  query?: string;
  perms?: string;
}
