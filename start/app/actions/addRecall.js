"use server";

async function addRecall(formData) {
  const recallData = {
    recall_type: formData.get("recall_type"),
    biz_recall_date: formData.get("hid_biz_recall_date"),
    product_label: formData.get("product_label"),
    recall_reason_types: formData.get("hid_recall_reason_type"),
    overview: formData.get("overview"),
    website: formData.get("biz_website"),
  };

  console.log(recallData);
}

export default addRecall;
