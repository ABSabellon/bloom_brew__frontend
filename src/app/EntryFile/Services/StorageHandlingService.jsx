// DataFetchingService.js
import StorageService from "./StorageService"; // Adjust the import path

class StorageHandlingService {
  constructor() {
    this.storageService = new StorageService();
  }

  async uploadFile(path, file){
    try {
      const downloadURL = await this.storageService.uploadFile(path, file);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Rethrow the error to be caught by the caller
    }
  }

  async uploadMultipleFiles(path, fileList) {

    console.log('fileList ::: ', fileList)
    const uploadedURLs = [];

    for (const file of fileList) {
      console.log('file ::: ', file)
      try {
        const downloadURL = await this.uploadFile(path + '_' + file.name, file);
        uploadedURLs.push(downloadURL);
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // You might choose to handle the error differently here
      }
    }

    return uploadedURLs;
  }

  async deleteFile(paths) {
    try {
      if (!Array.isArray(paths)) {
        paths = [paths]; // Convert to an array if it's not already
      }
  
      const successfulDeletions = [];
      const failedDeletions = [];
  
      for (const path of paths) {
        try {
          await this.storageService.deleteFile(path);
          successfulDeletions.push(path);
          console.log(`File ${path} deleted successfully`);
        } catch (error) {
          failedDeletions.push(path);
          console.error(`Error deleting file ${path}:`, error);
          // Handle error, e.g., file not found
        }
      }
  
      return { successfulDeletions, failedDeletions };
    } catch (error) {
      console.error('Error deleting files:', error);
      return { successfulDeletions: [], failedDeletions: paths };
    }
  }  

  async getNames(links) {
    const filenames = [];

    if (Array.isArray(links)) {
      for (const link of links) {
        const filename = await this.storageService.getFileName(link);
        filenames.push(filename);
      }
    } else {
      const filename = await this.storageService.getFileName(links);
      filenames.push(filename);
    }

    return filenames;
  }
}

export default StorageHandlingService;
