import { storage } from 'firebase/app';
import 'firebase/storage';

class StorageService {
  constructor() {
    // Initialize Firebase Storage instance
    this.storage = storage();
  }

  // Upload a file to a specified path in Firebase Storage
  async uploadFile(path, file) {
    const storageRef = this.storage.ref(path);
    const uploadTask = storageRef.put(file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        () => {
          // Get the download URL after upload is complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  // Retrieve a file's download URL from Firebase Storage
  async getFileDownloadURL(path) {
    const storageRef = this.storage.ref(path);
    try {
      const downloadURL = await storageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      // Handle error, e.g., file not found
      console.error('Error getting download URL:', error);
      return null;
    }
  }

  // Delete a file from Firebase Storage
  async deleteFile(path) {
    const storageRef = this.storage.ref(path);
    try {
      await storageRef.delete();
      console.log('File deleted successfully');
    } catch (error) {
      // Handle error, e.g., file not found
      console.error('Error deleting file:', error);
    }
  }
}

export default new StorageService();
