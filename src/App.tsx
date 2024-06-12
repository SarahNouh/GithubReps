import { useEffect, useState } from 'react';
import './App.css';
import RepoCard from './components/RepoCard';

export interface Repo {
  id: number;
  full_name: string;
  language: string;
  name: string;
  owner: { avatar_url: string };
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}
function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [formError, setFormError] = useState('');
  const [reposError, setReposError] = useState('');

  /**
   * fetch an initial list of my repos to be displayed until the user actually performs a search operation
   */
  const fetchData = async () => {
    try {
      const reposResponse = await fetch(`https://api.github.com/users/sarahnouh/repos`);
      const response = await reposResponse.json();
      if (reposResponse.status === 200) {
        setRepos(response);
        // clear repos error if any
        if (reposError) {
          setReposError('');
        }
        return;
      }
      setReposError('Error fetching repos');
    } catch (err) {
      console.log(err);
      setReposError('Error fetching repositories!');
    } finally {
      setLoading(false);
    }
  };

  const searchRepos = async (searchKeyword: string) => {
    try {
      setLoading(true);
      const reposResponse = await fetch(`https://api.github.com/search/repositories?per_page=10&q=${searchKeyword}`);
      const response = await reposResponse.json();

      if (reposResponse.status === 200) {
        setRepos(response.items);
        // clear repos error if any
        if (reposError) {
          setReposError('');
        }
        return;
      }
      setReposError('Error searching repositories!');
    } catch (err) {
      setReposError('Error searching repositories!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="container">
      <h1>Github Repos Search</h1>
      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          if (searchKeyword) {
            if (formError) {
              //clear form errors if any
              setFormError('');
            }
            searchRepos(searchKeyword);
          } else {
            setFormError('Please enter a search keyword first!');
          }
        }}
      >
        <input
          type="search"
          placeholder="search repositories"
          onChange={event => {
            setSearchKeyword(event.currentTarget.value);
          }}
        />
        <button>Search</button>
      </form>
      <p className="error">{formError}</p>

      <ul className="cards-container">
        {loading ? (
          <p>loading...</p>
        ) : reposError ? (
          <p className="error">{reposError}</p>
        ) : repos && repos.length === 0 ? (
          <p> No results found for your current search keyword, please try again with a different keyword</p>
        ) : (
          repos.map(repo => <RepoCard repo={repo} key={repo.id} />)
        )}
      </ul>
    </main>
  );
}

export default App;
