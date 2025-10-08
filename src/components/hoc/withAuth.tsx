import * as React from "react";
import { Loader } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "@/services/auth/mutations";
import { useCurrentUser, useIsTokenValid } from "@/services/auth/queries";
import { MeResponse, User } from "@/services/auth/types";

export interface WithAuthProps {
  user: User;
}

const LOGIN_ROUTE = "/login";
const DASHBOARD_ROUTE = "/dashboard";

const ROUTE_ROLES = [
  "auth",
  "optional",
  "protected",
] as const;
type RouteRole = (typeof ROUTE_ROLES)[number];

export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routeRole: RouteRole
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect");

    // Add state to force a re-render after initial loading phase
    const [initialCheckComplete, setInitialCheckComplete] = React.useState(false);

    // Authentication queries
    const { 
      data: user, 
      // isLoading: isUserLoading, 
      error: userError,
      status: userStatus // Add status to debug
    } = useCurrentUser();
    
    const { 
      data: isTokenValid,
      status: tokenStatus // Add status to debug 
    } = useIsTokenValid();
    

    const logout = useLogout();


    // Derived authentication state
    const isAuthenticated = !!user && !!isTokenValid;
    
    // Debug auth state
    React.useEffect(() => {
      // console.log("[Auth Debug] User Status:", userStatus);
      // console.log("[Auth Debug] Token Status:", tokenStatus);
      // console.log("[Auth Debug] User:", user);
      // console.log("[Auth Debug] Token Valid:", isTokenValid);
    }, [user, isTokenValid, userStatus, tokenStatus]);

    // Handle authentication error
    React.useEffect(() => {
      if (userError) {
        // console.error("[withAuth] Error loading user:", userError);
        logout();
      }
    }, [userError, logout]);

    // Set initialCheckComplete after queries have settled
    React.useEffect(() => {
      // Both queries have completed (success or error)
      if (userStatus !== 'pending' && tokenStatus !== 'pending') {
        // console.log("[Auth] Initial check complete, queries have settled");
        setInitialCheckComplete(true);
      }
    }, [userStatus, tokenStatus]);

    // Handle routing logic based on authentication status
    React.useEffect(() => {
      // Only process routing once the initial check is complete
      if (!initialCheckComplete) {
        return;
      }

      if (isAuthenticated && user) {
        // Handle auth pages (login, register)
        if (routeRole === "auth") {
          // Redirect authenticated users away from login page
          if (redirect) {
            navigate(redirect);
          } else {
            navigate(DASHBOARD_ROUTE);
          }
        }
      } else if (!isAuthenticated && routeRole !== "auth" && routeRole !== "optional") {
        // Handle unauthenticated users trying to access protected routes
        navigate(`${LOGIN_ROUTE}?redirect=${location.pathname}`, {
          replace: true,
        });
      }
    }, [
      isAuthenticated,
      initialCheckComplete,
      redirect,
      navigate,
      location.pathname,
      user,
      routeRole
    ]);

    // Show loading state while initial checks are running
    if (!initialCheckComplete) {
      // console.log("[Render] Showing loading state, waiting for initial checks to complete");
      // console.log("[Render] User loading:", isUserLoading);
      // console.log("[Render] User status:", userStatus);
      // console.log("[Render] Token status:", tokenStatus);
      
      return (
        <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
          <Loader className="mb-4 animate-spin text-4xl" />
          <p>Loading...</p>
        </div>
      );
    }
    
    // For auth routes (login page), always render regardless of auth state
    if (routeRole === "auth" || routeRole === "optional") {
      // console.log("[Render] Rendering auth/optional route");
      return <Component {...(props as T)} user={user as MeResponse} />;
    }
    
    // For protected routes, only render if authenticated and have user data
    if (!isAuthenticated || !user) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center text-gray-800">
          <Loader className="mb-4 animate-spin text-4xl" />
          <p>Redirecting...</p>
        </div>
      );
    }

    // Render the component with user data
    return <Component {...(props as T)} user={user} />;
  };
  return ComponentWithAuth;
}