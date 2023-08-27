import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, writeBatch,query, orderBy, limit } from "@firebase/firestore";
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
  
  async getAll(orderByField, pageNumber = 1, pageSize = 10, paginate = false) { //get all documents 
    try {
      let querySnapshot;
  
      if (paginate) {
        querySnapshot = await getDocs(query(this.collectionRef, orderBy(orderByField), limit(pageSize), startAfter(pageNumber * pageSize)));
      } else {
        querySnapshot = await getDocs(this.collectionRef);
      }
  
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  }  

  async getById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return { id: docSnapshot.id, ...docSnapshot.data() };
      } else {
        return null; // Document doesn't exist
      }
    } catch (error) {
      console.error("Error getting document by ID: ", error);
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
    } catch (error) {
      console.error("Error deleting document(s): ", error);
      throw error;
    }
  }
  
}

export default DataService;
