import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const getHouses = async () => {
  const querySnapshot = await getDocs(collection(db, 'houses'));
  const houses: any = [];
  querySnapshot.forEach((doc) => {
    const {
      address,
      bathrooms,
      bedrooms,
      description,
      max,
      min,
      name,
      place,
      price,
    } = doc.data();
    return houses.push({
      id: doc.id,
      address,
      bathrooms,
      bedrooms,
      description,
      max,
      min,
      name,
      place,
      price,
    });
  });

  return houses;
};

const houseService = { getHouses };
export default houseService;
