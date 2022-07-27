import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { House as IHouse } from '../../features/houses/houseSlice';
import { db } from '../../firebase';

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
      <div>
        <h3>Sorry, something went wrong!</h3>
      </div>
    );
  }
  return (
    <div style={{ padding: 20 }}>
      {loading || !houseData ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div>
          <Link to="/">Back to houses</Link>
          <br />
          <br />
          <h2>{houseData.name}</h2>
          <h4>{houseData.place}</h4>
          <h4>{houseData.address}</h4>
          <br />
          <p>{houseData.description}</p>
          <br />
          <p>{houseData.price}</p>
          <br />
          <p>
            <span>
              <b>MIN:</b> {houseData.min} persons
            </span>
            <span> | </span>
            <span>
              <b>Max</b> {houseData.max} persons
            </span>
          </p>
          <p>
            <span>
              <b>Baths:</b> {houseData.bathrooms}
            </span>
            <span> | </span>
            <span>
              <b>Bedrooms</b> {houseData.bedrooms}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default House;
