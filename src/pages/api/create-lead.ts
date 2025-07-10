import { supabase } from "@/services/supabase";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  const { error } = await supabase.from("leads").insert({
    name: data.name,
    email: data.email,
    speciality: data.speciality,
    location: data.location,
  });
  if (error) {
    if (error.details?.includes("already exists")) {
      return new Response(
        JSON.stringify({
          message:
            "Email ya registrado. Por favor, espera a que nos pongamos en contacto contigo.",
        }),
        { status: 400 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message:
            "Ocurrió un error al enviar tu información. Por favor, inténtalo de nuevo.",
        }),
        { status: 500 }
      );
    }
  }

  return new Response(
    JSON.stringify({ message: "Información recibida correctamente." }),
    { status: 200 }
  );
};
