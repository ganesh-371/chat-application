'use client'
import React, { useEffect, useState } from 'react';
import { Upload, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadFiles } from '@/utils/APICalls';

interface FileWithPreview extends File {
  preview?: string;
}

const FAQPage = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [folderName, setFolderName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth === "true") {
      setUser_id(localStorage.getItem('user_id') || '');
    }
  }, []);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      (file) =>
        file.type === 'application/pdf' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    if (validFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    } else {
      alert('Please upload valid PDF or Word files.');
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!folderName) {
      alert('Please enter a folder name.');
      return;
    }

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('folderName', folderName);

      selectedFiles.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const response = await uploadFiles(user_id, formData);

      // Show success message
      setStatusMessage('Files have been successfully submitted.');

      // Clear form
      setSelectedFiles([]);
      setFolderName('');
    } else {
      alert('Please upload at least one file before submitting.');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">File Upload Interface</h1>
      </header>

      <div className="flex-1 flex justify-center items-center p-4 overflow-auto">
        {selectedFiles.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border shadow-sm w-64">
                <p className="truncate flex-1">
                  {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                </p>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <Upload size={100} className="text-blue-600" />
            <p className="mt-2 text-gray-600">Click to upload files</p>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <footer className="border-t p-4 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="flex-1"
              required
            />
            <label className="flex items-center cursor-pointer text-blue-600 hover:text-blue-700">
              <Upload size={24} className="mr-2" />
              <span>Upload More</span>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.docx"
                onChange={handleFileChange}
              />
            </label>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send size={24} className="mr-2" />
              Submit
            </Button>
          </form>
        </footer>
      )}

      {statusMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default FAQPage; 