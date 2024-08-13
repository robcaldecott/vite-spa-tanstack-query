import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AlertCircle } from "lucide-react";
import { login } from "../api";
import { Alert, AlertDescription, AlertTitle } from "../components/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { LoadingButton } from "../components/loading-button";
import type { Session } from "../types";

export function Component() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const loginMutation = useMutation<
    Session,
    Error,
    { email: string; password: string }
  >({
    mutationFn: (variables) => login(variables.email, variables.password),
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        loginMutation.mutate(
          {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
          },
          {
            onSuccess: (data) => {
              // Redirect to the home page
              Cookies.set("token", data.token);
              navigate(searchParams.get("to") ?? "/");
            },
          },
        );
      }}
    >
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-r from-cyan-500 to-primary">
        <Card className="m-6 w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue="jane.doe@company.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="verystrongpassword"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <LoadingButton
              loading={loginMutation.isPending}
              type="submit"
              className="w-full"
            >
              Sign in
            </LoadingButton>
          </CardFooter>

          {loginMutation.isError && (
            <CardFooter>
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>Oops!</AlertTitle>
                <AlertDescription>
                  {loginMutation.error.message}
                </AlertDescription>
              </Alert>
            </CardFooter>
          )}
        </Card>
      </div>
    </form>
  );
}
Component.displayName = "Login";
