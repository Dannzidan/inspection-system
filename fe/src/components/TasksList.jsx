import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TasksList = () => {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/tasks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTaskList(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching tasks. Please try again later.");
    }
  };

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios({
        url: `${process.env.REACT_APP_BASE_URL}/tasks/${taskId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
      setError(null);
    } catch (error) {
      setError("Error deleting the task. Please try again later.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1 className="title">Milestone</h1>
      <h2 className="subtitle">Daftar Milestone</h2>
      {error && <p className="has-text-danger">{error}</p>}
      <Link to="/tasks/add" className="button is-primary mb-2">
        Tambah Milestone Baru
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Tugas</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => (
            <tr key={task.uuid}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>{formatDate(task.startDate)}</td>
              <td>{formatDate(task.endDate)}</td>
              <td>{task.user && task.user.name}</td>
              <td>
                <Link
                  to={`/tasks/edit/${task.uuid}`}
                  className="button is-small is-info is-responsive"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTask(task.uuid)}
                  className="button is-small is-danger is-responsive"
                >
                  Delete
                </button>
                <Link
                  to={`/tasks/detail/${task.id}`}
                  onClick={() => localStorage.setItem("idSubtask", task.id)}
                  className="button is-small is-link is-responsive"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
