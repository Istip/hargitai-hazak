import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { House } from '../../features/houses/houseSlice';
import { db } from '../../firebase';

const NewHouse = () => {
  const initialState: Omit<House, 'id'> = {
    address: '',
    bathrooms: 1,
    bedrooms: 1,
    description: '',
    max: 1,
    min: 1,
    name: '',
    place: '',
    price: 1,
  };

  const [formData, setFormData] = useState(initialState);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newCityRef = doc(collection(db, 'houses'));
      await setDoc(newCityRef, formData);

      // setFormData(initialState);
    } catch (error) {
      console.log(error);
    }
  };

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
  } = formData;

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', padding: 20 }}
      >
        <h3>Add new house</h3>
        <br />

        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={name}
          type="text"
          onChange={onChange}
          required
        />

        <label htmlFor="place">Place:</label>
        <input
          id="place"
          name="place"
          value={place}
          type="text"
          onChange={onChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          value={address}
          type="text"
          onChange={onChange}
          required
        />

        <br />

        <label htmlFor="min">Min:</label>
        <input
          id="min"
          name="min"
          value={min}
          type="number"
          onChange={onChange}
          required
          min={1}
        />

        <label htmlFor="max">Max:</label>
        <input
          id="max"
          name="max"
          value={max}
          type="number"
          onChange={onChange}
          required
          min={1}
        />

        <br />

        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          id="bedrooms"
          name="bedrooms"
          value={bedrooms}
          type="number"
          onChange={onChange}
          required
          min={1}
        />

        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          id="bathrooms"
          name="bathrooms"
          value={bathrooms}
          type="number"
          onChange={onChange}
          required
          min={1}
        />

        <br />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          required
          rows={5}
        />

        <br />

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          name="price"
          value={price}
          type="number"
          onChange={onChange}
          required
          min={1}
        />
        <br />

        <button type="submit">CREATE NEW LISTING</button>
      </form>
    </div>
  );
};

export default NewHouse;
