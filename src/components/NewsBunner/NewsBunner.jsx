import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import withSkeleton from '../../helpers/hocs/witjhSkeleton';
import Image from '../Image/Image';
import styles from './styles.module.css';

const NewsBunner = ({ item }) => {
  return (
    <div className={styles.banner}>
      <Image image={item?.image} />
      <h3 className={styles.title}>{item?.title}</h3>
      <p className={styles.extra}>
        {formatTimeAgo(item?.published)} by {item?.author}
      </p>
    </div>
  );
};

const NewsBunnerWithSkeleton = withSkeleton(NewsBunner, 'banner', 1);

export default NewsBunnerWithSkeleton;
