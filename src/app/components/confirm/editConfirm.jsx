import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";
import StorageHandlingService from "../../EntryFile/Services/StorageHandlingService"; // Make sure to adjust the import path

const EditConfirm = async ({ collection, id, data, updateTable, handleOpenDrawer, has_files = false, fileList }) => {
  const dataS = new DataService(collection);
  // const imgsToUpload = fileList.filter(file => !file.isInStorage || file.isInStorage === false);
  // const imgsInStorage = fileList.filter(file => file.isInStorage || file.isInStorage === true);
  // console.log('submitted data :: ', data)
  // console.log('imgsInStorage :: ', imgsInStorage)

  try {
    await dataS.update(id, data);
  
    let uploadFailed = false; // Flag to track if file upload fails
  
    // Filter fileList to only include items without isInStorage or with isInStorage set to false
    const imgsToUpload = fileList.filter(file => !file.isInStorage || file.isInStorage === false);
    const imgsInStorage = fileList.filter(file => file.isInStorage || file.isInStorage === true);
  
    // Assuming you want to handle the document's images separately
    if (has_files && collection === 'Menu') {
      const storageHandler = new StorageHandlingService();
      try {
        if (imgsToUpload.length > 0) {
          const uploadedImageURLs = await storageHandler.uploadMultipleFiles(`Menu/Products/imgs/${id}`, imgsToUpload);

          const imgURLs = [...imgsInStorage.map(img => img.url), ...uploadedImageURLs];
  
          // Update the existing document's imgs field with the uploadedImageURLs
          await dataS.update(id, { imgs:  imgURLs});
        }
      } catch (uploadError) {
        console.error('Failed to upload:', uploadError);
        uploadFailed = true;
      }
    }
  
    if (uploadFailed) {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to update files for ${collection}.`,
      });
    } else {
      // Upload succeeded
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
    }
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
