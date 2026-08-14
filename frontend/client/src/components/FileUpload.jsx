import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { uploadFile } from "../api/fileApi";
import { getApiErrorMessage } from "../api/client";
import Button from "./Button";

const FileUpload = ({ onUploaded }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Choose an image before uploading.");
      return;
    }
    setIsUploading(true);
    setError("");
    try {
      const response = await uploadFile(file, (event) => {
        if (event.total) setProgress(Math.round((event.loaded * 100) / event.total));
      });
      onUploaded?.(response);
      setProgress(100);
    } catch (uploadError) {
      setError(getApiErrorMessage(uploadError, "Image upload failed."));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-sand bg-white p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-cream p-2.5 text-espresso"><PhotoIcon className="h-5 w-5" /></div>
        <div><h2 className="font-display text-lg font-semibold text-espresso">Upload an image</h2><p className="text-sm text-mocha">Your account is identified by your secure session.</p></div>
      </div>
      <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-sand bg-cream/50 p-5 text-center text-sm text-mocha hover:border-leaf">
        <input type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
        {preview ? <img src={preview} alt="Selected upload preview" className="h-28 w-28 rounded-xl object-cover" /> : <><PhotoIcon className="mb-2 h-7 w-7" /><span>Select an image to preview</span></>}
      </label>
      {isUploading && <div className="mt-3 h-2 overflow-hidden rounded-full bg-cream"><div className="h-full bg-leaf transition-all" style={{ width: `${progress}%` }} /></div>}
      {error && <p className="mt-3 text-sm text-terracotta" role="alert">{error}</p>}
      <Button className="mt-4 w-full" onClick={handleUpload} isLoading={isUploading}>Upload image</Button>
    </section>
  );
};

export default FileUpload;
