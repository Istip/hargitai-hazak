import { useEffect } from 'react';
import { getHouses } from '../../features/houses/houseSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
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
      <h2>Houses</h2>
      <p>Main page, will be visible by every visitor!</p>

      <br />

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
    </div>
  );
};

export default Home;
