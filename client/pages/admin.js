import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { getEndpoint, adminLoginRequest } from "../src/api/admin.js";
import {
  Container,
  Input,
  Button,
  Field,
  Form,
  ErrorMessage,
  TableContainer
} from "../src/components/admin";
import Table from "../src/components/Table";

const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = async ({ username, password }) => {
    try {
      setErrorMessage("");
      const data = (await adminLoginRequest(username, password)).data;
      console.log("Data", data);
      setCookies("adminToken", data.token, { path: "/", maxAge: 3600 });
    } catch (e) {
      console.log("Error: ", e.response.data.message);
      setErrorMessage(e.response.data.message);
    }
  };
  const [cookies, setCookies, removeCookie] = useCookies(["adminToken"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [requests, setRequests] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Endpoints",
        columns: [
          {
            Header: "Method",
            accessor: "method"
          },
          {
            Header: "Endpoint",
            accessor: "endpoint"
          },
          {
            Header: "Requests",
            accessor: "requests"
          }
        ]
      }
    ],
    []
  );

  useEffect(() => {
    if (cookies.adminToken) {
      setIsLoaded(true);
      try {
        (async () => {
          const endpoints = (await getEndpoint()).data.endpoints;
          setRequests(endpoints);
        })();
      } catch (e) {
        console.log(e);
        removeCookie("adminToken");
      } finally {
        setIsLoaded(false);
      }
    }
  }, [cookies.adminToken, removeCookie]);

  if (isLoaded) {
    return <Container>Loading....</Container>;
  }

  if (cookies.adminToken) {
    return (
      <Container>
        <h1>Admin Page</h1>
        <TableContainer>
          <Table columns={columns} data={requests} />
        </TableContainer>
        <div>
          <Button
            backgroundColor="#f25f5c"
            type="button"
            onClick={() => removeCookie("adminToken")}>
            LOG OUT
          </Button>
        </div>
      </Container>
    );
  }

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
