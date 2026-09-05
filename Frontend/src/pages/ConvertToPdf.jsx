import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../service/Api";
import { useAuth } from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

function ConvertToPdf() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setisUploading] = useState(false);
  const [ImagePreview, setImagePreview] = useState(null);
  const [files, setfiles] = useState([]);
  const [target, settarget] = useState(null);
  const [Previews, setPreviews] = useState([]);

  const HandleFileChange = (e) => {
    //set file
    setfiles(Array.from(e.target.files));
    setisUploading(false);

    //preview file
    const previewUrls = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewUrls);
  };

  const handleImages = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    Array.from(files).forEach((file) => {
      formdata.append("images", file);
    });

    if (target) formdata.append("target", target);
    try {
      setisUploading(true);
      const res = await api.post("/api/image/converttopdf", formdata, {
        headers: { authorization: "Bearer " + token },
        responseType: "blob",
      });

      const pdfUrl = URL.createObjectURL(res.data);

      setImagePreview(pdfUrl);
      setisUploading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          `Server Error: ${error.response.data.message || "Conversion failed"}`
        );
      } else {
        toast.error("Network or Server Error. Please try again.");
      }
      setisUploading(false);
    }
  };

  return (
    <section className="container convert">
      <Helmet>
        <title>Convert Images Online | AbhayPixel</title>
        <meta
          name="description"
          content="Convert JPG PNG WEBP AVIF online for free.No installation required."
        />
      </Helmet>
      <ToastContainer />
      <h2 className="title">Convert Images Into PDF</h2>
      <form
        onSubmit={handleImages}
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
          multiple
          onChange={HandleFileChange}
        ></input>
        <div className="inputbox">
          <label htmlFor="target">
            If you Want to Compress into specific Size (in MB)
          </label>
          <input
            type="number"
            name="target"
            id="target"
            placeholder="0"
            min="0"
            max="50"
            step="0.1"
            value={target || ""}
            onChange={(e) => settarget(e.target.value)}
          />
        </div>

        {Previews?.length > 0 && (
          <div className="preview-container">
            {Previews?.map((preview, index) => (
              <img
                key={preview}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        )}

        {ImagePreview ? (
          <a
            className="card-btn btn btn-download"
            href={ImagePreview}
            download={`Abhaypixel.pdf`}
          >
            Download
          </a>
        ) : (
          <button type="submit" className="card-btn btn" disabled={isUploading}>
            {isUploading ? "Processing...." : "Uplaod"}
          </button>
        )}
      </form>
    </section>
  );
}

export default ConvertToPdf;
