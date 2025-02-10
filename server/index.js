const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Complete homework", completed: false },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((todo) => todo.id !== parseInt(req.params.id));
  res.status(200).send("To-do deleted");
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (todo) {
    todo.completed = !todo.completed;
    res.status(200).json(todo);
  } else {
    res.status(404).send("To-do not found");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
