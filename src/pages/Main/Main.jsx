import NewsBunner from '../../components/NewsBunner/NewsBunner';
import NewsList from '../../components/NewsList/NewsList';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';
import Search from '../../components/Search/Search';

import styles from './styles.module.css';

import { getCategories, getNews } from '../../api/apiNews';

import { useFetch } from '../../helpers/hooks/useFetch';
import { useDebounce } from '../../helpers/hooks/useDebounce';

import { PAGE_SIZE, TOTAL_PAGES } from '../../constatnts/constatnts';
import { useFilters } from '../../helpers/hooks/useFilters';

const Main = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  });

  const debouncedKetWords = useDebounce(filters.keywords, 1500);

  const { data, error, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKetWords,
  });

  const { data: dataCategories } = useFetch(getCategories);

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1);
    }
  };

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_number', filters.page_number - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    changeFilter('page_number', pageNumber);
  };

  return (
    <main className={styles.main}>
      {dataCategories ? (
        <Categories
          categories={dataCategories.categories}
          setSelectedCategory={(category) => changeFilter('category', category)}
          selectedCategory={filters.category}
        />
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeyWords={(keywords) => changeFilter('keywords', keywords)}
      />

      <NewsBunner isLoading={isLoading} item={data && data.news && data.news[0]} />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
      />

      <NewsList isLoading={isLoading} news={data?.news} />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handlePageClick={handlePageClick}
      />
    </main>
  );
};

export default Main;
