import React, { useEffect, useState } from "react";
import { Button, Container, ErrorMessage, Field, Form, Input } from "../src/components/admin";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { getCurrentUser, signupRequest } from "../src/api/user";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../src/components/Loading";
import Header from "../src/components/Header";
import { toast } from "react-hot-toast";

const SignUpContainer = styled.div`
  font-size: 1rem;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "all"
  });

  const router = useRouter();
  const [cookies, setCookies, removeCookie] = useCookies(["userToken"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const onSubmit = async ({ username, email, password }) => {
    setIsLoaded(true);
    try {
      setErrorMessage("");
      const { token } = (await signupRequest(username, email, password)).data;
      setCookies("userToken", token, { path: "/", maxAge: 3600 });
    } catch (e) {
      console.log("Error: ", e.response.data.message);
      setErrorMessage(e.response.data.message);
    } finally {
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    if (cookies.userToken) {
      setIsLoaded(true);
      (async () => {
        try {
          const data = (await getCurrentUser()).data;
          if (data?.message) {
            await router.push("/");
          }
        } catch (e) {
          removeCookie("userToken");
          console.log(e);
        } finally {
          setIsLoaded(false);
        }
      })();
    }
  }, [cookies.userToken, removeCookie, router]);

  if (isLoaded) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Header />
      <Container>
        <h1>Signup</h1>
        <Form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}>
          <Field isError={errors.username}>
            <Image src="/nickname.png" width="32" height="32" alt="email" title="email" />
            <Input
              placeholder="Nickname"
              type="text"
              {...register("username", { required: true })}
            />
          </Field>
          <Field isError={errors.email}>
            <Image src="/email.png" width="32" height="32" alt="email" title="email" />
            <Input
              placeholder="Email"
              type="text"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </Field>
          <Field isError={errors.password}>
            <Image src="/locking.png" width="32" height="32" alt="password" title="password" />
            <Input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </Field>
          <Button type="submit">Create</Button>
        </Form>
        {(() => {
          if (errors?.username) {
            return <ErrorMessage>Username can not be empty</ErrorMessage>;
          }
          if (errors?.password) {
            return <ErrorMessage>Password can not be empty</ErrorMessage>;
          }
          if (errors?.email) {
            return (
              <ErrorMessage>{errors?.email?.message || "Email can not be empty"}</ErrorMessage>
            );
          }
        })()}
        {errorMessage !== "" ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
        <SignUpContainer>
          Already has an account?{" "}
          <Link href="/login">
            <a>Login here</a>
          </Link>
        </SignUpContainer>
      </Container>
    </Wrapper>
  );
};
export default Signup;
