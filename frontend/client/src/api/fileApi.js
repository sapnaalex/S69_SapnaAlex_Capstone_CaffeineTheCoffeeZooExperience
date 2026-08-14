import api from "./client";

export const uploadFile = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress,
  }).then((response) => response.data);
};
