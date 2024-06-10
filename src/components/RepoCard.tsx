import { Repo } from '../App';
export default function RepoCard({ repo }: { repo: Repo }) {
  return (
    <li className="card">
      <div className="card__header">
        <img src={repo.owner.avatar_url} alt="" width={50} height={50} />
        <h2>{repo.name}</h2>
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
