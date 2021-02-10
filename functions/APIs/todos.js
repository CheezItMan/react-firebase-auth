// todos.js

const { db } = require('../util/admin');

exports.updateTodo = (req, res) => {
  if (req.body.todoId || req.body.createdAt) {
    res.status(403).json({ message: 'Not allowed to edit' });
  }

  const document = db.collection('todos').doc(`${ req.params.todoId }`);

  document.update(req.body)
    .then(() => {
      res.json({ message: 'Update Successful ' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        error: err.code,
        msg: err.message,
      });
    });
}

exports.deleteTodo = (req, res) => {
  const document = db.doc(`/todos/${ req.params.todoId }`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Todo not found ' });
      }
      return document.delete();
    })
    .then(() => {
      res.json({ message: 'Delete successfull' });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

exports.postOneTodo = (req, res) => {
  console.log(`response has ${ Object.keys(req) }`);
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Must not be empty' });
  }

  if (req.body.title.trim() === '') {
    return res.status(400).json({ title: 'Mmust not be empty ' });
  }

  const newTodoItem = {
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().toISOString(),
  }

  console.log('*****');
  console.log(`newTodoItem = ${Object.keys(newTodoItem)}  values ${Object.values(newTodoItem)}`);
  console.log('*****');

  db
    .collection('todos')
    .add(newTodoItem)
    .then((doc) => {
      const responseTodoItem = newTodoItem;
      responseTodoItem.id = doc.id;
      return res.json(responseTodoItem);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Ooops!' });
      console.error(err);
    });
}

exports.getAllTodos = (req, res) => {
  db
    .collection('todos')
    .get()
    .then((data) => {
      let todos = [];
      console.log('responding')
      data.forEach((doc) => {
        todos.push({
          todoId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(todos);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}