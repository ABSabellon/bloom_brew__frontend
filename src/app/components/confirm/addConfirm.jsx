import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";
import StorageHandlingService from "../../EntryFile/Services/StorageHandlingService";

const AddConfirm = async ({ collection, data, updateTable, handleOpenDrawer, dataPrefix, has_files = false, fileList }) => {
  try {
    const dataS = new DataService(collection);
    console.log('data ::: ', data);
    console.log('fileList ::: ', fileList);

    const addedDataArray = await dataS.addItems(data, dataPrefix);

    console.log(addedDataArray);

    let uploadFailed = false; // Flag to track if file upload fails

    // Assuming you want to handle each added document separately
    if (has_files && collection === 'Menu') {
      for (const addedData of addedDataArray) {

        const storageHandler = new StorageHandlingService();

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;

        try {
          const uploadedImageURLs = await storageHandler.uploadMultipleFiles(`Menu/Products/imgs/${formattedDate}_${addedData}`, fileList);
          console.log(uploadedImageURLs)

          console.log('docID ::: ',addedData)
          // Update the existing document's imgs field with the uploadedImageURLs
          await dataS.update(addedData, { imgs: uploadedImageURLs });
        } catch (uploadError) {
          console.error('Failed to upload:', uploadError);
          uploadFailed = true;
          break; // Break out of the loop if upload fails
        }
      }
    }

    if (uploadFailed) {
      // If upload failed, delete the added document(s)
      await dataS.delete(addedDataArray.map(addedData => addedData));

      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to upload files for ${collection}. Document(s) deleted.`,
      });
    } else {
      // Upload succeeded
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
          }).then(()=>{

            handleOpenDrawer();
          })
        }
      });
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

export default AddConfirm;
