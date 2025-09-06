// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for comments
let comments = [];

// Route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Route to add a new comment
app.post('/comments', (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required' });
    }
    const newComment = { id: comments.length + 1, author, text, date: new Date() };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Route to delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(comment => comment.id === parseInt(id));
    if (commentIndex === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    const deletedComment = comments.splice(commentIndex, 1);
    res.json(deletedComment);
});

// Start the server
app.listen(port, () => {
    console.log(`Comments server running at http://localhost:${port}`);
});