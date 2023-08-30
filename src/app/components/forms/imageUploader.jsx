import React, { useState, useEffect } from 'react';
import { Modal, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getImageBase64 } from '../../EntryFile/Utilities/imageUtils';

const ImageUploader = ({ fileList, onChange }) => {
  const [preview, setPreview] = useState({
    open: false,
    image: '',
    title: '',
    file: null,
  });

  const handleCancel = () => setPreview((prevState) => ({ ...prevState, open: false }));

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getImageBase64(file.originFileObj);
    }
    setPreview({
      open: true,
      image: file.url || file.preview,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
      file: file,
    });
  };

  const handleFileListChange = (newFileList) => {
    onChange(newFileList);
  };

  return (
    <div className="form-froup">
      <label>
        {' '}
        Product Image<span className="text-danger">*</span>:
      </label>
      <div className="image-upload p-2">
        <ImgCrop rotationSlider>
          <Upload
            beforeUpload={(file) => false}
            listType="picture-card"
            fileList={fileList}
            onChange={handleFileListChange}
            onPreview={handlePreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </ImgCrop>
      </div>

      <Modal
        open={preview.open}
        title={preview.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={preview.image} />
      </Modal>
    </div>
  );
};

export default ImageUploader;
