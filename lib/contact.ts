export type ContactData = {
  name: string;
  email: string;
  message: string;
};

export async function submitContact(data: ContactData): Promise<void> {
  // TODO: Swap this for a server action or API call once the backend is decided.
  await new Promise<void>((resolve) => setTimeout(resolve, 500));
  console.log("Contact submission:", data);
}
