import Post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
    try {
        const newPost = await Post.create({ caption, image, user });
        // const newPost = new Post({ caption, image, user });
        // await newPost.save();
        return newPost;
    } catch(error) {
        console.log(error);
    }
}

export const findAllPosts = async () => {
    try {
        const posts = await Post.find();
        return posts;
    } catch(error) {
        console.log(error);
    }
}

export const findPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch(error) {
        console.log(error);
    }
}

export const deletePostById = async (id) => {
    try {
        const post = await Post.findByIdAndDelete(id);
        return post;
    } catch(error) {
        console.log(error);
    }
}