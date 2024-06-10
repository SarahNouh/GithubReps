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

  /**
   * fetch an initial list of my repos to be displayed until the user actually performs a search operation
   */
  const fetchData = async () => {
    const reposResponse = await fetch(`https://api.github.com/users/sarahnouh/repos`);
    const response = await reposResponse.json();
    setRepos(response);
    setLoading(false);
  };

  const searchRepos = async (searchKeyword: string) => {
    setLoading(true);
    const reposResponse = await fetch(`https://api.github.com/search/repositories?per_page=10&q=${searchKeyword}`);
    const response = await reposResponse.json();
    setRepos(response.items);
    setLoading(false);
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
          searchRepos(searchKeyword);
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

      <ul className="cards-container">{loading ? <p>loading...</p> : repos.map(repo => <RepoCard repo={repo} />)}</ul>
    </main>
  );
}

export default App;
