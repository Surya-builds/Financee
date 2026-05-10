const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

/*
========================
USER AUTHENTICATION
========================
*/

// CREATE USER (Signup)
router.post("/create", async (req, res) => {
  try {
    const userExists = await userModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    res.json({
      success: true,
      message: "User created successfully",
      user: user,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: user,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


/*
========================
USER DATA
========================
*/

// Retrieve full user data
router.post("/retrieve", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    res.json({ success: true, user: user });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


/*
========================
GOALS
========================
*/

// Add goal
router.post("/goals", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    if (user.goals.some((goal) => goal.name === req.body.goal.name)) {
      throw new Error("Goal already exists");
    }

    user.goals.push(req.body.goal);
    await user.save();

    res.json({
      success: true,
      message: "Goal created successfully",
      goal: req.body.goal,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// Get all goals
router.get("/goals", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    res.json({ success: true, goals: user.goals });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// Delete goal
router.delete("/goals/:name", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    user.goals = user.goals.filter(
      (goal) => goal.name !== req.params.name
    );

    await user.save();

    res.json({ success: true, message: "Goal deleted successfully" });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


/*
========================
LEDGER
========================
*/

// Add ledger entry
router.post("/ledger", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    user.ledger.push(req.body.data);
    await user.save();

    res.json({ success: true, message: "Ledger entry added" });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// Get ledger
router.get("/ledger", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    res.json({ success: true, ledger: user.ledger });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// Delete ledger entry
router.delete("/ledger/delete", async (req, res) => {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!user) throw new Error("User not found");

    const index = user.ledger.findIndex(
      (item) =>
        item.name === req.body.name &&
        item.amount === req.body.amount
    );

    if (index === -1) throw new Error("Expense not found");

    user.ledger.splice(index, 1);
    await user.save();

    res.json({ success: true, message: "Expense deleted successfully" });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;