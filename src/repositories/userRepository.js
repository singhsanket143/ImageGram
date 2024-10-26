import User from "../schema/user.js";

export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const findAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const findUserByIdRepo = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (userId, updates) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (user) => {
  try {
    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
