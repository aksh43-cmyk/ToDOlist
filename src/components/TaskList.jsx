import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    completed: false,
  });

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3000/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.id) {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
    } else {
      await axios.post("http://localhost:3000/tasks", task);
    }
    setTask({ title: "", description: "", deadline: "", priority: "", completed: false });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTask(task);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          className="form-control"
          placeholder="Title"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Description"
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <input
          type="date"
          name="deadline"
          value={task.deadline}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
          className="form-check-input"
        />
        <label className="form-check-label">Completed</label>
      </div>
      <button type="submit" className="btn btn-primary">
        {task.id ? "Update Task" : "Add Task"}
      </button>
    </form>

    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Deadline</th>
          <th>Priority</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((t) => (
          <tr key={t.id}>
            <td>{t.title}</td>
            <td>{t.description}</td>
            <td>{t.deadline}</td>
            <td>{t.priority}</td>
            <td>{t.completed ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => handleEdit(t)} className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button onClick={() => handleDelete(t.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default TaskList
