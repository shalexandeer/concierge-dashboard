const API_ROUTE = "user-tenants";

export const userTenantKeys = {
  all: ["user-tenants"] as const,
  userTenants: (userId: string) => [...userTenantKeys.all, "user", userId] as const,
  tenantUsers: (tenantId: string) => [...userTenantKeys.all, "tenant", tenantId] as const,
};

export const apiEndpoints = {
  userTenants: {
    add: API_ROUTE,
    getUserTenants: (userId: string) => `${API_ROUTE}/users/${userId}`,
    getTenantUsers: (tenantId: string) => `${API_ROUTE}/tenants/${tenantId}`,
    remove: (userId: string, tenantId: string) => 
      `${API_ROUTE}/users/${userId}/tenants/${tenantId}`,
  },
};

