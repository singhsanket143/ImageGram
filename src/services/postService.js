import { countAllPosts, createPost, deletePostById, findAllPosts, updatePostById } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    // const user = createPostObejct.user; add later

    const post = await createPost(caption, image);

    return post;
}

export const getAllPostsService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments
    }

}

export const deletePostService = async (id) => {
    // call the repository function
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    // call the repository function
    // hW: try top impl the logic to delete old image from aws in case of update of post image
    const response = await updatePostById(id, updateObject);
    return response;
}