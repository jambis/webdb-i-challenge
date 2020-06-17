const router = require("express").Router();
const db = require("../data/helpers/budgetModel");

router.get("/", async (req, res) => {
  try {
    const budgets = await db.get(req.query);

    res.status(200).json(budgets);
  } catch {
    res.status(500).json({ error: "Failed to fetch budgets." });
  }
});

router.get("/:id", validateID, async (req, res) => {
  res.status(200).json(req.budget);
});

router.post("/", validateBudget, async (req, res) => {
  try {
    const budget = await db.insert({
      name: req.body.name,
      budget: req.body.budget
    });

    res.status(201).json(budget);
  } catch {
    res.status(500).json({ error: "Failed to add the budget" });
  }
});

router.put("/:id", validateID, validateBudget, async (req, res) => {
  try {
    const budget = await db.update(req.params.id, {
      name: req.body.name,
      budget: req.body.budget
    });

    res.status(202).json(budget);
  } catch {
    res.status(500).json({ error: "Failed to update the budget with that ID" });
  }
});

router.delete("/:id", validateID, async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);

    deleted ? res.status(202).json({ message: "Budget entry deleted" }) : null;
  } catch {
    res.status(500).json({ error: "Failed to delete the budget with that ID" });
  }
});

async function validateID(req, res, next) {
  try {
    const budget = await db.get(null, req.params.id);
    req.budget = budget;
    budget
      ? next()
      : res.status(404).json({ message: "Budget with that ID was not found" });
  } catch {
    res.status(500).json({ error: "Failed to fetch the budget with that ID" });
  }
}

function validateBudget(req, res, next) {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({
      message: "Please provide the required name and budget."
    });
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({
      message: "Budget must be a number."
    });
  } else {
    next();
  }
}

module.exports = router;
