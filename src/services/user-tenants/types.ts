import { User } from "../users/types";
import { Tenant } from "../tenants/types";

// User-Tenant relationship types
export interface UserTenant {
  userId: string;
  tenantId: string;
  user?: User;
  tenant?: Tenant;
  createdAt: string;
}

// User-Tenant request payloads
export interface AddUserToTenantPayload {
  userId: string;
  tenantId: string;
}

