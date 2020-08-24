import React, {useState, useEffect} from 'react';
import './App.css';
import RepositoriesList from './RepositoriesList';
import Pagination from './Pagination';
import './MainPage.css';


function MainPage() {
  const [repositories, setRepositories] = useState([]);

  // Setting default current page and number of repositories per page for pagination.
  const [currentPage, setCurrentPage] = useState(1);
  const [repositoriesPerPage] = useState(10);

  // Setting default query and number of repositories to show 10 most popular repositories.
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState(`stars:>=5`);
  const [numberOfRepositories, setNumberOfRepositories] = useState(10);

  // Using state to know when API is loaded and ready to be used.
  const [fetchInProgress, setFetchInProgress] = useState(false);


  // Getting repositories list after page reload and every time the query changed.
  useEffect(() => {
    fetchPosts();
    document.title = 'Главная страница';
  }, [query])

  const fetchPosts = async () => {
    setFetchInProgress(true);
    const response = await fetch(`https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=${numberOfRepositories}`);
    const data = await response.json();
    setFetchInProgress(false);
    setRepositories(data.items);
  }

  // Changing search-bar input.
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  // If search-bar input isn't empty, change query and number of repositories to search by name of repository.
  const getSearch = e => {
    e.preventDefault();
    if (search != '') {
      setQuery(`${search}+in:name`);
      setNumberOfRepositories(100);
    }
  }

  const backToPopular = () => {
    setQuery(`stars:>=5`);
    setNumberOfRepositories(10);
    setSearch('');
  }

  // Counting repositories we got for pagination.
  const indexOfLastRepository = currentPage * repositoriesPerPage;
  const indexOfFirstRepository = indexOfLastRepository - repositoriesPerPage;
  const currentRepositories = repositories.slice(indexOfFirstRepository, indexOfLastRepository);

  const paginate = pageNumber => setCurrentPage(pageNumber); 

  return (
      <div className="App">
        <form onSubmit={getSearch} className='search-form'>
          <input onChange={updateSearch} value={search} className='search-bar' type="text" placeholder='Введите название репозитория'/>
          <button className='search-button' type='submit'>Поиск</button>
        </form>
        <RepositoriesList 
          fetchInProgress={fetchInProgress}
          repositories={currentRepositories}
          backToPopular={backToPopular}
        />
        <Pagination
          repositoriesPerPage={repositoriesPerPage}
          totalRepositories={repositories.length}
          paginate={paginate}
        />
      </div>
  );
}

export default MainPage;
