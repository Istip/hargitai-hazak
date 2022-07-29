import { useAppSelector } from '../../hooks/reduxHooks';
import NewHouse from './NewHouse';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div>
      <h3>This is going to be the profile page</h3>
      <br />
      <img
        src={user?.photoUrl}
        alt={user?.displayName}
        style={{ borderRadius: '50%' }}
      />
      <h3
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {user?.displayName}
      </h3>
      <p
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {user?.email}
      </p>

      <NewHouse />
    </div>
  );
};

export default Profile;
