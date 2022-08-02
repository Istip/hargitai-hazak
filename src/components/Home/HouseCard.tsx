import { Link } from 'react-router-dom';
import { House } from '../../features/houses/houseSlice';
import { Box, Flex, Text } from '../../UI';
import { ListItem } from './HouseCard.styles';

const HouseCard: React.FC<{ house: House }> = ({ house }) => {
  return (
    <Link to={`/houses/${house.id}`} style={{ all: 'unset' }}>
      <ListItem>
        <Flex>
          <Box w={250} bg="primary700" m="0 10px 0 0" />

          <Box style={{ width: '100%' }}>
            <Text as="h2" size="h2" fontWeight="black" color="primary300">
              {house.name}
            </Text>
            <Box h={5} />
            <Text as="h3" size="md" fontWeight="bold">
              {house.place}
            </Text>
            <Text as="h3" size="md">
              {house.address}
            </Text>

            <Box h={10} />
            <Text as="p" size="xs">
              {house.description.substring(0, 50)}...
            </Text>
            <Box h={10} />

            <Box bg="primary700" m="10px 0 0" p={5}>
              <Text as="p" size="sm" color="primary" fontWeight="black" center>
                {house.price} ron
              </Text>
            </Box>
          </Box>
        </Flex>
      </ListItem>
    </Link>
  );
};

export default HouseCard;
