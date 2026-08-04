import { useEffect, useRef, useState } from "react";
import "../pages/Auth.css";
import "./createfood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateFood() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      videoFile: file,
    }));
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const handleDeleteVideo = () => {
    setFormData((prev) => ({
      ...prev,
      videoFile: null,
    }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("title", formData.title);
    formdata.append("video", formData.videoFile);
    formdata.append("desc", formData.description);

    const response = await axios.post(
      "https://tasteloop.onrender.com/api/food/",
      formdata,
      {
        withCredentials: true,
      },
    );

    console.log(response.data);
    navigate("/");
  };

  return (
    <main className="create-food">
      <section className="create-food__card">
        <div>
          <p className="create-food__eyebrow">New food item</p>
          <h1 className="create-food__title">Create food content</h1>
          <p className="create-food__subtitle">
            Enter the title, choose a video file, add a short description, and
            save your new food item.
          </p>
        </div>

        <form className="create-food__form" onSubmit={handleSubmit}>
          <label className="create-food__field">
            <span>Title</span>
            <input
              type="text"
              name="title"
              placeholder="Enter food title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>

          <div className="create-food__field">
            <span>Video</span>
            <label htmlFor="videoFile" className="create-food__file-label">
              <span className="create-food__file-text">
                {formData.videoFile?.name ?? "Choose a video file"}
              </span>
            </label>
            <input
              ref={fileInputRef}
              id="videoFile"
              className="create-food__file-input"
              type="file"
              name="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {previewUrl && (
            <div className="create-food__preview">
              <video
                className="create-food__preview-video"
                src={previewUrl}
                controls
              />
              <div className="create-food__preview-meta">
                <span>{formData.videoFile?.name}</span>
                <button
                  type="button"
                  className="create-food__preview-remove"
                  onClick={handleDeleteVideo}
                >
                  Remove video
                </button>
              </div>
            </div>
          )}

          <label className="create-food__field">
            <span>Description</span>
            <textarea
              name="description"
              placeholder="Write a short description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              required
            />
          </label>

          <button type="submit" className="create-food__submit">
            Save food
          </button>
        </form>
      </section>
    </main>
  );
}

export default CreateFood;
