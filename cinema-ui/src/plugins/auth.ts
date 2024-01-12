import useUserStore from '@/store/modules/user';

const authPermission = (permission: string): boolean => {
  const all_permission = '*:*:*';
  const permissions: string[] = useUserStore().permissions;
  if (permission && permission.length > 0) {
    return permissions.some((v) => {
      return all_permission === v || v === permission;
    });
  } else {
    return false;
  }
};

const authRole = (role: string): boolean => {
  const super_admin = 'admin';
  const roles = useUserStore().roles;
  if (role && role.length > 0) {
    return roles.some((v) => {
      return super_admin === v || v === role;
    });
  } else {
    return false;
  }
};

export default {
  // Verify that the user has a certain permission
  hasPermi(permission: string): boolean {
    return authPermission(permission);
  },
  // To verify whether the user has the specified permissions, only one of them needs to be included
  hasPermiOr(permissions: string[]): boolean {
    return permissions.some((item) => {
      return authPermission(item);
    });
  },
  // Verify that the user has the specified permissions and must have all of them
  hasPermiAnd(permissions: string[]): boolean {
    return permissions.every((item) => {
      return authPermission(item);
    });
  },
  // Verify that a user has a role
  hasRole(role: string): boolean {
    return authRole(role);
  },
  // Verify that the user has the specified role, only need to include one of them
  hasRoleOr(roles: string[]): boolean {
    return roles.some((item) => {
      return authRole(item);
    });
  },
  // Verify whether the user has the specified role, all must have
  hasRoleAnd(roles: string[]): boolean {
    return roles.every((item) => {
      return authRole(item);
    });
  }
};
