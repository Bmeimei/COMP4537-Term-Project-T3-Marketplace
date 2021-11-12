import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { loginRequest } from "../src/api/admin.js";
import { Container, Input, Button, Field, Form, ErrorMessage } from "../src/components/admin";

const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async ({ username, password }) => {
    try {
      setErrorMessage("");
      const data = (await loginRequest(username, password)).data;
      console.log("Data", data);
      setCookies("adminToken", data.token, { path: "/", maxAge: 3600 });
    } catch (e) {
      console.log("Error: ", e.response.data.message);
      setErrorMessage(e.response.data.message);
    }
  };
  const [cookies, setCookies] = useCookies(["adminToken"]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Token", cookies.adminToken);
  }, [cookies.adminToken]);

  return (
    <Container>
      <h1>Admin Login</h1>
      <Form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}>
        <Field isError={errors.username}>
          <Image src="/nickname.png" width="32" height="32" alt="username" title="username" />
          <Input placeholder="Username" type="text" {...register("username", { required: true })} />
        </Field>
        <Field isError={errors.password}>
          <Image src="/locking.png" width="32" height="32" alt="password" title="password" />
          <Input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </Field>
        <Button type="submit">Login</Button>
      </Form>
      {(() => {
        if (errors?.username) {
          return <ErrorMessage>Username can not be empty</ErrorMessage>;
        }
        if (errors?.password) {
          return <ErrorMessage>Password can not be empty</ErrorMessage>;
        }
      })()}
      {errorMessage !== "" ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
    </Container>
  );
};

export default Admin;
