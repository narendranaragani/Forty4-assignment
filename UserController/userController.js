import userModel from "../UserModel/userModel.js";

// POST /api/users
// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, phone, company, address } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "Name,email and phone feilds are required ",
      });
    }
    const existEmail = await userModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        message: "Email already existed..",
      });
    }
    const usersData = await userModel.create({
      name,
      email,
      phone,
      company,
      address,
    });
    res.status(201).json({
      message: "User created successfully",
      usersData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// @route GET /api/users
// Get all the users
export const getAllUsers = async (req, res) => {
  try {
    const Users = await userModel.find();
    if (!Users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }
    res.status(200).json({
      message: "Users fetched successfully",
      Users,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: err.message,
    });
  }
};

// @route GET /api/users/:id
// Get single user
export const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch user  ",
      error: err.message,
    });
  }
};

// @route PUT /api/users/:id
// Update user
export const updateUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully!!",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update user!!",
      error: err.message,
    });
  }
};

// @route DELETE /api/users/:id
// Delete user
export const deleteUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully!!",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user ",
      error: err.message,
    });
  }
};
