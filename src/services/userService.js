import {
  createUser,
  deleteUserById,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUserById,
} from "../repositories/userRepository.js";
export const createUserService = async (createUserObject) => {
  try {
    const { username, email, password } = createUserObject;

    const user = await createUser(username, email, password);
    return user;
  } catch (error) {
    return error;
  }
};

export const findUserByEmailService = async (email) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (error) {
    return error;
  }
};

export const findUserByIdService = async (id) => {
  try {
    const user = await findUserById(id);
    return user;
  } catch (error) {
    return error;
  }
};

export const getAllUsersService = async () => {
  try {
    const users = await findAllUsers();
    return users;
  } catch (error) {
    return error;
  }
};

export const updateUserByIdService = async (id, updateObject) => {
  try {
    const user = await updateUserById(id, updateObject);
    return user;
  } catch (error) {
    return error;
  }
};

export const deleteUserByIdService = async (id) => {
  try {
    const user = await deleteUserById(id);
    return user;
  } catch (error) {
    return error;
  }
};
