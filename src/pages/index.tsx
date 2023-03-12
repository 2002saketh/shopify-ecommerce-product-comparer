import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Image from "next/image";

const Home: NextPage = () => {
  const getProductsFromDomTree = api.products.getProductsFromDomTree.useQuery(
    { text: "from tRPC" },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(getProductsFromDomTree.data);

  if (getProductsFromDomTree.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {getProductsFromDomTree.data?.map((product) => {
          if (!product) return "";
          return (
            <div key={product.id}>
              <h1>{product.title}</h1>
              <Image
                src={product.image}
                alt={product.alt ?? product.title}
                width={product.imageWidth}
                height={product.imageHeight}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
