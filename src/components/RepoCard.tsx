import { useState } from 'react';
import { Repo } from '../App';
import Star from './Star';

export default function RepoCard({ repo }: { repo: Repo }) {
  const [isStarred, setIsStarred] = useState(false);

  const starRepo = async () => {
    try {
      const starredResponse = await fetch(`https://api.github.com/user/starred/${repo.full_name}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (starredResponse.ok) {
        setIsStarred(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="card">
      <div className="card__header">
        <img src={repo.owner.avatar_url} alt="" width={50} height={50} />
        <h2>{repo.name}</h2>

        <Star onClick={() => starRepo()} className={isStarred ? 'filled' : ''} />
      </div>
      <dl>
        <div className="card__detail">
          <dt>Visibility</dt>
          <dd>{repo.visibility}</dd>
        </div>
        <div className="card__detail">
          <dt>Forks</dt>
          <dd>{repo.forks}</dd>
        </div>
        <div className="card__detail">
          <dt>Open Issues</dt>
          <dd>{repo.open_issues}</dd>
        </div>
        <div className="card__detail">
          <dt>Watchers</dt>
          <dd>{repo.watchers}</dd>
        </div>
        <div className="card__detail">
          <dt>Default Branch</dt>
          <dd>{repo.default_branch}</dd>
        </div>
      </dl>
    </li>
  );
}
