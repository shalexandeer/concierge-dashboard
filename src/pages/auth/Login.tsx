import { useSearchParams } from "react-router-dom";
import { Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useLogin } from "@/services/auth/mutations";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AxiosError } from "axios";
import { ApiResponse } from "@/lib/types/api";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

function Login() {
  const [params] = useSearchParams();
  const redirect = params.get("redirect");

  const loginMutation = useLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (data: FormValues) => {
    console.log(data);

    loginMutation.mutateAsync(
      {
        username: data.username,
        password: data.password,
      },
      {
        onSuccess: (_) => {
          toast.success("Login successful");
          window.location.href = redirect || "/dashboard";
        },
        onError: (error: AxiosError<ApiResponse<boolean>> | Error) => {
          if (error instanceof Error && error.message === "Access denied. Insufficient permissions.") {
            toast.error("Access denied. You don't have permission to access this application.");
            return;
          }
          if (error instanceof AxiosError && error.response?.data.message == "Invalid username or password") {
            toast.error("Invalid username or password");
            return;
          }
          toast.error("An error occurred during login");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Recycle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 text-3xl font-display font-bold tracking-tight">
            Concierge
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Concierge Management System
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Sign in to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full mt-4 transition-all duration-300"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 Concierge. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
