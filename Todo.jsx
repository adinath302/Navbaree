import React, { useEffect, useState } from 'react'

const Todo = () => {
  const [input, setinput] = useState('');
  const [todos, settodo] = useState([]);
  const [hover, sethover] = useState(false)
  const [filter, setfilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const Handletodo = () => {
    if (input.trim() === '') return; // it will remove the extra spacing form the text
    const newtodo = {
      id: Date.now(),
      text: input,
      complete: false,
    }
    settodo([...todos, newtodo]);
    setinput('');
  }

  const HDelete = (id) => {
    settodo(todos.filter(Todo => Todo.id !== id));
  }
  // Keeps only the items not equal to the one you want to remove

  const toggleDone = id => {
    settodo(
      todos.map(todo => (todo.id === id ? { ...todo, complete: !todo.complete } : todo))
    )
  }
  // to show only remaining todos
  const remaining = todos.filter(todo => !todo.complete).length;

  //to filter between all , active , completed
  const filterTodos = todos.filter(todo => {
    if (filter === "all") return true;
    if (filter === 'active') return !todo.complete;
    if (filter === 'completed') return todo.complete;
  })

  // set data to localstorage
  useEffect(() => {
    if (isLoaded) { // if isloaded is true( if loading is done)
      localStorage.setItem("todos", JSON.stringify(todos)) // two arguments "todos" and todos
    }
  }, [todos]);

  //get data from localstorage
  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("todos"))
    if (storeddata) settodo(storeddata);
    setIsLoaded(true); // indicate loading is done
  }, []);

  return (
    <div>
      <div>
        <h1>Todo list</h1>
      </div>
      <input
        type="text"
        value={input}
        placeholder='enter your stuff here'
        onChange={(e) => setinput(e.target.value)} />
      <button
        onClick={Handletodo}
        className={`px-4 py-2 ${hover ? 'bg-amber-300' : 'to-gray-400'}`}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >Add</button>
      <p>you have {remaining} {remaining === 1 ? 'task' : 'tasks '} are left</p>
      <div className='flex gap-4 my-4'>
        <button onClick={() => setfilter("all")}>All</button>
        <button onClick={() => setfilter("active")}>Active</button>
        <button onClick={() => setfilter("completed")}>Completed</button>
      </div>
      <ul>
        {filterTodos.map(item => (
          <li key={item.id} className='flex gap-2'>
            <span
              onClick={() => toggleDone(item.id)}
              style={{ textDecoration: item.complete ? "line-through" : "none" }}>
              {item.text}
            </span>
            <div onClick={() => HDelete(item.id)}>❌</div>
          </li>
        ))}
      </ul>

    </div >
  )
}

export default Todo;