import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPost = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              biography
              id
              name
              picture {
                url
              }
            }
            createdAt
            slug
            excerpt
            title
            coverImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        coverImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
export const getSimilarPosts = async (category, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $category: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { category_some: { slug_in: $category } }
        }
        last: 3
      ) {
        title
        coverImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, category });

  return result.posts;
};
export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      category {
        name
        slug
        slugIcon
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.category;
};
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        coverImage {
          url
        }
        author {
          name
          biography
          picture {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        category {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};
export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comments;
};
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts{
        author {
          name
          picture {
            url
          }
        }
        coverImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};