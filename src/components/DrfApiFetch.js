import React, { useState, useEffect } from "react";
import axios from "axios";

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Token ",
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} {task.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrfApiFetch;
