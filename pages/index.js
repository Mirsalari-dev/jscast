import React, { useState, useEffect } from "react";
import Head from "next/head";
import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import { getPost } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";
import SkeletonPost from "../components/Skeleton/SkeletonPost";
import Modal from "../components/Modal/Modal";

export default function Home({ posts, error }) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => {
      setShowModal(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [showModal]);

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>جی اس کست</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/57/Code.svg"
        />
      </Head>
      {showModal && <Modal setShowModal={setShowModal} />}
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1">
          {!posts ||
            error && [(1, 2, 3, 4)].map((item) => <SkeletonPost key={item} />)}
          {posts &&
            !error &&
            posts.map((post) => <PostCard post={post.node} key={post.title} />)}
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
  } catch (err) {
    return {
      error: err,
    };
  }
}
