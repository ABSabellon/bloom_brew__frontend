import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";
import StorageHandlingService from "../../EntryFile/Services/StorageHandlingService";

const AddConfirm = async ({ collection, data, updateTable, handleOpenDrawer, dataPrefix, has_files = false, fileList }) => {
  try {
    const dataS = new DataService(collection);
    const addedDataArray = await dataS.addItems(data, dataPrefix);

    let uploadFailed = false; // Flag to track if file upload fails

    if (has_files && collection === 'Menu') {
      const storageHandler = new StorageHandlingService();

      for (const addedData of addedDataArray) {
        try {
          const uploadedImageURLs = await uploadImagesForDocument(storageHandler, addedData, fileList);
          console.log(uploadedImageURLs);

          console.log('docID ::: ', addedData);
          // Update the existing document's imgs field with the uploadedImageURLs
          await dataS.update(addedData, { imgs: uploadedImageURLs });
        } catch (uploadError) {
          uploadFailed = true;
          break; // Break out of the loop if upload fails
        }
      }
    }

    if (uploadFailed) {
      await handleAddError(dataS, addedDataArray, collection);
    } else {
      handleAddSuccess(collection, updateTable, handleOpenDrawer);
    }
  } catch (error) {
    console.error('Failed to add:', error);
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: `Failed to add ${collection}. Please try again later. Or contact support if the error persists.`,
    });
  }
};

const uploadImagesForDocument = async (storageHandler, addedData, fileList) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}_${addedData}`;

  try {
    const uploadedImageURLs = await storageHandler.uploadMultipleFiles(`Menu/Products/imgs/${addedData}/${formattedDate}`, fileList);
    return uploadedImageURLs;
  } catch (uploadError) {
    console.error('Failed to upload:', uploadError);
    throw new Error('Failed to upload images');
  }
};

const handleAddSuccess = (collection, updateTable, handleOpenDrawer) => {
  Swal.fire({
    type: 'success',
    title: 'Success',
    text: `New ${collection} added successfully.`,
    confirmButtonClass: "btn btn-success",
  }).then(() => {
    try {
      if (updateTable) updateTable();
      handleOpenDrawer();
    } catch (error) {
      console.error('Failed to add:', error);
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to add ${collection}. Please try again later. Or contact support if the error persists.`,
      }).then(() => {
        handleOpenDrawer();
      });
    }
  });
};

const handleAddError = async (dataS, addedDataArray, collection) => {
  await dataS.delete(addedDataArray.map(addedData => addedData));
  Swal.fire({
    type: 'error',
    title: 'Error',
    text: `Failed to upload files for ${collection}. Document(s) deleted.`,
  });
};

export default AddConfirm;
