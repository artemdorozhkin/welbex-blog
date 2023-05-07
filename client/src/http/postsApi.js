import { $host, $authhost } from ".";

export const getPosts = async () => {
  const { data } = await $host.get("api/posts");
  return data;
};

export const editPost = async (id, message, file) => {
  const { data } = await $authhost.put("api/posts", { id, message, file });
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
