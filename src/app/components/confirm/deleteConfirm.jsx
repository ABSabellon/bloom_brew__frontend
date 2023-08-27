
import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";

const DeleteConfirm = ({ collection, record, updateTable, }) => {
  const dataS = new DataService(collection)
  console.log('delete list ::: ', record)

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
    try{
      if (result.isConfirmed) {

        console.log('deleteData ::: ', record)
        
        const deleteData = await dataS.delete(record)

        if(deleteData){
          Swal.fire(
            'Deleted!',
            `${collection} has been deleted.`,
            'success'
          ).then(()=>{
            if(updateTable) updateTable();
          })
        }else{
          // console.error('Failed to delete:', error);
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: `Data not found in the server`,
          });
        }
      }
    }catch(error){
      console.error('Failed to delete:', error);
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to delete ${collection}. Please try again later. Or contact support if error persist`,
      });

    }
  });
  
};

export default DeleteConfirm;