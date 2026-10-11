import type { ContactValues } from "@/lib/contact-validation";

export async function deliverMessage(msg: ContactValues): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 600));

  if (process.env.NODE_ENV === "development") {
    console.log("Contact message received:", {
      name: msg.name,
      email: msg.email,
      services: msg.services,
      messageLength: msg.message.length,
    });
  }

  // TODO: Replace with a real email provider, such as Resend, sending to process.env.CONTACT_TO_EMAIL.
}
