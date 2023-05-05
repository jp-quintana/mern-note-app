import { useAuthContext } from 'hooks/useAuthContext';
import { useAuth } from 'hooks/useAuth';

import styles from './index.module.scss';

// TODO: Remove
const USER = {
  imageUrl: 'https://wallpaperaccess.com/full/1428034.jpg',
};

const ProfileMenu = ({ close }) => {
  const {
    user: { email, name },
  } = useAuthContext();

  const { logout } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.profile_wrapper}>
        <div className={styles.profile}>
          <div className={styles.email}>{email}</div>
          <div onClick={close} className={styles.details}>
            <img src={USER.imageUrl} alt="" />
            <p>{`${name}'s Note App`}</p>
          </div>
        </div>
      </div>
      <div className={styles.options_list}>
        <ul className={styles.options}>
          <li onClick={() => logout()} className={styles.option}>
            Logout
          </li>
        </ul>
      </div>
      <div className={styles.footer}>
        <div onClick={close} className={styles.install_wrapper}>
          <p className={styles.install}>Get windows app</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
