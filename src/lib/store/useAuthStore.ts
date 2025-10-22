import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { User } from '../../services/auth/types';
  
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthActions = {
  login: (user: User) => void;
  logout: () => void;
  stopLoading: () => void;
  hasRole: (roleName: string) => boolean;
  isSuperAdmin: () => boolean;
  isTenantAdmin: () => boolean;
  isUser: () => boolean;
  canManageRole: (targetRole: string) => boolean;
};

type AuthStoreType = AuthState & AuthActions;
 
const useAuthStoreBase = create<AuthStoreType>()(
  immer((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: (user) => {
      set((state) => {
        state.isAuthenticated = true;
        state.user = user;
      });
    },
    logout: () => {
      localStorage.removeItem('token');
      set((state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
    },
    stopLoading: () => {
      set((state) => {
        state.isLoading = false;
      });
    },
    hasRole: (roleName: string) => {
      const { user } = get();
      return user?.role?.name === roleName || false;
    },
    isSuperAdmin: () => {
      const { user } = get();
      return user?.role?.name === 'super_admin' || false;
    },
    isTenantAdmin: () => {
      const { user } = get();
      return user?.role?.name === 'tenant_admin' || false;
    },
    isUser: () => {
      const { user } = get();
      return user?.role?.name === 'user' || false;
    },
    canManageRole: (targetRole: string) => {
      const { user } = get();
      if (!user?.role?.name) return false;
      
      const roleHierarchy: Record<string, number> = {
        'super_admin': 3,
        'tenant_admin': 2,
        'user': 1,
      };
      
      const userLevel = roleHierarchy[user.role.name] || 0;
      const targetLevel = roleHierarchy[targetRole] || 0;
      
      return userLevel > targetLevel;
    },
  }))
);
 
const useAuthStore = createSelectorHooks(useAuthStoreBase);
 
export default useAuthStore;