import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetUser } from "@/services/users/queries";
import { useCreateUser, useUpdateUser } from "@/services/users/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/hooks/use-toast";
import { useEffect } from "react";

interface UserFormData {
  email: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
}

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const { data: user } = useGetUser(id || "", isEdit);
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    if (user && isEdit) {
      reset({
        email: user.email,
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, isEdit, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEdit && id) {
        await updateUser.mutateAsync({
          id,
          payload: {
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
          },
        });
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        if (!data.password) {
          toast({
            title: "Error",
            description: "Password is required for new users",
            variant: "destructive",
          });
          return;
        }
        await createUser.mutateAsync({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        });
        toast({
          title: "Success",
          description: "User created successfully",
        });
      }
      navigate("/users");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save user",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          {isEdit ? "Edit User" : "New User"}
        </h1>
        <p className="text-muted-foreground">
          {isEdit ? "Update user information" : "Add a new user to the system"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {!isEdit && (
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: !isEdit })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...register("phoneNumber")} />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEdit ? "Update" : "Create"} User
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/users")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

