import React, { useState, useEffect } from "react";
import Head from "next/head";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import { getPost } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";
import useTitle from "../helper/useTitle";
import SkeletonPost from "../components/Skeleton/SkeletonPost";

export default function Home({ posts }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setShowModal(false);
    }, 12000);
    return () => clearInterval(interval);
  }, [showModal]);

  useTitle("جی اس کست");

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>جی اس کست</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/57/Code.svg"
        />
      </Head>
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
          <div className="lg:col-span-8 col-span-1">
            {!posts && [1, 2, 3, 4].map((item) => <SkeletonPost key={item} />)}
            {posts &&
              posts.map((post) => (
                <PostCard post={post.node} key={post.title} />
              ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="lg:sticky relative top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const posts = await getPost();
    return {
      props: { posts },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
