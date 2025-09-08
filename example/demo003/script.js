document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addButton = document.getElementById('add-button');
  const todoList = document.getElementById('todo-list');

  // ローカルストレージからTODOを読み込む
  const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      addTodoToList(todo.text, todo.completed);
    });
  };

  // TODOをローカルストレージに保存する
  const saveTodos = () => {
    const todos = [];
    todoList.querySelectorAll('li').forEach(li => {
      todos.push({
        text: li.querySelector('span').textContent,
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // TODOリストに新しい項目を追加する
  const addTodoToList = (text, completed = false) => {
    const li = document.createElement('li');
    if (completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    // 完了/未完了を切り替える
    span.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    li.appendChild(deleteButton);

    // 削除ボタンの処理
    deleteButton.addEventListener('click', () => {
      li.remove();
      saveTodos();
    });

    todoList.appendChild(li);
  };

  // 追加ボタンのクリックイベント
  addButton.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      addTodoToList(todoText);
      saveTodos();
      todoInput.value = '';
    }
  });

  // EnterキーでTODOを追加
  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });

  // 初期化
  loadTodos();
});