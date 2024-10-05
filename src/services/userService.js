import { createUser } from "../repositories/userRepository.js";
export const createUserService = async (createUserObject) => {
  try {
    const { username, email, password } = createUserObject;

    const user = await createUser(username, email, password);
    return user;
  } catch (error) {
    return error;
  }
};
