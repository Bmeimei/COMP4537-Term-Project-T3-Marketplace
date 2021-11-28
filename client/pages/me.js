import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../src/components/Header";
import Loading from "../src/components/Loading";
import { getCurrentUser } from "../src/api/user";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductCard from "../src/components/ProductCard";
import { toast } from "react-hot-toast";
import { deleteItemById, displayItemById, hideItemById } from "../src/api/item";
import Link from "next/link";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding-inline: 2rem;
  padding-block: 3rem;
  justify-content: flex-start;
  align-content: center;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 0.3rem;
  justify-content: center;
  align-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor || "null"};
  cursor: pointer;
`;

const Me = () => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["userToken"]);
  const router = useRouter();

  const fetchUser = useCallback(() => {
    if (cookies.userToken) {
      setIsLoaded(true);
      (async () => {
        try {
          const { data } = await getCurrentUser();
          setUser(data.user);
          setItems(data.user.items);
        } catch (e) {
          removeCookie("userToken");
          await router.push("/");
          console.log(e);
        } finally {
          setIsLoaded(false);
        }
      })();
    } else {
      (async () => {
        setIsLoaded(true);
        await router.push("/");
        setIsLoaded(false);
      })();
    }
  }, [cookies.userToken, removeCookie, router]);

  useEffect(() => {
    fetchUser();
  }, [cookies.userToken, fetchUser, removeCookie, router]);

  const hideItem = useCallback(
    async (id) => {
      try {
        await hideItemById(id);
        toast.success("Successfully Hide this item👍");
        fetchUser();
      } catch (e) {
        toast.error("Can not hide this item😭");
        console.log(e);
      }
    },
    [fetchUser]
  );

  const displayItem = useCallback(
    async (id) => {
      try {
        await displayItemById(id);
        toast.success("Successfully Hide this item👍");
        fetchUser();
      } catch (e) {
        toast.error("Can not hide this item😭");
        console.log(e);
      }
    },
    [fetchUser]
  );

  const deleteItem = useCallback(
    async (id) => {
      try {
        await deleteItemById(id);
        toast.success("Successfully delete this item");
        fetchUser();
      } catch (e) {
        toast.error("Can not delete this item😭");
        console.log(e);
      }
    },
    [fetchUser]
  );

  if (isLoaded || !user) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />
      <Wrapper>
        <UserContainer>
          <h2>Username: {user.username}</h2>
          <h3>Email: {user.email}</h3>
        </UserContainer>
        <Divider />
        <div>
          <h2>Post Items</h2>
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
            {items
              .filter((i) => i.isValid)
              .map((item) => (
                <Grid item xs={1} sm={2} md={4} key={item._id}>
                  <>
                    <ProductCard
                      price={item.price}
                      title={item.name}
                      image={item.image}
                      href={`/item/${item._id}`}
                    />
                    <Link href={`/edit/${item._id}`} passHref>
                      <Button backgroundColor="#b8bedd">Edit</Button>
                    </Link>
                    <Button backgroundColor="#2ebfa5" onClick={() => hideItem(item._id)}>
                      Hide
                    </Button>
                    <Button backgroundColor="#f15156" onClick={() => deleteItem(item._id)}>
                      Delete
                    </Button>
                  </>
                </Grid>
              ))}
          </Grid>
        </div>
        <Divider />
        <div>
          <h2>Hidden Items</h2>
          <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 2, md: 20 }}>
            {items
              .filter((i) => !i.isValid)
              .map((item) => (
                <Grid item xs={1} sm={2} md={4} key={item._id}>
                  <>
                    <ProductCard
                      price={item.price}
                      title={item.name}
                      image={item.image}
                      href={`/item/${item._id}`}
                    />
                    <Link href={`/edit/${item._id}`} passHref>
                      <Button backgroundColor="#b8bedd">Edit</Button>
                    </Link>
                    <Button backgroundColor="#2ebfa5" onClick={() => displayItem(item._id)}>
                      Display
                    </Button>
                    <Button backgroundColor="#f15156" onClick={() => deleteItem(item._id)}>
                      Delete
                    </Button>
                  </>
                </Grid>
              ))}
          </Grid>
        </div>
      </Wrapper>
    </Container>
  );
};

export default Me;
