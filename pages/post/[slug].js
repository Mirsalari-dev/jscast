import React from "react";
import { getPost, getPostDetails } from "../../services";
import PostDetail from "../../components/PostDetail";
import Author from "../../components/Author";
import AdjacentPosts from "../../components/AdjacentPosts";
import CommentsForm from "../../components/CommentsForm";
import Comments from "../../components/Comments";
import PostWidget from "../../components/PostWidget";
import Categories from "../../components/Categories";

const postDetails = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link
          rel="icon"
          href="https://upload.wikimedia.org/wikipedia/commons/5/57/Code.svg"
        />
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                category={post.category.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default postDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPost();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
