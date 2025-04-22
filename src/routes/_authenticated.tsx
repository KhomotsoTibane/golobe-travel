import { createFileRoute, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Heading,
  Image,
  PhoneNumberField,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { userQueryOptions } from "@/lib/api";

import Logo from "@/assets/images/logo.png";
import { Baku } from "@/assets/images";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

export const components = {
  Header() {
    return (
      <View className="mb-6">
        <Image alt="Golobe logo" src={Logo} style={{ height: 36 }} />
      </View>
    );
  },
  SignIn: {
    Header() {
      return (
        <View className="mb-4">
          <Heading level={3} className="text-2xl font-bold">
            Sign In
          </Heading>
          <p className="text-muted-foreground mt-2">Sign in to access your Golobe account</p>
        </View>
      );
    },
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-6">
          <p className="">
            Don’t have an account?{" "}
            <button onClick={toSignUp} className="text-accent-500 hover:underline">
              Sign up
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <View className="mb-4">
          <Heading level={3} className="text-2xl font-bold">
            Sign up
          </Heading>
          <p className="text-muted-foreground mt-2">
            Let’s get you all set up so you can access your personal account.
          </p>
        </View>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button onClick={toSignIn} className="text-primary hover:underline">
              Login
            </button>
          </p>
        </View>
      );
    },
  },
};

export const formFields = {
  signIn: {
    username: {
      label: "Email",
      placeholder: "john.doe@gmail.com",
      isRequired: true,
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
      isRequired: true,
    },
  },
  signUp: {
    given_name: {
      order: 1,
      label: "First Name",
      placeholder: "John",
      isRequired: true,
    },
    family_name: {
      order: 2,
      label: "Last Name",
      placeholder: "Doe",
      isRequired: true,
    },
    email: {
      order: 3,
      label: "Email",
      placeholder: "john.doe@gmail.com",
      isRequired: true,
    },
    phone_number: {
      order: 4,
      label: "Phone number",
      placeholder: "071 224 8547",
      isRequired: true,
    },
    birthdate: {
      order: 4,
      label: "Birthdate",
      placeholder: "YYYY-MM-DD",
      isRequired: true,
    },
    password: {
      order: 5,
      label: "Password",
      placeholder: "Create a password",
      isRequired: true,
    },
    confirm_password: {
      order: 6,
      label: "Confirm Password",
      placeholder: "Confirm your password",
      isRequired: true,
    },
  },
};

const RouteComponent = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const returnTo = sessionStorage.getItem("returnToAuthRoute") || "/";
      sessionStorage.removeItem("returnToAuthRoute");
      navigate({ to: returnTo });
    }
  }, [user]);

  if (!user) {
    sessionStorage.setItem("returnToAuthRoute", location.pathname);
    return (
      <div className="grid grid-cols-2 max-h-screen max-w-screen-2xl mx-auto">
        <div className=" col-span-1  h-screen flex items-center justify-center">
          <Authenticator
            components={components}
            formFields={formFields}
            className=""
            signUpAttributes={["given_name", "family_name", "birthdate", "phone_number"]}
          >
            {() => <>{children}</>}
          </Authenticator>
        </div>
        <div className="col-span-1  h-screen flex items-center justify-center">
          <div className=" items-center w-10/12 rounded-lg max-h-[720px] overflow-hidden">
            <img
              src={Baku}
              alt="Hotel Resort"
              className="h-full w-full object-cover rounded-l-xl"
            />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    console.log("user here");
  }

  return (
    <>
      <main className="relative">
        <div className="my-30 px-20">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location, context }) => {
    const queryClient = context.queryClient;

    try {
      const user = await queryClient.fetchQuery(userQueryOptions);
      return { user };
    } catch (error) {
      console.error("e", error);
      return { user: null };
    }
  },
  component: RouteComponent,
});
