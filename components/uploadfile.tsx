// 'use client'
// import React, { useState } from 'react';
// import { Upload, Send, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { uploadFiles } from '@/utils/APICalls';

// interface FileWithPreview {
//   name: string;
//   preview?: string;
// }
// interface UploadFileProps {
//   user_id: string;
// }

// const UploadFile: React.FC<UploadFileProps> = () => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const domainName = localStorage.getItem('domain')?.split('.')[1];
//   const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>(() => {
//     // Load uploaded files from local storage on initial render
//     const savedFiles = localStorage.getItem(`uploadedFiles_${domainName}`);
//     return savedFiles ? JSON.parse(savedFiles).map((file: { name: string }) => ({ name: file.name })) : [];
//   });
//   const [folderName, setFolderName] = useState('');
//   const [statusMessage, setStatusMessage] = useState('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const validFiles = files.filter(
//       (file) =>
//         file.type === 'application/pdf' ||
//         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
//         file.type === 'text/plain'
//     );
//     if (validFiles.length > 0) {
//       setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
//     } else {
//       alert('Please upload valid PDF or Word files.');
//     }
//   };

//   const handleRemoveFile = (index: number) => {
//     setUploadedFiles((files) => {
//       const updatedFiles = files.filter((_, i) => i !== index);
//       localStorage.setItem(`uploadedFiles_${domainName}`, JSON.stringify(updatedFiles));
//       return updatedFiles;
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const allFiles = [...selectedFiles];
//     if (uploadedFiles.length > 0) {
//       const uploadedFileNames = uploadedFiles.map(file => file.name);
//       const validUploadedFiles = uploadedFileNames.map(name => {
//         const file = new File([name], name);
//         return file;
//       });
//       allFiles.push(...validUploadedFiles);
//     }

//     if (allFiles.length > 0) {
//       const formData = new FormData();
//       allFiles.forEach((file) => {
//         formData.append('files', file);
//       });

//       try {
//         await uploadFiles(formData);
//         const newUploadedFiles = [...uploadedFiles, ...selectedFiles.map(file => ({ name: file.name }))];
//         // Save uploaded files to local storage
//         localStorage.setItem(`uploadedFiles_${domainName}`, JSON.stringify(newUploadedFiles));
//         setUploadedFiles(newUploadedFiles);
//         setSelectedFiles([]);
//         alert("Files uploaded successfully");
//       } catch (error) {
//         // Handle error
//       }
//     } else {
//       alert('Please upload at least one file before submitting.');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen w-full bg-white">
//       <header className="bg-blue-600 text-white p-6 text-center">
//         <h1 className="text-2xl font-bold">File Upload Interface</h1>
//       </header>

//       <div className="flex-1 flex justify-center items-center p-4 overflow-auto">
//         {selectedFiles.length > 0 ? (
//           <div className="flex flex-wrap justify-center gap-4">
//             {selectedFiles.map((file, index) => (
//               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border shadow-sm w-64">
//                 <p className="truncate flex-1">
//                   {file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
//                 </p>
//                 <button
//                   onClick={() => handleRemoveFile(index)}
//                   className="ml-2 text-red-500 hover:text-red-700"
//                 >
//                   <X size={20} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <label className="flex flex-col items-center justify-center cursor-pointer">
//             <Upload size={100} className="text-blue-600" />
//             <p className="mt-2 text-gray-600">Click to upload files</p>
//             <input
//               type="file"
//               className="hidden"
//               multiple
//               accept=".pdf,.docx,.txt"
//               onChange={handleFileChange}
//             />
//           </label>
//         )}
//       </div>

//       {selectedFiles.length > 0 && (
//         <footer className="border-t p-4 bg-gray-50">
//           <form onSubmit={handleSubmit} className="flex justify-between gap-4 items-center">
//             {/* <Input
//               type="text"
//               placeholder="Enter folder name"
//               value={folderName}
//               onChange={(e) => setFolderName(e.target.value)}
//               className="flex-1"
//               required
//             /> */}
//             <label className="flex items-center cursor-pointer text-blue-600 hover:text-blue-700">
//               <Upload size={24} className="mr-2" />
//               <span>Upload More</span>
//               <input
//                 type="file"
//                 className="hidden"
//                 multiple
//                 accept=".pdf,.docx"
//                 onChange={handleFileChange}
//               />
//             </label>
//             <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
//               <Send size={24} className="mr-2" />
//               Submit
//             </Button>
//           </form>
//         </footer>
//       )}

//       {statusMessage && (
//         <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow">
//           {statusMessage}
//         </div>
//       )}

//       {uploadedFiles.length > 0 && (
//         <div className="p-4">
//           <h2 className="text-lg font-bold">Uploaded Files:</h2>
//           <ul className="list-disc pl-5">
//             {uploadedFiles.map((file, index) => (
//               <li key={index} className="flex justify-between items-center truncate bg-gray-100 p-2 rounded-md shadow-sm mb-2">
//                 {file.name}
//                 <button onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700">
//                   <X size={20} />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadFile;
"use client"
import React, { useState, useCallback } from 'react';
import { Upload, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadFiles } from '@/utils/APICalls';

interface FileWithPreview {
  name: string;
  id: string;
  status: 'pending' | 'uploaded' | 'error';
}

interface UploadFileProps {
  user_id: string;
}

const UploadFile: React.FC<UploadFileProps> = () => {
  const domainName = localStorage.getItem('domain')?.split('.')[1] || 'default';
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithPreview[]>(() => {
    const savedFiles = localStorage.getItem(`uploadedFiles_${domainName}`);
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const updateLocalStorage = useCallback((files: FileWithPreview[]) => {
    localStorage.setItem(`uploadedFiles_${domainName}`, JSON.stringify(files));
  }, [domainName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'text/plain'
    );

    if (validFiles.length > 0) {
      setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    } else {
      setStatusMessage('Please upload valid PDF, Word, or text files.');
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleRemoveSelected = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handleRemoveUploaded = (index: number) => {
    setUploadedFiles(files => {
      const newFiles = files.filter((_, i) => i !== index);
      updateLocalStorage(newFiles);
      return newFiles;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setStatusMessage('Please select at least one file to upload.');
      setTimeout(() => setStatusMessage(''), 3000);
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await uploadFiles(formData);
      
      const newUploadedFiles = [
        ...uploadedFiles,
        ...selectedFiles.map(file => ({
          name: file.name,
          id: Math.random().toString(36).substr(2, 9),
          status: 'uploaded' as const
        }))
      ];
      
      setUploadedFiles(newUploadedFiles);
      updateLocalStorage(newUploadedFiles);
      setSelectedFiles([]);
      setStatusMessage('Files uploaded successfully!');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (error) {
      console.error('Upload error:', error);
      setStatusMessage('Error uploading files. Please try again.');
      setTimeout(() => setStatusMessage(''), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">File Upload Interface</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
            {selectedFiles.length === 0 ? (
              <label className="cursor-pointer block">
                <Upload size={48} className="mx-auto text-blue-600 mb-4" />
                <p className="text-gray-600">Click to select files</p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
              </label>
            ) : (
              <div className="space-y-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="truncate flex-1">{file.name}</span>
                    <button
                      onClick={() => handleRemoveSelected(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      disabled={isUploading}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex justify-between items-center mb-8">
            <label className="flex items-center cursor-pointer text-blue-600 hover:text-blue-700">
              <Upload size={24} className="mr-2" />
              <span>Add More Files</span>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
            <Button 
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isUploading}
            >
              {isUploading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <Send size={24} className="mr-2" />
                  Upload Files
                </>
              )}
            </Button>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Uploaded Files</h2>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={file.id} className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
                  <span className="truncate flex-1">{file.name}</span>
                  <button
                    onClick={() => handleRemoveUploaded(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    disabled={isUploading}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {statusMessage && (
          <div className="fixed bottom-4 right-4 bg-blue-100 text-blue-800 p-4 rounded-lg shadow-lg">
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;