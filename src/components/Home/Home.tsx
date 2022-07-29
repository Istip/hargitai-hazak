import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHouses } from '../../features/houses/houseSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { Text } from '../../UI';
import HouseCard from './HouseCard';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { houses, isLoading, isError } = useAppSelector(
    (state) => state.houses
  );

  useEffect(() => {
    dispatch(getHouses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <div>
        <h3>Sorry, something went wrong!</h3>
      </div>
    );
  }

  return (
    <div>
      <Text as="h2" size="h2" fontWeight="bold" center>
        Houses
      </Text>

      {isLoading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <ul>
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </ul>
      )}

      <Text center>
        <Link to="/profile">GO TO PROFILE »</Link>
      </Text>
    </div>
  );
};

export default Home;
