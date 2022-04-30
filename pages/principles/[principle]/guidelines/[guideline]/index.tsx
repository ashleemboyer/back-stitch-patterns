import Link from 'next/link';
import data from '../../../../../data.json';
import { wrapLine } from '../../../../../utils/wrapLines';
import Breadcrumb from '../../../../../components/breadcrumb';
import Pattern from '../../../../../components/pattern';

const IndividualGuidelinePage = ({ guideline, principle }) => {
  const patternLines = [
    `Guideline ${guideline.ref_id}`,
    ...wrapLine(guideline.title),
    '-------------------------',
    ...wrapLine(guideline.description),
  ];

  return (
    <>
      <Breadcrumb />
      <h1>
        Guideline {guideline.ref_id} - {guideline.title}
      </h1>
      <p>{guideline.description}</p>
      <hr />
      <ul>
        {guideline.success_criteria.map((sc) => (
          <li>
            <Link
              href={`/principles/${
                principle.ref_id
              }/guidelines/${guideline.ref_id
                .split('.')
                .join('-')}/success-criteria/${sc.ref_id.split('.').join('-')}`}
            >
              <a>
                {sc.ref_id} {sc.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <h2>Pattern</h2>
      <Pattern lines={patternLines} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: { guideline: guidelineNumber, principle: principleNumber },
  } = context;
  const principle = data.find((p) => p.ref_id === principleNumber);
  const guideline = principle.guidelines.find(
    (g) => g.ref_id === guidelineNumber.split('-').join('.'),
  );

  return {
    props: { guideline, principle },
  };
};

export const getStaticPaths = async () => {
  const paths = [];
  data.forEach((principle) => {
    principle.guidelines.forEach((guideline) => {
      paths.push(
        `/principles/${principle.ref_id}/guidelines/${guideline.ref_id
          .split('.')
          .join('-')}`,
      );
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export default IndividualGuidelinePage;
