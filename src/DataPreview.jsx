import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 500 * 1024; // 500 KB

function DataPreview() {
  const [formData, setFormData] = useState({
    avatar: null,
    fullName: "",
    email: "",
    githubUser: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPG or PNG images are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Max file size is 500 KB";
    }
    return null;
  };

  const handleFile = (file) => {
    const error = validateFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, avatar: error }));
      setFormData((prev) => ({ ...prev, avatar: null }));
      setAvatarPreview(null);
      return false;
    }
    setErrors((prev) => ({ ...prev, avatar: null }));
    setFormData((prev) => ({ ...prev, avatar: file }));
    setAvatarPreview(URL.createObjectURL(file));
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, avatar: file }));
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setFormData((prev) => ({ ...prev, avatar: null }));
        setAvatarPreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (!handleFile(file)) {
        // Error ya manejado en handleFile
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.avatar) {
      newErrors.avatar = "You must select an avatar";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.githubUser.trim()) {
      newErrors.githubUser = "Github user is required";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      navigate("/ticket", { state: { formData, avatarPreview } });
    } else {
      setErrors(validationErrors);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      className="
        w-screen h-screen
        bg-[url('/images/background-mobile.png')]
        sm:bg-[url('/images/background-tablet.png')]
        lg:bg-[url('/images/background-desktop.png')]
        bg-cover bg-center flex flex-col items-center
        text-white relative text-[20px]
      ">
      <img src="/images/pattern-lines.svg" alt="pattern circle" className="w-full absolute -top-45 left-0" />
      <img src="/images/pattern-squiggly-line-bottom-desktop.svg" alt="pattern-squiggly-line-bottom-desktop" className="absolute bottom-0 left-0" />
      <img src="/images/pattern-squiggly-line-top.svg" alt="pattern-squiggly-line-bottom-desktop" className="absolute top-20 right-0" />
      <img src="/images/pattern-circle.svg" alt="pattern circle" className="absolute top-[50%] right-[23%]" />
      <img src="/images/pattern-circle.svg" alt="pattern circle" className="absolute -top-[8%] left-[5%]" />
      <img src="/images/logo-full.svg" alt="logo" className="w-62 mt-8" />
      <h1 className="text-5xl w-2/5 text-center font-bold mt-12">Your Journey to Coding Conf <br /> 2025 Starts Here!</h1>
      <h3 className="mt-6">Secure your sopt at next year`'s biggest coding conference.</h3>

      <form className="w-1/4 flex flex-col justify-center items-center gap-6 text-white/70 z-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex flex-col w-full justify-center items-start gap-2 mt-16">
          <label>Upload Avatar:</label>
          <div className={`${dragActive ? 'border-white text-blue-400' : 'border-white/50 text-white/50'} border-2 border-dashed text-center p-5 rounded-md cursor-pointer w-full`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            style={{
              userSelect: "none",
            }}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={{
                  width: 200,
                  height: 200,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginBottom: 8,
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-6">
                <img className="bg-white/15 p-4 rounded-xl" src="/images/icon-upload.svg" alt="Avatar Placeholder" />
                <p>Drag and Drop or click to Upload</p>
              </div>
            )}
            <input
              type="file"
              name="avatar"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
              ref={inputRef}
              style={{ display: "none" }}
            />
            {errors.avatar && <div style={{ color: "red" }}>{errors.avatar}</div>}
          </div>
          <div className="flex gap-2 items-center">
            <img src="/images/icon-info.svg" className="size-5" alt="info upload icon" />
            <h6 className="text-white/40 text-sm">Upload your phot(JPG or PNG, max size: 500kb).</h6>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-2">
          <label htmlFor='fullName'>
            Full Name
          </label>
          <input className="w-full ring ring-white/50 rounded-md p-2 bg-white/15"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-2">
          <label htmlFor='email'>
            Email:
          </label>
          <input className="w-full ring ring-white/50 rounded-md p-2 bg-white/15"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <div className="flex flex-col w-full justify-center items-start gap-2">
          <label htmlFor='githubUser'>
            Github User:
          </label>
          <input className="w-full ring ring-white/50 rounded-md p-2 bg-white/15"
            type="text"
            name="githubUser"
            value={formData.githubUser}
            onChange={handleChange}
            placeholder="@yourgithubusername"
          />
          {errors.githubUser && (
            <div style={{ color: "red" }}>{errors.githubUser}</div>
          )}
        </div>
        <button type="submit" className="cursor-pointer bg-[#F67464] text-[#08012D] font-bold text-2xl px-8 py-2 rounded-md">
          Generate My Ticket
        </button>
      </form>
      <div className="w-full justify-center items-center gap-14">

      </div>
    </div>

  )
}

export default DataPreview