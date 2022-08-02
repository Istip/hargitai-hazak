import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHouses } from '../../features/houses/houseSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Box, Text } from '../../UI';
import { HomeList } from './Home.styles';
import HouseCard from './HouseCard';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { houses, isLoading, isError } = useAppSelector(
    (state) => state.houses
  );
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getHouses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <Box p={30}>
        <Text as="h3" size="h3" fontWeight="black" color="error" center>
          Sorry, something went wrong!
        </Text>
      </Box>
    );
  }

  return (
    <Box bg="primary900" m="10px 0">
      <Box m="0 0 10px 0">
        <Text as="h2" size="h2" color="primary" fontWeight="bold" center>
          Houses
        </Text>
      </Box>

      {isLoading ? (
        <Box p={30}>
          <Text as="h3" size="h3" fontWeight="black" color="primary" center>
            Loading...
          </Text>
        </Box>
      ) : (
        <HomeList>
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </HomeList>
      )}

      {user && (
        <Text center color="primary">
          <Link to="/profile">GO TO PROFILE »</Link>
        </Text>
      )}
    </Box>
  );
};

export default Home;
