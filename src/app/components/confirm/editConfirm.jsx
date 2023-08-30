import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";
import StorageHandlingService from "../../EntryFile/Services/StorageHandlingService";

const EditConfirm = async ({ collection, id, data, updateTable, handleCloseDrawer, has_files = false, fileList, initImgList }) => {
  const dataS = new DataService(collection);

  try {
    await updateData(dataS, id, data);

    if (has_files && collection === 'Menu') {

      const storageHandler = new StorageHandlingService();

      await deleteMarkedFiles(storageHandler, initImgList);
      
      const imgsToUpload = fileList.filter(file => !file.isInStorage || file.isInStorage === false);
      const imgsInStorage = fileList.filter(file => file.isInStorage || file.isInStorage === true);

      const uploadedImageURLs = await uploadImages(storageHandler, id, imgsToUpload);
      const imgURLs = [...imgsInStorage.map(img => img.url), ...uploadedImageURLs];

      await dataS.update(id, { imgs: imgURLs });
    }

    showSuccessAlert(collection, updateTable, handleCloseDrawer);
  } catch (error) {
    handleError(collection, error);
  }
};

const updateData = async (dataS, id, data) => {
  try {
    await dataS.update(id, data);
  } catch (error) {
    throw new Error(`Failed to update data: ${error.message}`);
  }
};

const uploadImages = async (storageHandler, id, imgsToUpload) => {
  try {
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    return await storageHandler.uploadMultipleFiles(`Menu/Products/imgs/${id}/${formattedDate}_${id}`, imgsToUpload);
  } catch (uploadError) {
    throw new Error('Failed to upload images');
  }
};

const deleteMarkedFiles = async (storageHandler, initImgList) => {
  try {
    for (const img of initImgList) {
      if (img.status === 'removed') {
        
        await storageHandler.deleteFile(img.url);
        // console.log(`File ${img.url} deleted from storage`);
      }
    }
  } catch (error) {
    console.error('Error deleting files from storage:', error);
  }
};

const formatDate = date => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const showSuccessAlert = (collection, updateTable, handleCloseDrawer) => {
  Swal.fire({
    type: 'success',
    title: 'Success',
    text: `${collection} was successfully updated.`,
    confirmButtonClass: "btn btn-success",
  }).then(() => {
    try {
      if (updateTable) updateTable();
      handleCloseDrawer();
    } catch (error) {
      handleError(collection, error);
    }
  });
};

const handleError = (collection, error) => {
  console.error(`Failed to update ${collection}:`, error);
  Swal.fire({
    type: 'error',
    title: 'Error',
    text: `Failed to update ${collection}. Please try again later. Or contact support if error persists.`,
  });
};

export default EditConfirm;
