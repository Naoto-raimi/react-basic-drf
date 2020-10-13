import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [id, setId] = useState(1);
  const [editedTask, setEditedTask] = useState({ id: "", title: "" });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token b8f8b231cd699c910e0704b9f248139126f44a9a",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token b8f8b231cd699c910e0704b9f248139126f44a9a",
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: "Token 9bf88ddb2794e14ef41344ef906917fe8dde20df",
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };

  const createTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`http://127.0.0.1:8000/api/tasks/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token b8f8b231cd699c910e0704b9f248139126f44a9a",
        },
      })
      .then((res) => {
        setTasks([...tasks, res.data]);
      });
  };

  const handlerInputChange = () => (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
            <button onClick={() => deleteTask(task.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      SET ID
      <br />
      <input
        type="text"
        value={id}
        onChange={(evt) => {
          setId(evt.target.value);
        }}
      />
      <br />
      <button type="button" onClick={() => getTask()}>
        GET TASK
      </button>
      {/* <button type="button" onClick={() => deleteTask()}>
        DELETE TASK
      </button> */}
      <h3>
        {selectedTask.title} {selectedTask.id}
      </h3>
      <input
        type="text"
        name="title"
        value={editedTask.title}
        onChange={handlerInputChange()}
        placeholder="New task"
        required
      />
      <button onClick={() => createTask(editedTask)}>CREATE</button>
    </div>
  );
};

export default DrfApiFetch;
