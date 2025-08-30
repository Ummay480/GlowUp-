"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  message: string;
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(' ');
    return {
      message: `There was an error: ${errorMessages}`,
      success: false,
    };
  }
  
  // Here you would typically send an email or save to a database.
  // For this example, we'll just log it and return a success message.
  console.log("New contact form submission:", validatedFields.data);

  return {
    message: "Thank you for your message! We will get back to you shortly.",
    success: true,
  };
}
