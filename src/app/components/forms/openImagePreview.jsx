import React, { useState,useEffect, } from "react";
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
// ImagePreviewer.js

const getBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const OpenImagePreview = ({ fileList, onChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [currentPreviewFile, setCurrentPreviewFile] = useState(null);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  return(
    <>
    <div className="form-froup">

      <label> Product Image<span className="text-danger">*</span>:</label>
      <div className="image-upload p-2">
        <ImgCrop rotationSlider>
          <Upload
            beforeUpload={() => {return false;}} 
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={(file) => {
              setCurrentPreviewFile(file);
              handlePreview(file);
            }}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>
      <input type="hidden" value={fileList.length > 0} />
    </div>

    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
      <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal></>
  );

};

export default OpenImagePreview;
