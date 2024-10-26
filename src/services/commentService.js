import { addComment } from "../repositories/commentRepository.js";

export const createCommentService = async (commentObject) => {
  try {
    await addComment(commentObject);
  } catch (error) {
    throw error;
  }
};
