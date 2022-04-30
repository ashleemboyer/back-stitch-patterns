import Link from 'next/link';
import data from '../../../data.json';
import Pattern from '../../../components/pattern';
import { wrapLine } from '../../../utils/wrapLines';
import Breadcrumb from '../../../components/breadcrumb';

const PrinciplePage = ({ principle }) => {
  if (!principle) {
    return;
  }

  const patternLines = [
    `Principle ${principle.ref_id} - ${principle.title}`,
    '--------------------------',
    ...wrapLine(principle.description),
  ];

  return (
    <>
      <Breadcrumb />
      <h1>
        Principle {principle.ref_id} - {principle.title}
      </h1>
      <h2>Guidelines</h2>
      <ul>
        {principle.guidelines.map((guideline) => {
          return (
            <li>
              <Link
                href={`/principles/${
                  principle.ref_id
                }/guidelines/${guideline.ref_id.split('.').join('-')}`}
              >
                <a>
                  {guideline.ref_id} {guideline.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <br />
      <h2>Pattern</h2>
      <Pattern lines={patternLines} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: { principle: principleNumber },
  } = context;

  return {
    props: {
      principle: data.find((principle) => principle.ref_id === principleNumber),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: data.map((principle) => `/principles/${principle.ref_id}`),
    fallback: true,
  };
};

export default PrinciplePage;
