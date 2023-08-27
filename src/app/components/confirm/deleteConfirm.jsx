
import React from "react";
import Swal from "sweetalert2";
import Api from "../../../EntryFile/Includes/rest";

const deleteConfirm = ({ url, handleDrawerSuccess, type}) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "btn btn-primary",
    cancelButtonClass: "btn btn-danger ml-1",
    buttonsStyling: !1,
  }).then((result) => {
    try{
      if (result.isConfirmed) {
        Swal.fire({
          type: "success",
          title: "Deleted!",
          text: `${type} has been deleted.`,
          confirmButtonClass: "btn btn-success",
          confirmButtonClass: "btn btn-success",
        })
      }

    }catch(error){
      console.error('Failed to delete:', error);
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: `Failed to delete ${type}. Please try again later.`,
      });

    }
  })
  
};

export default deleteConfirm;