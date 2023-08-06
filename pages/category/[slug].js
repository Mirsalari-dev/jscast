import React from "react";
import { getCategories, getCategoryDetails } from "../../services";
import Head from "next/head";
import SkeletonPost from "../../components/Skeleton/SkeletonPost";
import PostWidget from "../../components/PostWidget";
import PostCard from "../../components/PostCard";
import Categories from "../../components/Categories";

const categoryDetails = ({ category, error }) => {

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>{category && category[0].name}</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/57/Code.svg"
        />
      </Head>
      <div className="bg-white text-center shadow-lg rounded-lg p-8 mb-8">
        <span className="text-center"> مطالب آموزشی {category && category[0].name}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 ">
        <div className="lg:col-span-8 col-span-1">
          {!category ||
            (error &&
              [(1, 2, 3, 4)].map((item) => <SkeletonPost key={item} />))}
          {category &&
            !error &&
            category[0]?.posts?.map((post) => (
              <PostCard post={post} key={post.title} />
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
};

export default categoryDetails;

export async function getStaticProps({ params }) {
  const data = (await getCategoryDetails(params.slug)) || null;
  return {
    props: {
      category: data,
    },
  };
}

export async function getStaticPaths() {
  const categories = (await getCategories()) || null;
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
