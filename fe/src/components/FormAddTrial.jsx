import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddTrial = () => {
  const [name, setName] = useState("");
  const [partName, setPartName] = useState("");
  const [visualImage, setVisualImage] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveTasks = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const imageBase64 = visualImage ? await convertImageToBase64(visualImage) : null;

      const taskData = {
        name: name,
        part_name: partName, 
        visual_image: imageBase64, // Send image as a base64-encoded string
      };

      await axios.post(`${process.env.REACT_APP_BASE_URL}/trial-tasks`, taskData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/trial-tasks");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const handleImageChange = (e) => {
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
        setVisualImage(file);
        setMsg("");
      }
    }
  };

  // Function to convert an image to base64
  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(image);
    });
  };

  return (
    <div>
      <h1 className="title">Report Trial</h1>
      <h2 className="subtitle">Tambah Report Model Baru</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveTasks}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Supplier"
                />
              </div>
            </div>
              <div className="field">
              <label className="label">Nama Part/Part Number</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="Part Name"
                />
              </div>
            </div>
            

            {/* <div className="field">
              <label className="label">Nama Part/Part Number</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="Part Name"
                />
              </div>
            </div> */}

              

              
              {/* <div className="field">
                <label className="label">Tanggal Mulai</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Tanggal Berakhir</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                  />
                </div>
              </div> */}

              <div className="field">
                <label className="label">Visual Part</label>
                <div className="control">
                  <input
                    type="file"
                    className="input"
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Simpan
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

export default FormAddTrial;
