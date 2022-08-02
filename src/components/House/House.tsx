import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { House as IHouse } from '../../features/houses/houseSlice';
import { db } from '../../firebase';
import { Box, Text } from '../../UI';

const House = () => {
  const [houseData, setHouseData] = useState<IHouse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { id } = useParams();

  const getHouse = async (id: string) => {
    setLoading(true);

    try {
      const docRef = await getDoc(doc(db, 'houses', id));

      if (docRef.exists()) {
        setLoading(false);

        const response = docRef.data() as IHouse;
        return setHouseData(response);
      }
      return setError('Document does not exist');
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getHouse(id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Box p={30}>
        <Text as="h3" size="h3" fontWeight="black" color="error" center>
          Sorry, something went wrong!
        </Text>
      </Box>
    );
  }
  return (
    <Box p={20}>
      <Box m="0 0 20px 0">
        <Link to="/">
          <Text color="primary" center>
            « Back to HOUSE listing
          </Text>
        </Link>
      </Box>

      {loading || !houseData ? (
        <Box p={30}>
          <Text as="h3" size="h3" fontWeight="black" color="primary" center>
            Loading...
          </Text>
        </Box>
      ) : (
        <Box bg="primary800" p={10}>
          <Text as="h2" size="h2" fontWeight="black" color="primary300">
            {houseData.name}
          </Text>

          <Box h={5} />

          <Text as="h3" size="md" fontWeight="bold">
            {houseData.place}
          </Text>
          <Text as="h3" size="md">
            {houseData.address}
          </Text>

          <Box h={20} />

          <Text as="p" size="md">
            {houseData.description}
          </Text>

          <Box h={20} />

          <Box bg="primary700" m="10px 0 0" p={5} style={{ width: '100%' }}>
            <Text as="p" size="sm" color="primary" fontWeight="black" center>
              {houseData.price} ron
            </Text>
          </Box>

          <Box h={20} />

          <Text as="p">
            <Text as="span">
              <Text as="span" fontWeight="black">
                MIN:
              </Text>{' '}
              {houseData.min} persons
            </Text>
            <Text as="span"> | </Text>
            <Text as="span">
              <Text as="span" fontWeight="black">
                Max
              </Text>{' '}
              {houseData.max} persons
            </Text>
          </Text>
          <Box h={1} bg="primary700" m="10px 0" />
          <Text as="p">
            <Text as="span">
              <Text as="span" fontWeight="black">
                Bedrooms:
              </Text>{' '}
              {houseData.bedrooms}
            </Text>
            <Text as="span"> | </Text>
            <Text as="span">
              <Text as="span" fontWeight="black">
                Bathrooms
              </Text>{' '}
              {houseData.bathrooms}
            </Text>
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default House;
