// functions/api/contacto.ts - Edge function to send form submissions via Resend API

export async function onRequestPost(context: {
  request: Request;
  env: { RESEND_API_KEY?: string };
}) {
  try {
    const { request, env } = context;

    // 1. Read form submission data
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // 2. Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 3. Retrieve secure API Key from Cloudflare Environment Variables
    const resendApiKey = env.RESEND_API_KEY;
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          error: "Error de configuración del servidor (falta API Key).",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 4. Send the email using a lightweight HTTP fetch to the Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "vermi.cl <no-reply@vermi.cl>", // Must be a verified domain in Resend
        to: ["hola@vermi.cl"],
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
          <h2>Nueva consulta recibida en vermi.cl</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errDetails = await response.json();
      return new Response(
        JSON.stringify({
          error: "Fallo al procesar el envío de correo.",
          details: errDetails,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "Error interno del servidor en la edge function.",
        details: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
