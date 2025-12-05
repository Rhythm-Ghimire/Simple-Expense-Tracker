const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.static('frontend'));
app.use(express.json());

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

app.post('/expenses', async (req, res) => {
  const { name, amount } = req.body;

  try {
    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
      },
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Error adding expense' });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.expense.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

app.get('/expenses/total', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on the port: ${PORT}`);
});
