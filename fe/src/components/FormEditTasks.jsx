import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Field from "./Field";


const FormEditTasks = () => {
  const [taskData, setTaskData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    design_image: "",
    design_progress: 0,
    design_approval: "pending",
    material_image: "",
    material_progress: 0,
    material_approval: "pending",
    std_part_image: "",
    std_part_progress: 0,
    std_part_approval: "pending",
    machining_image: "",
    machining_progress: 0,
    machining_approval: "pending",
    assembly_image: "",
    assembly_progress: 0,
    assembly_approval: "pending",
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
    // {
    //   label: "Design Image",
    //   key: "design_image",
    //   type: "file",
    //   accept: "image/jpg, image/jpeg",
    // },
    // {
    //   label: "Design Progress",
    //   key: "design_progress",
    //   type: "number",
    //   max: 10,
    // },
    // {
    //   label: "Design Approval",
    //   key: "design_approval",
    //   type: "select",
    // },
    // {
    //   label: "Material Image",
    //   key: "material_image",
    //   type: "file",
    //   accept: "image/jpg, image/jpeg",
    // },
    // {
    //   label: "Material Progress",
    //   key: "material_progress",
    //   type: "number",
    //   max: 10,
    // },
    // {
    //   label: "Material Approval",
    //   key: "material_approval",
    //   type: "select",
    // },
    // {
    //   label: "Std Part Image",
    //   key: "std_part_image",
    //   type: "file",
    //   accept: "image/jpg, image/jpeg",
    // },
    // {
    //   label: "Standard Part Progress",
    //   key: "std_part_progress",
    //   type: "number",
    //   max: 10,
    // },
    // {
    //   label: "Standard Part Approval",
    //   key: "std_part_approval",
    //   type: "select",
    // },
    // {
    //   label: "Machining Image",
    //   key: "machining_image",
    //   type: "file",
    //   accept: "image/jpg, image/jpeg",
    // },
    // {
    //   label: "Machining Progress",
    //   key: "machining_progress",
    //   type: "number",
    //   max: 50,
    // },
    // {
    //   label: "Machining Approval",
    //   key: "machining_approval",
    //   type: "select",
    // },
    // {
    //   label: "Assembly Image",
    //   key: "assembly_image",
    //   type: "file",
    //   accept: "image/jpg, image/jpeg",
    // },
    // {
    //   label: "Assembly Progress",
    //   key: "assembly_progress",
    //   type: "number",
    //   max: 5,
    // },
    // {
    //   label: "Assembly Approval",
    //   key: "assembly_approval",
    //   type: "select",
    // },
  ];

  return (
    <div>
      <h1 className="title">Taks</h1>
      <h2 className="subtitle">Edit Tasks</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateTasks}>
              <p className="has-text-centered">{msg}</p>
              {fields.map(({ label, key, type, accept, max }) => (
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
                            <option value="pending">Pending</option>
                            <option value="diterima">Diterima</option>
                            <option value="ditolak">Ditolak</option>
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
                  <button type="submit" className="button is-success">
                    Update
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
