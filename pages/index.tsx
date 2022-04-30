import Link from 'next/link';
import data from '../data.json';

const HomePage = () => {
  return (
    <>
      <h1>Principles</h1>
      <ul>
        {data.map((principle) => (
          <li>
            <Link href={`/principles/${principle.ref_id}`}>
              <a>{principle.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
