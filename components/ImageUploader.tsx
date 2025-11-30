import React, { useRef, useState } from 'react';
import { Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative group cursor-pointer
          border-3 border-dashed rounded-3xl p-10
          flex flex-col items-center justify-center text-center
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-emerald-500 bg-emerald-50/50 scale-105 shadow-xl' 
            : 'border-slate-300 bg-white/60 hover:border-emerald-400 hover:bg-white hover:shadow-lg'
          }
        `}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />

        <div className={`
          w-20 h-20 mb-6 rounded-full flex items-center justify-center
          bg-gradient-to-tr from-emerald-400 to-teal-500
          text-white shadow-lg group-hover:scale-110 transition-transform duration-300
        `}>
          <Camera className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Identify Waste
        </h3>
        <p className="text-slate-500 mb-6 px-4">
          Take a photo or upload an image to check if it's recyclable.
        </p>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 font-medium group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
            <Upload className="w-4 h-4" />
            Upload
          </div>
           <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 font-medium group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
            <ImageIcon className="w-4 h-4" />
            Drop
          </div>
        </div>
      </div>
    </div>
  );
};
