import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";

const deleteRecord = async (dataS, collection, record, updateTable) => {
  try {
    const deleteData = await dataS.delete(record);
    if (deleteData) {
      Swal.fire(
        'Deleted!',
        `${collection} has been deleted.`,
        'success'
      ).then(() => {
        if (updateTable) updateTable();
      });
    } else {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Data not found in the server`,
      });
    }
  } catch (error) {
    console.error('Failed to delete:', error);
    Swal.fire({
      type: 'error',
      title: 'Error',
      text: `Failed to delete ${collection}. Please try again later. Or contact support if error persists.`,
    });
  }
};

const DeleteConfirm = ({ collection, record, updateTable }) => {
  const dataS = new DataService(collection);

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#FFC107',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      icon: 'swal2-icon', // Apply the custom CSS class to the icon
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteRecord(dataS, collection, record, updateTable);
    }
  });
};

export default DeleteConfirm;
