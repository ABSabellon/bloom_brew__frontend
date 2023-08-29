// DataFetchingService.js
import StorageService from "./StorageService"; // Adjust the import path

class StorageHandlingService {
  constructor() {
    this.storageService = new StorageService();
  }

  async uploadFile(path, file){
    try {
      const downloadURL = await this.storageService.uploadFile(path, file);
      console.log('File uploaded. Download URL:', downloadURL);
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

  async deleteFile(){
    try {
      await this.storageService.deleteFile(path);
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      // Handle error, e.g., file not found
    }
  }
}

export default StorageHandlingService;
