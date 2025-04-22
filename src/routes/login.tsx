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
import { components, formFields } from "./_authenticated";
import { useQueryClient } from "@tanstack/react-query";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: import.meta.env.VITE_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const RouteComponent = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  console.log("checking", location);

  useEffect(() => {
    if (user) {
      const returnTo = sessionStorage.getItem("returnTo") || "/";
      queryClient.invalidateQueries({ queryKey: ["get-current-user"] });
      navigate({ to: returnTo == "/login" ? "/" : returnTo });
    }
  }, [user]);

  if (!user) {
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
export const Route = createFileRoute("/login")({
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
