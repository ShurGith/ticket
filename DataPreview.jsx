import React, { useState, useRef } from "react";

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
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, avatar: file }));
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        alert("Solo se permiten archivos de imagen");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.avatar) {
      newErrors.avatar = "Debes subir un avatar";
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Email inválido";
    }
    if (!formData.githubUser.trim()) {
      newErrors.githubUser = "El usuario de Github es obligatorio";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      alert(
        "Formulario enviado con éxito:\n" +
        JSON.stringify(
          {
            fullName: formData.fullName,
            email: formData.email,
            githubUser: formData.githubUser,
            avatar: formData.avatar.name,
          },
          null,
          2
        )
      );
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
        text-white
      ">
      <img src="/images/logo-full.svg" alt="logo" className="w-84 mt-8" />
      <h1 className="text-6xl w-2/5 text-center font-bold mt-12 ">Your Journey to Coding Conf 2025 Starts Here!</h1>
      <h3 className="mt-6 text-xl">Secure your sopt at next year`'s biggest coding conference.</h3>

      <form className="w-full flex flex-col justify-center items-center gap-14"
        onSubmit={handleSubmit}
        noValidate
      >
        <label>Upload Avatar:</label>
        <div className={`${dragActive ? 'border-white text-blue-400' : 'border-white/50 text-white/50'} border-2 border-dashed text-center p-5 rounded-md cursor-pointer w-1/3`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          style={{
            // border: dragActive ? "3px dashed #ffffff" : "3px dashed #ffffff50",
            //color: dragActive ? "#4a90e2" : "#999",
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
            accept="image/*"
            onChange={handleChange}
            ref={inputRef}
            style={{ display: "none" }}
          />

        </div>
        {errors.avatar && <div style={{ color: "red" }}>{errors.avatar}</div>}

        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Tu nombre completo"
          />
          {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </label>

        <label>
          Github User:
          <input
            type="text"
            name="githubUser"
            value={formData.githubUser}
            onChange={handleChange}
            placeholder="usuarioGithub"
          />
          {errors.githubUser && (
            <div style={{ color: "red" }}>{errors.githubUser}</div>
          )}
        </label>

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