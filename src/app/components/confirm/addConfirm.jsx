
import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";

const AddConfirm = async ({ collection, record, updateTable,handleOpenDrawer }) => {
  const dataS = new DataService(collection)
  console.log('record ::: ', record)
  await dataS.addItems(record,'CT')
  .then(()=>{
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: `New ${collection} added successfully.`,
      confirmButtonClass: "btn btn-success",
    }).then(() => {
      try{
        if(updateTable) updateTable();
        handleOpenDrawer();
      }catch(error){
        console.error('Failed to add:', error);
        Swal.fire({
          type: 'error',
          title: 'Error',
          text: `Failed to add ${collection}. Please try again later. Or contact support if error persist`,
        });
  
      }
    });

  })
  
};

export default AddConfirm;