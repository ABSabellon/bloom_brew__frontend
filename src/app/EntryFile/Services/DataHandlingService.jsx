// DataFetchingService.js
import DataService from "./DataService"; // Adjust the import path

class DataHandlingService {
  constructor(dataSource) {
    this.dataS = new DataService(dataSource);
  }

  async getData(){
    try{

      const fetchedData = await this.dataS.getAll();
      return fetchedData
    }catch (error){
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async fetchDataWithQuery(query, operator, value) {
    try {
      let queryToUse = null;

      if (query && operator && value) {
        queryToUse = this.dataS.createWhereQuery(query, operator, value);
      }

      const fetchedData = await this.dataS.getAll(queryToUse || query);
      return fetchedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async fetchFromId(id) {
    try {
      const fetchedItem = await this.dataS.getDocById(id);
      return fetchedItem;
    } catch (error) {
      console.error("Error fetching item from ID:", error);
      throw error;
    }
  }


  async getTotalCount() {
    // Get the total count of data from the data source
    // Implement the logic to get the total count here
  }
}

export default DataHandlingService;
