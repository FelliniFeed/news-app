import { useEffect, useState } from 'react';
import NewsBunner from '../../components/NewsBunner/NewsBunner';
import NewsList from '../../components/NewsList/NewsList';

import styles from './styles.module.css';

import { getNews } from '../../api/apiNews';
import Skeleton from '../../components/Skeleton/Skeleton';

const Main = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const response = await getNews();
        setNews(response.news);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !isLoading ? (
        <NewsBunner item={news[0]} />
      ) : (
        <Skeleton type={'banner'} count={1} />
      )}
      {!isLoading ? <NewsList news={news} /> : <Skeleton type={'item'} count={10} />}
    </main>
  );
};

export default Main;
