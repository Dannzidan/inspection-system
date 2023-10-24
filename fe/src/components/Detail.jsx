import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [detailTask, setDetailTask] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getDetailTasks();
  }, []);

  const getDetailTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/subtasks/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setDetailTask(response.data);
      console.log(response.data);
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
        url: `${process.env.REACT_APP_BASE_URL}/subtasks/${taskId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      getDetailTasks();
      setError(null);
    } catch (error) {
      setError("Error deleting the task. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="title">Detail Tugas</h1>
      <h2 className="subtitle">Daftar Detail Tugas</h2>
      {error && <p className="has-text-danger">{error}</p>}
      <Link to="/subtasks/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Nama Tugas</th>
            <th>Design</th>
            <th>Ordering Material</th>
            <th>Ordering Std Part</th>
            <th>Machining</th>
            <th>Assembly</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {detailTask.length < 1 ? (
            <h5 style={{textAlign: "center"}}>Data Kosong</h5>
          ) : (
            detailTask.map((e, idx) => {
              return (
                <tr key={idx}>
                  <td>{e.name}</td>
                  <td>
                    <div>
                      <img
                        src={`${e.design_image}`}
                        alt="Design Progress"
                        width="100"
                        height="100"
                      />
                      <p>Progress: {e.design_progress}</p>
                      <p>Approval: {e.design_approval}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={`${e.material_image}`}
                        alt="Material Progress"
                        width="100"
                        height="100"
                      />
                      <p>Progress: {e.material_progress}</p>
                      <p>Approval: {e.material_approval}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={`${e.std_part_image}`}
                        alt="Standard Part Progress"
                        width="100"
                        height="100"
                      />
                      <p>Progress: {e.std_part_progress}</p>
                      <p>Approval: {e.std_part_approval}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={`${e.machining_image}`}
                        alt="Machining Progress"
                        width="100"
                        height="100"
                      />
                      <p>Progress: {e.machining_progress}</p>
                      <p>Approval: {e.machining_approval}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <img
                        src={`${e.assembly_image}`}
                        alt="Assembly Progress"
                        width="100"
                        height="100"
                      />
                      <p>Progress: {e.assembly_progress}</p>
                      <p>Approval: {e.assembly_approval}</p>
                    </div>
                  </td>
                  <td>
                    <Link
                      to={`/subtasks/edit/${e.uuid}`}
                      className="button is-small is-info is-responsive"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTask(e.uuid)}
                      className="button is-small is-danger is-responsive"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
