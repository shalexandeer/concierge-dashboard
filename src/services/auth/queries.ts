import { jwtDecode } from "jwt-decode";
import { apiEndpoints, authKeys, storageKeys } from "./keys";
import { JwtPayload, MeResponse } from "./types";
import { useQuery } from "@/lib/hooks/useCustomQuery";
import api from "@/lib/axios";
import { ApiResponse } from "@/lib/types/api";

export const useCurrentUser = () => {
  const accessToken = localStorage.getItem(storageKeys.accessToken);
  
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: async (): Promise<MeResponse | null> => {
      if (!accessToken) {
        return null;
      }

      try {
        const response = await api.get<ApiResponse<MeResponse>>(
          apiEndpoints.auth.currentUser
        )

        return response.data.data

      } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
      }
    },
    enabled: !!accessToken, // Only run query if token exists
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false, // Don't retry on error
  });
};

/**
 * Check if the current access token is valid
 */
export const useIsTokenValid = () => {
  return useQuery({
    queryKey: [...authKeys.all, "tokenValid"],
    queryFn: async (): Promise<boolean> => {
      const accessToken = localStorage.getItem(storageKeys.accessToken);

      if (!accessToken) {
        return false;
      }

      try {
        const decoded = jwtDecode<JwtPayload>(accessToken);

        // Check if token is expired
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    },
    // Refresh the token validity check every minute
    refetchInterval: 180 * 1000,
  });
};

// /**
//  * Get the user's role from the token
//  */
// export const useUserRole = () => {
//   const { data: user } = useCurrentUser();

//   return useQuery({
//     queryKey: [...authKeys.all, "userRole"],
//     queryFn: async (): Promise<string | null> => {
//       if (!user) {
//         return null;
//       }      

//       const allRoles = await api.get<ApiResponse<Role[]>>(apiEndpoints.auth.roles)

//       const myRole = allRoles.data.data.find((role) => role.id === user.role_id)

//       return myRole?.slug || "";
//     },
//     enabled: !!user,
//   });
// };
