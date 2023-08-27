import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, writeBatch,query, orderBy, limit, startAfter, startAt, where } from "@firebase/firestore";
import { firestore } from "../../../environments/environment";

class DataService {
  constructor(collectionName) {
    this.collectionRef = collection(firestore, collectionName);
  }

  async create(data) { //allows single data or in an array
    try {
      const dataArray = Array.isArray(data) ? data : [data];
      const batch = writeBatch(this.collectionRef.firestore);

      dataArray.forEach(data => {
        const newDocRef = doc(this.collectionRef);
        batch.set(newDocRef, data);
      });

      await batch.commit();
    } catch (error) {
      console.error("Error creating documents: ", error);
      throw error;
    }
  }

  async addItems(data, docPrefix) {
    if (!data || !docPrefix) {
        throw new Error("Both data and docPrefix are required.");
    }

    try {
        const dataArray = Array.isArray(data) ? data : [data];
        const batch = writeBatch(this.collectionRef.firestore);

        const latestDoc = await getDocs(query(this.collectionRef, orderBy("created_at", "desc"), limit(1)));
        let currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Get current date in YYYYMMDD format
        let currentIncrement = 0;
        if (!latestDoc.empty) {
            const latestData = latestDoc.docs[0].id;
            const latestDate = latestData.substring(docPrefix.length, docPrefix.length + 8);

            if (latestDate === currentDate) {
                currentIncrement = parseInt(latestData.substring(docPrefix.length + 8)) + 1;
            }
        }
        dataArray.forEach(data => {
            const customId = `${docPrefix}${currentDate}${currentIncrement.toString().padStart(5, '0')}`;
            const newDocRef = doc(this.collectionRef, customId);

            batch.set(newDocRef, data);
            currentIncrement++;
        });

        await batch.commit();
    } catch (error) {
        console.error("Error creating documents: ", error);
        throw error;
    }
  }

  async getAll(query = null) {
    try {
      let querySnapshot;
  
      if (query) {
        querySnapshot = await getDocs(query);
      } else {
        querySnapshot = await getDocs(this.collectionRef);
      }
  
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  }
  
  async getTotalCount() {
    try {
      const querySnapshot = await getDocs(this.collectionRef);
      return querySnapshot.size; // Return the total count of documents
    } catch (error) {
      console.error("Error getting total count:", error);
      throw error;
    }
  }

  async update(id, data) {
    const docRef = doc(this.collectionRef, id);
    try {
      await updateDoc(docRef, data);
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error;
    }
  }

  async delete(ids) {
    const idArray = Array.isArray(ids) ? ids : [ids];
  
    try {
      await Promise.all(
        idArray.map(async (id) => {
          const docRef = doc(this.collectionRef, id);
          await deleteDoc(docRef);
        })
      );
  
      return true; // Return true after successful deletion
    } catch (error) {
      console.error("Error deleting document(s): ", error);
      throw error;
    }
  }

  createWhereQuery(fieldName, operator, value) {
    return query(this.collectionRef, where(fieldName, operator, value));
  }
  
  
}

export default DataService;
