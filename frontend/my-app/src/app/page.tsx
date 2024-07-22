"use client"
import UploadImage from "../app/component/ImageUpload"

const IndexPage = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <UploadImage url="http://localhost:5000/upload" />
    </div>
  );
};

export default IndexPage;