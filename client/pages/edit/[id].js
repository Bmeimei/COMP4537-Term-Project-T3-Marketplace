import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../src/components/Header";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { getCurrentUser } from "../../src/api/user";
import { useCookies } from "react-cookie";
import { MenuItem, Select } from "@material-ui/core";
import { getAllCategory } from "../../src/api/category";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import { getItemById, updateItem } from "../../src/api/item";
import { toast } from "react-hot-toast";
import Loading from "../../src/components/Loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const MODULES = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

const FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent"
];

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  margin-inline: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  margin: 1rem 0;
  padding: 1em;
  border-radius: 0.35rem;
  border: 1px solid rgba(170, 208, 229, 0.15);
  gap: 1.3rem;
`;

const Field = styled.div`
  display: flex;
  line-height: 1.4;
  input {
    font-weight: 400;
    padding: 0.67857143em 1em;
    background: #fff;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.28571429rem;
    transition: box-shadow 0.1s ease, border-color 0.1s ease;
    box-shadow: none;
    flex: 1 0 auto;
    max-width: 100%;
    min-width: 40vw;
  }
  text-align: left;
`;

const SelectBox = styled(Select)`
  flex: 1 0 auto;
  max-width: 100%;
  min-width: 40vw;
  div {
    padding: 0.67857143em 1em;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  max-width: 10rem;
  margin: 0;
  background-color: #e8e8e8;
  background-image: none;
  padding: 0.5rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 700;
  border: 0 solid transparent;
  border-radius: 0.28571429rem;
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  line-height: 1.5rem;
  padding-block: 0.2rem;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor || "#00b5ad"};
  box-shadow: inset 0 0 0 0 rgb(34 36 38 / 15%);
  color: #ffffff;
  text-shadow: none;
  vertical-align: baseline;
  border-radius: 0.3rem;
`;

const ErrorMessage = styled.h4`
  color: red;
`;

const UploadImageContainer = styled.div`
  display: block;
  line-height: 1.7;
`;

const UploadImageButton = styled.button`
  position: relative;
  color: #175199;
  height: auto;
  padding: 0;
  line-height: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  margin: 0;
  align-content: center;
`;

const CameraSpan = styled.span`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const headersData = [
  {
    label: "Listings",
    page: "/"
  },
  {
    label: "My Account",
    page: "/me"
  },
  {
    label: "Log In",
    page: "/login"
  }
];

const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const EditItem = () => {
  const router = useRouter();
  const id = router.query.id;
  const [item, setItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["userToken"]);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: "all"
  });

  const descriptionContent = watch("description");
  const image = watch("image");
  const onDescriptionChange = useCallback(
    (e) => {
      setValue("description", e);
    },
    [setValue]
  );

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

  useEffect(() => {
    if (cookies.userToken) {
      setIsLoaded(true);
      (async () => {
        try {
          (await getCurrentUser()).data;
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
    setIsLoaded(true);
    (async () => {
      try {
        const categoryData = (await getAllCategory()).data;
        setCategories(categoryData.categories);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoaded(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (item?.name) {
      setValue("name", item.name);
      setValue("price", item.price);
      setValue("description", item.description);
      setValue("category", item.category.name);
      setValue("image", item.image);
    }
  }, [item, setValue]);

  const onSubmit = useCallback(
    async (data) => {
      if (!image) {
        setErrorMessage("Please upload the image");
        return;
      }
      setErrorMessage("");
      setIsLoaded(true);
      try {
        const { name, category, price, image, description } = data;
        const response = await updateItem(id, name, price, description, category, image);
        console.log(response);
        await router.push("/");
        toast.success("Successfully update your post!😎");
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setIsLoaded(false);
      }
    },
    [id, image, router]
  );

  const uploadImage = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoaded(true);
      try {
        const formData = new FormData();
        formData.append("files", e.target.files[0]);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        setValue("image", `${process.env.NEXT_PUBLIC_IMAGE_SERVER}${data[0].url}`);
        setErrorMessage("");
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoaded(false);
      }
    },
    [setValue]
  );

  if (isLoaded || !item.name) {
    return <Loading />;
  }

  return (
    <Container>
      <Header headersData={headersData} />
      <Wrapper>
        <h1>Post your Item</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}>
          <Field>
            <Title>Name</Title>
            <input {...register("name", { required: true })} />
          </Field>
          <Field>
            <Title>Price</Title>
            <input type="number" {...register("price", { required: true, min: 0 })} />
          </Field>
          <Field>
            <Title>Category</Title>
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              defaultValue={item.category.name}
              render={({ field }) => (
                <SelectBox {...field}>
                  {categories.map((category, index) => (
                    <MenuItem value={category?.name} key={index}>
                      {category?.name || ""}
                    </MenuItem>
                  ))}
                </SelectBox>
              )}
            />
          </Field>
          <ReactQuill
            theme="snow"
            value={descriptionContent || ""}
            onChange={onDescriptionChange}
            formats={FORMATS}
            modules={MODULES}
            placeholder="Please input your description here~"
          />
          <UploadImageContainer>
            <UploadImageButton>
              <ImageInput type="file" accept="image/*" onChange={uploadImage} />
              <CameraSpan>
                <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path d="M20.094 6S22 6 22 8v10.017S22 20 19 20H4.036S2 20 2 18V7.967S2 6 4 6h3s1-2 2-2h6c1 0 2 2 2 2h3.094zM12 16a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0 1.5a5 5 0 1 0-.001-10.001A5 5 0 0 0 12 17.5zm7.5-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
              </CameraSpan>
              Upload Image
            </UploadImageButton>
          </UploadImageContainer>
          {image && (
            <Image
              src={image}
              title="image"
              alt="image"
              width={50}
              height={50}
              objectFit="fill"
              layout="responsive"
              placeholder="blur"
              blurDataURL="/loading.png"
            />
          )}
          <Button type="submit" backgroundColor="#56cbf9">
            Update
          </Button>
        </Form>
        {(() => {
          if (errors?.name) {
            return <ErrorMessage>Item Name can not be empty</ErrorMessage>;
          }
          if (errors?.price) {
            return <ErrorMessage>Price must be a non-negative number!</ErrorMessage>;
          }
          if (errors?.category) {
            console.log("error!");
            return <ErrorMessage>Please choose one Category</ErrorMessage>;
          }
        })()}
        {errorMessage !== "" ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
      </Wrapper>
    </Container>
  );
};

export default EditItem;
