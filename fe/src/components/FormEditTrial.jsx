import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Field from "./Field";

const FormEditSubTasks = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    name: "",
    part_name:"",
    visual_image:"",
    tanggalIn:"",
    tanggalCek:"",
    quantity: 0,
    status:"",
    remark_image:"",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTrialtaskId = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/trial-tasks-by-uuid/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTaskData(response.data);
        console.log("hehehe", taskData)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getTrialtaskId();
  }, [id]);

  const saveTrialTasks = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/trial-tasks/${id}`,
        taskData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/trial-tasks");
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
      type: "text",
    },
    {
      label: "Nama Part",
      key: "part_name",
      type: "text",
    },
    {
      label: "Visual Part Image",
      key: "visual_image",
      type: "file",
      accept: "image/jpg, image/jpeg",
    },
    {
      label: "Tanggal Masuk",
      key: "tanggalIn",
      type: "date",
    },
    {
      label: "Tanggal Cek",
      key: "tanggalCek",
      type: "date",
    },
    {
      label: "Quantity",
      key: "quantity",
      type: "number",
      max: 100,
    },
    {
      label: "Status",
      key: "status",
      type: "select",
    },
    {
      label: "PICA",
      key: "remark_image",
      type: "file",
      accept: "image/jpg, image/jpeg",
    },
  ];

  return (
    <div>
      <h1 className="title">Report Trial</h1>
      <h2 className="subtitle">Edit Report Trial</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveTrialTasks}>
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
                              setTaskData({
                                ...taskData,
                                [key]: e.target.value,
                              })
                            }
                          >
                            <option value="Not Yet">Not Yet</option>
                            <option value="NG">NG</option>    
                            <option value="Accepted">Accepted</option>                         
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
                        if (
                          !isNaN(numericValue) &&
                          numericValue >= 0 &&
                          numericValue <= max
                        ) {
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
                          className="input"
                          value={taskData[key]}
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
                  style={{ marginTop: "7px" }} // Ganti "10px" sesuai dengan margin yang Anda inginkan
                >
                  Update Report Trial
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

export default FormEditSubTasks;
