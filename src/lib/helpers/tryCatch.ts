import toast from "react-hot-toast";

export default async function tryCatch<T>(fn: () => Promise<T>): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    console.error("An error occurred:", error);
    toast.error("404 error occurred")
    return undefined; 
  }
}