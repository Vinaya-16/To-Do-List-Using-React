import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let todos = [];

app.get('/todos', (req,res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };

    todos.push(todo);
    res.json(todo);
});

app.delete('/todos/:id', (req,res) => {
    const id = Number(req.params.id);

    todos = todos.filter(t => t.id !== id);

    res.json({ message: "Deleted" });
});

app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);

    todos = todos.map(todo => 
        todo.id === id ?
            {...todo, completed: !todo.completed}
            : todo
    );

    res.json({message: "Updated"});
});

app.listen(5000, () => {
    console.log("Server running");
});