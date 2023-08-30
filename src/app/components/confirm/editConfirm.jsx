import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";
import StorageHandlingService from "../../EntryFile/Services/StorageHandlingService"; // Make sure to adjust the import path

const updateData = async (dataS, id, data) => {
  try {
    await dataS.update(id, data);
  } catch (error) {
    console.error('Failed to update:', error);
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
    console.error('Failed to upload:', uploadError);
    throw new Error('Failed to upload images');
  }
};

const showSuccessAlert = (collection, updateTable, handleOpenDrawer) => {
  Swal.fire({
    type: 'success',
    title: 'Success',
    text: `${collection} was successfully updated.`,
    confirmButtonClass: "btn btn-success",
  }).then(() => {
    try {
      if (updateTable) updateTable();
      handleOpenDrawer();
    } catch (error) {
      console.error('Failed to update:', error);
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to update ${collection}. Please try again later. Or contact support if error persists.`,
      });
    }
  });
};

const EditConfirm = async ({ collection, id, data, updateTable, handleOpenDrawer, has_files = false, fileList }) => {
  const dataS = new DataService(collection);

  try {
    await updateData(dataS, id, data);

    if (has_files && collection === 'Menu') {
      const storageHandler = new StorageHandlingService();
      const imgsToUpload = fileList.filter(file => !file.isInStorage || file.isInStorage === false);
      
      const uploadedImageURLs = await uploadImages(storageHandler, id, imgsToUpload);
      const imgsInStorage = fileList.filter(file => file.isInStorage || file.isInStorage === true);
      const imgURLs = [...imgsInStorage.map(img => img.url), ...uploadedImageURLs];

      await dataS.update(id, { imgs: imgURLs });
    }

    showSuccessAlert(collection, updateTable, handleOpenDrawer);
  } catch (error) {
    console.error('Failed to update:', error);
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: `Failed to update ${collection}. Please try again later. Or contact support if error persists.`,
    });
  }
};

export default EditConfirm;
