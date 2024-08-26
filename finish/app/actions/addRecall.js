"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addRecallSchema } from "@/config/zodSchema";

async function addRecall(formState, formData) {
  const recallData = {
    recall_type: formData.get("recall_type"),
    biz_recall_date: formData.get("hid_biz_recall_date"),
    product_label: formData.get("product_label"),
    recall_reason_types: formData.get("hid_recall_reason_type"),
    overview: formData.get("overview"),
    website: formData.get("biz_website"),
  };

  const result = addRecallSchema.safeParse(recallData);

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    console.log("biz recall date", recallData.biz_recall_date);
    console.log(" recall type", recallData.recall_type);
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    //throw new Error("Failed to save data");
    // Save to DB and Revalidate the cache
    console.log("result data", result.data);
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  //revalidatePath("/", "layout");

  redirect(`/success`);
}

export default addRecall;
