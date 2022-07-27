import { Link } from 'react-router-dom';
import { House } from '../../features/houses/houseSlice';

interface IProps {
  house: House;
}

const HouseCard: React.FC<IProps> = ({ house }) => {
  return (
    <Link to={`/houses/${house.id}`} style={{ all: 'unset' }}>
      <li>
        <h2>{house.name}</h2>
        <h4>{house.place}</h4>
        <h4>{house.address}</h4>
        <br />
        <p>{house.description}</p>
        <br />
        <p>{house.price}</p>
      </li>
    </Link>
  );
};

export default HouseCard;
