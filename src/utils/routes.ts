export const API_ROUTES = {
  GET_ALL_BLOGS: `${process.env.NEXT_PUBLIC_API_URL}/blogs-list`,
  GET_BLOG_BY_ID: `${process.env.NEXT_PUBLIC_API_URL}/blog-details`,
  ADD_BLOG: `${process.env.NEXT_PUBLIC_API_URL}/create-blog`,
  UPDATE_BLOG: `${process.env.NEXT_PUBLIC_API_URL}/update-blog`,
  DELETE_BLOG: `${process.env.NEXT_PUBLIC_API_URL}/delete-blog`,
  SEARCH_BLOG: `${process.env.NEXT_PUBLIC_API_URL}/search-blog`,

  COMMENTS: `${process.env.NEXT_PUBLIC_API_URL}/comments`,
  COMMENT_DETAILS: `${process.env.NEXT_PUBLIC_API_URL}/comments/commentDetails`,

  GET_ALL_PRODUCTS: `${process.env.NEXT_PUBLIC_API_URL}/products`,

  CART_DETAILS: `${process.env.NEXT_PUBLIC_API_URL}/cart-details`,
  ADD_TO_CART: `${process.env.NEXT_PUBLIC_API_URL}/add-to-cart`,
  DELETE_CART: `${process.env.NEXT_PUBLIC_API_URL}/delete-cart`,

  CREATE_ACCOUNT: `${process.env.NEXT_PUBLIC_API_URL}/add-user`,
  LOGIN: `${process.env.NEXT_PUBLIC_API_URL}/login`,
};
