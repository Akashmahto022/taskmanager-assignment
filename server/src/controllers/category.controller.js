import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const newCategory = new Category({
      name,
      owner: userId,
    });
    await newCategory.save();
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).json({ message: "Error creating category", error });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user._id;

  try {
    const category = await Category.findByIdAndDelete({
      _id: id,
      owner: userId,
    });

    if (!category) {
      res.status(500).json({
        status: false,
        message: "category not found with this id and owner id",
      });
    }

    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "error while deleting category", error });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user._id;

  try {
    const category = await Category.findByIdAndUpdate(
      { _id: id, user: userId },
      { name },
      { new: true, runValidators: true }
    );

    if (!category) {
        res.status(404).json({ message: 'Category not found'})
    }

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export { createCategory, updateCategory, deleteCategory };
