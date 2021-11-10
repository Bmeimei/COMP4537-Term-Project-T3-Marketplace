import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useCookies } from "react-cookie";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: block;
  flex-direction: column;
  background-color: #2c2a4a;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  margin: 1rem 0;
  padding: 1em;
  border-radius: 0.35rem;
  border: 1px solid rgba(170, 208, 229, 0.15);
`;

const Field = styled.div`
  display: flex;
  margin: 0 0 1rem;
  padding: 0.5rem 0.3rem;
  clear: both;
  width: 100%;
  line-height: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ebebeb;
  &:focus-within {
    border-color: #be97c6;
  }
`;

const Input = styled.input`
  background-color: transparent;
  flex: 1 0 auto;
  max-width: 100%;
  min-width: 20vw;
  border: none;
  outline: none;
  color: #ffffff;
  &::placeholder {
    color: gray;
  }
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  padding-block: 0.2rem;
  cursor: pointer;
  background-color: #00b5ad;
  box-shadow: inset 0 0 0 0 rgb(34 36 38 / 15%);
  color: #ffffff;
  text-shadow: none;
  vertical-align: baseline;
  border-radius: 0.3rem;
`;

const ErrorMessage = styled.h4`
  color: red;
`;
const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async ({ username, password }) => {
    try {
      setErrorMessage("");
      const data = (
        await axios.post("http://localhost:5050/admin/login", {
          username,
          password
        })
      ).data;
      console.log("Data", data);
      setCookies("adminToken", data.token, { path: "/" });
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
