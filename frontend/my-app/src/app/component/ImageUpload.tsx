import React, { useState } from 'react';
import axios from 'axios';

interface UploadImageProps {
  url: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ url }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Upload the image and track progress
      await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
          setProgress(percentCompleted);
        },
      });

      // Simulate AI processing time
      const simulateProcessing = () => {
        return new Promise((resolve) => {
          const startTime = Date.now();
          const duration = 30000; // 30 seconds

          const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = Math.min((elapsedTime / duration) * 100, 100);
            setProgress(newProgress);

            if (elapsedTime >= duration) {
              clearInterval(interval);
              resolve(null);
            }
          }, 1000);
        });
      };

      await simulateProcessing();
      setVideoUrl('videos/video.mp4'); // Replace with actual video URL
    } catch (error) {
      console.error('Error uploading image', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
      />
      <button
        onClick={handleUpload}
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-4"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {loading && (
        <div className="loading-bar mt-4">
          <div className="progress bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-violet-500 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-500 mt-2">{`${Math.round(progress)}%`}</p>
        </div>
      )}
      {videoUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Generated Video</h2>
          <video src={videoUrl} controls={false}  className="w-full h-auto mt-2" />
          <p className="text-gray-500 mt-2">Downloading is not allowed.</p>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
