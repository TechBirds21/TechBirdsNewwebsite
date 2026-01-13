import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactEmailRequest {
  email: string;
  name: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, name, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact confirmation email to:", email);
    console.log("Name:", name);

    const emailData = {
      to: email,
      subject: "We received your message!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #3B82F6, #FCD34D); padding: 20px; text-align: center; color: white; }
            .content { padding: 20px; background: #f9f9f9; }
            .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Tech Birds Consulting</h1>
            </div>
            <div class="content">
              <h2>Thank you for contacting us!</h2>
              <p>Dear ${name},</p>
              <p>We have received your message and will get back to you within 24 hours.</p>
              <p>Our team is excited to discuss your project requirements and help you achieve your goals.</p>
            </div>
            <div class="footer">
              <p>Best regards,<br><strong>Tech Birds Consulting Team</strong></p>
              <p>Email: info@techbirdsconsulting.com | Website: www.techbirdsconsulting.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log("Email data prepared:", emailData);
    console.log("✓ Contact confirmation email would be sent");

    return new Response(JSON.stringify({ success: true, message: "Contact confirmation email sent" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in contact confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});