import { toast } from "sonner";

export const toastError = (error: any, id?: string | number) => {
  console.log({ error });
  let message = error;
  if (typeof message !== "string") {
    message = error.response.data.message;
  }
  console.log({ message });
  toast.error(message, { id });

  return message;
};

export const formatDate = (unformattedDate: string | Date) => {
  const dateObj = new Date(unformattedDate);

  const date = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("US", { month: "long" });
  let year = dateObj.getFullYear().toString();

  let result = `${date} ${month} ${year}`;
  return result;
};
