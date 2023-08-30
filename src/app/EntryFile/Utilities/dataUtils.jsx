import DataHandlingService from "../Services/DataHandlingService";
import StorageHandlingService from "../Services/StorageHandlingService";
import { formatPrice } from "./priceUtils";


// Function to fetch the category name based on category_id
const fetchCategoryName = async (categoryId) => {
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
  const storageHandler = new StorageHandlingService();
  try {
    const fetchedData = await dataHandler.getData();
    // Fetch and map category names
    const dataWithCategoryNames = await Promise.all(
      fetchedData.map(async (menuItem) => {
        const categoryName = await fetchCategoryName(menuItem.category_id);
        const imgsNames = await storageHandler.getNames(menuItem.imgs);

        const imgList = imgsNames.map((imgName, index) => ({
          name: imgName,
          url: menuItem.imgs[index],
          isInStorage:true, // a checker to separate from files being uploaded
        }));

        const formattedPrice = categoryName.has_temp
          ? {
              hot: menuItem.price_list.hot?{
                price: formatPrice(menuItem.price_list.hot.price),
              } : null,
              cold: menuItem.price_list.cold? {
                price: formatPrice(menuItem.price_list.cold.price),
              } : null,
            }
          : {
              price: formatPrice(menuItem.price_list.price),
            };

        return {
          ...menuItem,
          category_details: categoryName,
          formatted_price: formattedPrice,
          image_files: imgList,
        };
      })
    );

    return dataWithCategoryNames;

    // Rest of your code here
  } catch (error) {
    // Handle errors
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
