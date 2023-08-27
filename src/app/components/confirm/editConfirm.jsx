
import React from "react";
import Swal from "sweetalert2";
import DataService from "../../EntryFile/Services/DataService";

const EditConfirm = async ({ collection,id,record, updateTable,handleOpenDrawer }) => {
  const dataS = new DataService(collection)

  console.log('id ::: ', id)

  await dataS.update(id,record)
  .then(()=>{
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: `${collection} was successfully updated.`,
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
          text: `Failed to update ${collection}. Please try again later. Or contact support if error persist`,
        });
  
      }
    });

  })

}

export default EditConfirm;