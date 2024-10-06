import { createPost } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    // const user = createPostObejct.user; add later

    const post = await createPost(caption, image);

    return post;
}