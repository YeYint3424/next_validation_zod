import { z } from "zod";
import * as dropdown from "@/config/recallDropDowns";

const recallTypeSchema = z.enum(dropdown.recallTypeOptions, {
  required_error: "Recall type is required.",
});

const productLabelSchema = z
  .string()
  .min(3)
  .regex(/^[a-zA-Z0-9\s.,'%-]*$/, {
    message: "Special characters not allowed.",
  });
const overviewSchema = z
  .string()
  .min(10)
  .regex(/^[a-zA-Z0-9\s.,'%\-\[\]\(\)]*$/, {
    message: "Special characters not allowed.",
  });

const recallDateRegex =
  /^[A-Za-z]{3} [A-Za-z]{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([A-Za-z ]+\)$/;

const recallReasonTypesSchema = z.string().refine(
  (val) => {
    try {
      const parsed = JSON.parse(val); // Parse the JSON string
      return Array.isArray(parsed) && parsed.length > 0; // Check if it's an array with at least 1 element
    } catch (e) {
      return false; // If parsing fails, return false
    }
  },
  {
    message: "You must select atleast 1 recall reason type.",
  }
);
const urlSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true; // If the value is empty, it's valid
      try {
        new URL(val); // Check if the value is a valid URL
        return true;
      } catch {
        return false; // If it's not a valid URL, return false
      }
    },
    {
      message: "Invalid URL format",
    }
  );

export const addRecallSchema = z
  .object({
    recall_type: recallTypeSchema,
    biz_recall_date: z.string(),
    product_label: productLabelSchema,
    recall_reason_types: recallReasonTypesSchema,
    overview: overviewSchema,
    website: urlSchema,
  })
  .refine(
    (data) => {
      if (data.recall_type === "Voluntary") {
        return (
          !!data.biz_recall_date && recallDateRegex.test(data.biz_recall_date)
        );
      }
      return true;
    },
    {
      path: ["biz_recall_date"], // Point to the biz_recall_date field in case of an error
      message:
        "Recall date is required for voluntary recalls and must be in the format M/dd/yyyy.",
    }
  );
