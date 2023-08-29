import DataHandlingService from "./DataHandlingService";


// Function to fetch the category name based on category_id
const fetchCategoryName = async (categoryId) => {
  // console.log('categoryId ::: ', categoryId)
  const categoryDataHandler = new DataHandlingService('Categories');
  try {
    const categoryData = await categoryDataHandler.fetchFromId(categoryId);
    return categoryData;
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
};

export const fetchMenuData = async () => {
  const dataHandler = new DataHandlingService('Menu');
  try {
    const fetchedData = await dataHandler.getData();
   // Fetch and map category names
   const dataWithCategoryNames = await Promise.all(
    fetchedData.map(async (menuItem) => {
      // console.log('menuItem', menuItem)
      const categoryName = await fetchCategoryName(menuItem.category_id);
      // console.log('categoryName ::: ', categoryName)
      return {
        ...menuItem,
        category_details: categoryName,
      };
    })
  );

  return dataWithCategoryNames;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchCategoryOptionData = async (fieldType) => {
  try {
    const categoryDataHandler = new DataHandlingService('Categories');
    const fetchedCategoryData = await categoryDataHandler.fetchDataWithQuery('type', '==',fieldType);
    if (fetchedCategoryData) {
      const mappedOptions = fetchedCategoryData.map(item => ({
        value: item.name,
        id: item.id,
        type: item.type,
        has_temp: item.has_temp
      }));
      return mappedOptions;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
