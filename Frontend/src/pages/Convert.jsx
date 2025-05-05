import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../service/Api";
import { useAuth } from "../Hooks/useAuth";

const Convert = () => {
  const { type } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const allowedFormats = ["jpg", "png", "webp", "avif"];
  const [file, setFile] = useState(null);
  const [ImagePreview, setImagePreview] = useState(null);
  const [isUploading, setisUploading] = useState(false);

  useEffect(() => {
    if (!allowedFormats.includes(type)) navigate("/");
  }, [type]);

  const HandleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImagePreview(null);
    setisUploading(false);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setisUploading(true);

    if (file == null) {
      setisUploading(false);
      return toast.error("Select Any image");
    } else {
      let Filetype = file.type.split("/")[1];
      if (Filetype === "jpeg") Filetype = "jpg";

      if (Filetype == type) {
        setisUploading(false);
        return toast.error(`Already ${type} File`);
      }

      try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", type); 

          const res = await api.post("/api/image/convert", formData, {
            headers: { authorization: "Bearer " + token },
            responseType: "blob",
          });
       
        const blob = res.data;
        console.log(blob);
        
        const imageURL = URL.createObjectURL(blob);
        setTimeout(() => {
          setImagePreview(imageURL);
          setisUploading(false);
        }, 5000);
      } catch (error) {
        console.log(error);
        
        return toast.error("Uploading Error: ", error);
      }
    }
  };

  return (
    <section className="container convert">
      <ToastContainer />
      <h2 className="title">Convert Image Into {type.toUpperCase()}</h2>
      <form
       onSubmit={HandleSubmit}
        className="form-control"
        method="post"
        encType="multipart/form-data"
      >
        <label className="browse-box" htmlFor="image">
          Select Here
        </label>
        <input
          id="image"
          type="file"
          name="image"
          onChange={HandleFileChange}
        ></input>
        <h2 className="title">{file?.name}</h2>

        {ImagePreview ? (
            <a className="card-btn" href={ImagePreview} download={`converted.${type}`}>
              Download
            </a>
        ) :  <button type="submit" className="card-btn" disabled={isUploading}>
         {isUploading ? "Processing...." : "Uplaod"}
      </button>}

      </form>
    </section>
  );
};

export default Convert;
