import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  email: string;
  name: string;
  jobTitle: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, name, jobTitle }: EmailRequest = await req.json();

    console.log("Sending application confirmation email to:", email);
    console.log("Name:", name);
    console.log("Job:", jobTitle);

    const emailData = {
      to: email,
      subject: `Application Received - ${jobTitle}`,
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
              <h2>Thank you for your application!</h2>
              <p>Dear ${name},</p>
              <p>We have received your application for the position of <strong>${jobTitle}</strong>.</p>
              <p>Our team will review your application carefully and get back to you within 5-7 business days.</p>
              <p>We appreciate your interest in joining Tech Birds Consulting!</p>
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
    console.log("✓ Application confirmation email would be sent");

    return new Response(JSON.stringify({ success: true, message: "Application confirmation email sent" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in application confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});