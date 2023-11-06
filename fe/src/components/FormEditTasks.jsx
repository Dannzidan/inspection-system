import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Field from "./Field";


const FormEditTasks = () => {
  const [taskData, setTaskData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    task_image: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTasksById = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/tasks/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTaskData(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTasksById();
  }, [id]);

  const updateTasks = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/tasks/${id}`, taskData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/tasks");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleImageChange = async (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2 MB
  
      if (!allowedTypes.includes(file.type)) {
        setMsg("Unsupported image type. Please upload a JPEG or PNG image.");
        e.target.value = null;
      } else if (file.size > maxSize) {
        setMsg("Image size must be 2 MB or less.");
        e.target.value = null;
      } else {
        try {
          const reader = new FileReader();
          reader.onload = (event) => {
            setTaskData({ ...taskData, [key]: event.target.result });
            setMsg("");
          };
          reader.readAsDataURL(file);
        } catch (error) {
          console.error("Error reading file:", error);
          setMsg("An error occurred while processing the image.");
        }
      }
    }
  };
  

  const fields = [
    {
      label: "Nama",
      key: "name",
    },
    {
      label: "Tanggal Mulai",
      key: "startDate",
      type: "date",
    },
    {
      label: "Tanggal Berakhir",
      key: "endDate",
      type: "date",
    },
    {
      label: "Task Image",
      key: "task_image",
      type: "file",
      accept: "image/jpg, image/jpeg",
    },
    {
      label: "Assigned to Moderator",
      key: "assigned_mod",
      type: "select",
      options: [
        "Moderator 1",
        "Moderator 2",
        "Moderator 3",
        "Moderator 4",
        "Moderator 5",
      ],
    },
    {
      label: "Assigned to Supplier",
      key: "assigned_sup",
      type: "select",
      options: [
        "Supplier 1",
        "Supplier 2",
        "Supplier 3",
        "Supplier 4",
        "Supplier 5",
      ],
    },
    
    // {
    //   label: "Task Progress",
    //   key: "task_progress",
    //   type: "number",
    //   max: 100,
    // },
  ];

  return (
    <div>
      <h1 className="title">Milestone</h1>
      <h2 className="subtitle">Edit Milestone</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateTasks}>
              <p className="has-text-centered">{msg}</p>
              {fields.map(({ label, key, type, accept, max, options }) => (
              <div key={key}>
                {type === "file" ? (
                  <div className="field">
                    <label className="label">{label}</label>
                    <input
                      type="file"
                      accept={accept}
                      onChange={(e) => handleImageChange(e, key)}
                    />
                  </div>
                ) : type === "select" ? (
                  <div className="field">
                    <label className="label">{label}</label>
                    <div className="control">
                      <div className="select">
                        <select
                          value={taskData[key]}
                          onChange={(e) =>
                            setTaskData({ ...taskData, [key]: e.target.value })
                          }
                        >
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  ) : type === "number" ? (
                    <Field
                      label={label}
                      value={taskData[key]}
                      onChange={(value) => {
                        // Validasi nilai progres sebelum mengubah taskData
                        const numericValue = parseFloat(value);
                        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= max) {
                          setTaskData({
                            ...taskData,
                            [key]: numericValue,
                          });
                        }
                      }}
                      type={type}
                      min={0}
                      max={max}
                    />
                  ) : (
                    <div className="field">
                      <label className="label">{label}</label>
                      <div className="control">
                        <input
                          type={type}
                          value={taskData[key]}
                          className="input"
                          onChange={(e) =>
                            setTaskData({
                              ...taskData,
                              [key]: e.target.value,
                            })
                          }
                          placeholder={label}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="field">
                <div className="control">
                  <button 
                  type="submit" 
                  className="button is-success"
                  style={{ marginTop: "7px"}}
                  >
                    Update Milestone
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditTasks;
