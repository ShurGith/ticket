import { useLocation, useNavigate } from "react-router-dom";

const BuyedTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Si no hay datos, redirigir al formulario
  if (!location.state || !location.state.formData) {
    navigate("/", { replace: true });
    return null;
  }

  const { formData, avatarPreview } = location.state;

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        padding: 20,
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2>Detalles del Ticket</h2>
      <img
        src={avatarPreview}
        alt="Avatar"
        style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
      />
      <p>
        <strong>Nombre completo:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <p>
        <strong>Github User:</strong> {formData.githubUser}
      </p>
      <button onClick={() => navigate("/")} style={{ marginTop: 20 }}>
        Volver al formulario
      </button>
    </div>
  );
};

export default BuyedTicket;
