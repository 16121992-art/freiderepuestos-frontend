// components/ImageUploader.tsx
import { useState } from "react";

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImageUrl(data.secure_url);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4 w-60" />}
    </div>
  );
}