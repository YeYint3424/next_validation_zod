"use client";
import { useFormStatus } from "react-dom";

// NOTE: Give the user some feedback about the form submission before being
// redirected by using a SubmitButton component that uses the useFormStatus hook

function SubmitButton({
  pendingText = "Adding Recall...",
  text = "Add Recall",
}) {
  const status = useFormStatus();
  return (
    <button
      className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? pendingText : text}
    </button>
  );
}

export default SubmitButton;
