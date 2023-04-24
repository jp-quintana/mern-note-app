import { FaTrashAlt, FaRegClone, FaLink, FaEdit } from 'react-icons/fa';
import { TbStar, TbStarOff, TbArrowForwardUp } from 'react-icons/tb';

import styles from './index.module.scss';

const NavElementMenu = ({ isFavorite }) => {
  // TODO: Complete last edited
  return (
    <div className={styles.container}>
      <div className={styles.list_wrapper}>
        <ul className={styles.list}>
          <li
            onClick={() => console.log('delete')}
            className={styles.list_item}
          >
            <FaTrashAlt size={`1.6rem`} />
            <p>Delete</p>
          </li>
          <li className={styles.list_item}>
            <>
              {!isFavorite && (
                <>
                  <TbStar size={`1.6rem`} />
                  <p>Add to Favorites</p>
                </>
              )}
              {isFavorite && (
                <>
                  <TbStarOff size={`1.6rem`} />
                  <p>Remove from Favorites</p>
                </>
              )}
            </>
          </li>
          <li className={styles.list_item}>
            <FaRegClone size={`1.6rem`} />
            <p>Duplicate</p>
          </li>
          <li className={styles.list_item}>
            <FaLink size={`1.6rem`} />
            <p>Copy Link</p>
          </li>
          <li className={styles.list_item}>
            <FaEdit size={`1.6rem`} />
            <p>Rename</p>
          </li>
        </ul>
      </div>
      <div className={styles.move_to_wrapper}>
        <div className={styles.move_to}>
          <TbArrowForwardUp size={`1.6rem`} />
          <p>Move to</p>
        </div>
      </div>
      <div className={styles.last_edit_wrapper}>
        <p className={styles.last_edit}>Last edited...</p>
      </div>
    </div>
  );
};

export default NavElementMenu;
