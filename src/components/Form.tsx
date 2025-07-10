import { useState, type FormEvent } from "react";
import Toast from "./Toast";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showSuccessToast = (message: string) => {
    setToastType("success");
    setToastMessage(message);
    setShowToast(true);
  };

  const showErrorToast = (message: string) => {
    setToastType("error");
    setToastMessage(message);
    setShowToast(true);
  };

  const validateEmail = (email: string) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!name || !email || !speciality || !location) {
        showErrorToast("Por favor, completa todos los campos.");
        return;
      }

      if (!validateEmail(email)) {
        showErrorToast("Por favor, ingresa un correo electrónico válido.");
        return;
      }

      setLoading(true);
      const response = await fetch("/api/create-lead", {
        method: "POST",
        body: JSON.stringify({ name, email, speciality, location }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData);
        if (response.status === 400) {
          showErrorToast(errorData.message);
        } else {
          showErrorToast(
            "Ocurrió un error al enviar tu información. Por favor, inténtalo de nuevo."
          );
        }
        return;
      } else {
        showSuccessToast(
          "¡Gracias por tu interés! Nos pondremos en contacto contigo pronto."
        );
      }
    } catch (error) {
      console.log(error);
      showErrorToast(
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setSpeciality("");
      setLocation("");
    }
  };

  return (
    <>
      <section
        id="form"
        className="mt-12 sm:mt-20 max-w-md mx-auto animate-fade-in-up delay-700 relative z-10 px-1"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--primary)]">
          Reserva tu lugar
        </h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Nombre completo"
            className="w-full p-3 sm:p-3 border border-[var(--outlineVariant)] rounded focus:ring-2 focus:ring-[var(--primary)] transition-all text-sm sm:text-base"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 sm:p-3 border border-[var(--outlineVariant)] rounded focus:ring-2 focus:ring-[var(--primary)] transition-all text-sm sm:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="specialty"
            type="text"
            placeholder="Especialidad"
            className="w-full p-3 sm:p-3 border border-[var(--outlineVariant)] rounded focus:ring-2 focus:ring-[var(--primary)] transition-all text-sm sm:text-base"
            required
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />
          <input
            name="location"
            type="text"
            placeholder="Ciudad / Estado"
            className="w-full p-3 sm:p-3 border border-[var(--outlineVariant)] rounded focus:ring-2 focus:ring-[var(--primary)] transition-all text-sm sm:text-base"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          {loading ? (
            <div role="status">
              <div className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button className="bg-[var(--primary)] text-[var(--onPrimary)] px-4 py-3 sm:px-5 rounded font-semibold hover:bg-[var(--primaryContainer)] hover:text-[var(--onPrimaryContainer)] w-full transition-colors duration-200 shadow-md animate-bounce-short text-base sm:text-base">
              Quiero participar
            </button>
          )}
        </form>
      </section>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
        duration={5000}
      />
    </>
  );
}
