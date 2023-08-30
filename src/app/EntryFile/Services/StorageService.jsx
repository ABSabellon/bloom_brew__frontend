import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';

class StorageService {
  constructor() {
    // Initialize Firebase Storage instance
    this.storage = getStorage();
  }

  // Upload a file to a specified path in Firebase Storage
  async uploadFile(path, file) {
    const storageRef = ref(this.storage, path);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Retrieve a file's download URL from Firebase Storage
  async getFileDownloadURL(path) {
    const storageRef = ref(this.storage, path);
    try {
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      // Handle error, e.g., file not found
      console.error('Error getting download URL:', error);
      return null;
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(path) {
    const storageRef = ref(this.storage, path);
    try {
      await deleteObject(storageRef);
      console.log('File deleted successfully');
    } catch (error) {
      // Handle error, e.g., file not found
      console.error('Error deleting file:', error);
    }
  }

  // Get the filename of a file in Firebase Storage
  async getFileName(path) {
    const storageRef = ref(this.storage, path);
    try {
      const metadata = await getMetadata(storageRef);
      return metadata.name;
    } catch (error) {
      // Handle error, e.g., file not found
      console.error('Error getting file name:', error);
      return null;
    }
  }
}

export default StorageService;
