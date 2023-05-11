import { $host, $authhost } from ".";

export const getPosts = async (page, limit = 20) => {
  const { data } = await $host.get("api/posts", { params: { page, limit } });
  return data;
};

export const editPost = async (post) => {
  const { data } = await $authhost.put("api/posts", post);
  return data;
};

export const deletePost = async (id) => {
  const { data } = await $authhost.delete("api/posts/" + id);
  return data;
};

export const createPost = async (post) => {
  console.log(post);
  const { data } = await $authhost.post("api/posts", post);
  return data;
};
