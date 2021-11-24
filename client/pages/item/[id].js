import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../src/components/Loading";
import { toast } from "react-hot-toast";
import { getItemById } from "../../src/api/item";

const Item = () => {
  const router = useRouter();
  const [item, setItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const id = router.query.id;
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
  }, [router]);

  if (isLoaded) {
    return <Loading />;
  }

  return <div>{router.query.id}</div>;
};

export default Item;
