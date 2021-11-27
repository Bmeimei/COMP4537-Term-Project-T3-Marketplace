import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../src/components/Loading";
import { toast } from "react-hot-toast";
import { getItemById } from "../../src/api/item";
import styled from "styled-components";
import Header from "../../src/components/Header";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Divider } from "@mui/material";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding-inline: 2rem;
  padding-block: 3rem;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 5rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.3rem;
`;

const Image = styled.img`
  max-width: 40rem;
  max-height: 40rem;
  object-fit: fill;
`;

const Item = () => {
  const router = useRouter();
  const id = router.query.id;
  const [item, setItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoaded(true);
      (async () => {
        try {
          const data = (await getItemById(id)).data;
          setItem(data.item);
          console.log(data.item);
        } catch (e) {
          console.log(e);
          // eslint-disable-next-line no-unused-vars
          router.push("/404").then((_) => toast.error("Item Not Found🥲"));
        } finally {
          setIsLoaded(false);
        }
      })();
    }
  }, [id, router]);

  if (isLoaded || !item.name) {
    return <Loading />;
  }

  return (
    <Container>
      <Header />
      <Wrapper>
        <ImageContainer>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={item.image} title="image" alt="image" />
        </ImageContainer>
        <Info>
          <h2>{item.name}</h2>
          <h3>Category: {item.category.name}</h3>
          <h4>${item.price}</h4>
          <p>Post Time: {moment(item.createdAt).format("YYYY-MM-DD, HH:mm")}</p>
          <Divider />
          <h3>Owner: {item.user.username}</h3>
          <h4>Email: {item.user.email}</h4>
          <Divider />
          <h3>Description:</h3>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{item.description}</ReactMarkdown>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default Item;
