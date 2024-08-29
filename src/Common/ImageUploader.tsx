import React, { useEffect, useState } from 'react';
import { Upload, message, Image } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import MainLoader from './MainLoader';
import { useDeleteFileMutation, useUploadFileMutation } from '../Api/fileApi';
import { toastNotify } from '../Helper';

interface ImageUploaderProps {
  onImageIdChange?: (id: string | null)=> void;  
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageIdChange }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log({imageUrl});
    try {
      const response = await uploadFile(formData).unwrap();
      console.log('Uploaded image ID:', response.fileId);
      setImageId(response.fileId);
      setImageUrl(URL.createObjectURL(file));
      toastNotify('Image uploaded successfully');
      onImageIdChange?.(response.fileId);
    } 
    catch (error) {
      toastNotify('Error uploading image:', "error");
     
    }
  };

  useEffect(() =>
  {
    
  },[])

  const handleDelete = async () => {
    if (imageId) {
      try {
        const response = await deleteFile(imageId).unwrap();
        setImageUrl(null);
        setImageId(null);
        message.success(response);
        onImageIdChange?.(null);
      } 
      catch (error) {
        toastNotify('Error deleting image:', "error");      
      }
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        toastNotify('You can only upload JPG/PNG files!',"warning");
      }
      return isJpgOrPng || Upload.LIST_IGNORE;
    },
    customRequest: ({ file, onSuccess }) => {
      console.log(file)
      handleUpload(file as RcFile).then(() => {
        onSuccess?.('ok');
        setImageUrl(null);
      });
    },
    showUploadList: false,
  };

  return (
    
    <div>
      {!imageUrl && (
        <Upload {...uploadProps}>
          <div style = {{cursor:"pointer"}}>
          <UploadOutlined /> Click to Upload
          <br/>
          <br/>
          </div>
        </Upload>
        
      )}
      {(isUploading || isDeleting) && <MainLoader/>}
      {imageUrl &&   (
        <div style={{ marginTop: 16, position: 'relative' }}>
          <Image src={imageUrl} alt="Uploaded" width={200} />
          <DeleteOutlined
            onClick={handleDelete}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '20px',
              color: 'red',
              cursor: 'pointer',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
