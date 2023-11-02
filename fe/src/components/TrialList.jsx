import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TrialList = () => {
  const [trialList, setTrialList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrialTasks();
  }, []);

  const getTrialTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios({
        url: `${process.env.REACT_APP_BASE_URL}/trial-tasks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setTrialList(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching tasks. Please try again later.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const deleteTrialTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios({
        url: `${process.env.REACT_APP_BASE_URL}/trial-tasks/${taskId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      getTrialTasks();
      setError(null);
    } catch (error) {
      setError("Error deleting the task. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="title">Report Trial</h1>
      <h2 className="subtitle">Daftar Report Trial</h2>
      {error && <p className="has-text-danger">{error}</p>}
      <Link to="/trial-tasks/add" className="button is-primary mb-2">
        Tambah Model Part Baru
      </Link>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Nama Supplier</th>
              <th>Nama Part</th>
              <th>Visual Part</th>
              <th>Tanggal Masuk</th>
              <th>Quantity</th>
              <th>Tanggal Cek</th>
              <th>Status</th>
              <th>PICA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trialList.map((e) => (
              <tr key={e.uuid}>
                <td>{e.name}</td>
                <td>{e.part_name}</td>
                <td>
                  {e.visual_image && (
                    <div>
                      <a
                        target="_blank"
                        href={e.visual_image}
                        rel="noreferrer noopener"
                      >
                        <img
                          src={e.visual_image}
                          alt="Visual Part"
                          style={{
                            width: "100px",
                            height: "100px",
                            marginRight: "0px",
                          }}
                        />
                      </a>
                    </div>
                  )}
                </td>
                <td>{formatDate(e.tanggalIn)}</td>
                <td>{e.quantity}</td>
                <td>{formatDate(e.tanggalCek)}</td>
                <td
                  style={{
                    color:
                      e.status === "NG"
                        ? "red"
                        : e.status === "Not Yet"
                        ? "gray"
                        : e.status === "Accepted"
                        ? "green"
                        : "",
                    fontWeight:
                      e.status === "NG" || e.status === "Not Yet" || e.status === "Accepted"
                        ? "bold"
                        : "normal",
                  }}
                >
                  {e.status}
                </td>
                <td>
                  {e.remark_image && (
                    <div>
                      <img
                        src={e.remark_image}
                        alt="Remark Image"
                        style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }}
                      />
                      <span>
                        <a
                          className="button is-small is-link is-outlined"
                          href={e.remark_image}
                          download={"Remark Image"}
                          style={{ marginTop: "5px" }}
                        >
                          <span>Download</span>
                          <span className="icon">
                            <i className="fa fa-external-link-alt"></i>
                          </span>
                        </a>
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "1px" }}>
                    <Link
                      to={`/trial-tasks/edit/${e.uuid}`}
                      className="button is-small is-info is-responsive"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTrialTask(e.uuid)}
                      className="button is-small is-danger is-responsive"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrialList;
