const path = require('path');
const fs = require('fs');
const { prisma } = require('../prisma/prisma-client');

const home_page = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).render('home', { users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

const add_user_page = async (req, res) => {
  res.status(200).render('add-user');
}

const edit_user_page = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    res.status(200).render('edit-user', { user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user for editing", error });
  }
};

const add_user = async (req, res) => {
  const data = req.body;

  if (!data.name || !data.email || !data.phone || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await prisma.user.create({
      data: {
        ...data,
        image: req.file ? req.file.filename : null,
      }
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const edit_user = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let newImage = user.image;

    if (req.file) {
      newImage = req.file.filename;

      if (user.image) {
        const oldImagePath = path.join(__dirname, '../public/images', user.image);

        fs.unlink(oldImagePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error("Error deleting old image:", err);
          }
        });
      }
    }

    await prisma.user.update({
      where: { id },
      data: { ...data, image: newImage },
    });

    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const remove_user = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { image: true },
    });

    if (user && user.image) {
      const imagePath = path.join(__dirname, '../public/images', user.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  home_page,
  add_user_page,
  edit_user_page,
  add_user,
  edit_user,
  remove_user,
};