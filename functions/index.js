const functions = require('firebase-functions');
const app = require('express')();

const { loginUser, } = require('./APIs/users');



const {
  getAllTodos,
  postOneTodo,
  deleteTodo,
  updateTodo,
} = require('./APIs/todos');

app.get('/todos', getAllTodos);
app.post('/todos', postOneTodo);
app.delete('/todos/:todoId', deleteTodo);
app.put('/todos/:todoId', updateTodo);

app.post('/login', loginUser);

exports.api = functions.https.onRequest(app);
