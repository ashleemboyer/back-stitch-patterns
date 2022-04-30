import data from '../../../../../../../data.json';
import { wrapLine } from '../../../../../../../utils/wrapLines';
import Breadcrumb from '../../../../../../../components/breadcrumb';
import Pattern from '../../../../../../../components/pattern';

const SuccessCriterionPage = ({ criterion, guideline, principle }) => {
  if (!criterion) {
    return null;
  }

  const patternLines: string[] = [
    `Success Criterion ${criterion.ref_id}`,
    ...wrapLine(criterion.title),
    '-------------------------',
    ...wrapLine(criterion.description),
  ];

  criterion.special_cases?.forEach((specialCase) => {
    const lineWrapped = wrapLine(
      `${specialCase.title}: ${specialCase.description}`,
    );
    lineWrapped.forEach((line, index) => {
      patternLines.push(`${index === 0 ? ' - ' : '   '}${line}`);
    });
  });

  return (
    <>
      <Breadcrumb />
      <Pattern lines={patternLines} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const {
    params: {
      guideline: guidelineNumber,
      principle: principleNumber,
      criterion: criterionNumber,
    },
  } = context;
  const principle = data.find((p) => p.ref_id === principleNumber);
  const guideline = principle.guidelines.find(
    (g) => g.ref_id === guidelineNumber.split('-').join('.'),
  );
  const criterion = guideline.success_criteria.find(
    (sc) => sc.ref_id === criterionNumber.split('-').join('.'),
  );

  return {
    props: { criterion, guideline, principle },
  };
};

export const getStaticPaths = async () => {
  const paths = [];
  data.forEach((principle) => {
    principle.guidelines.forEach((guideline) => {
      guideline.success_criteria.forEach((criterion) => {
        paths.push(
          `/principles/${principle.ref_id}/guidelines/${guideline.ref_id
            .split('.')
            .join('-')}/success-criteria/${criterion.ref_id
            .split('.')
            .join('-')}`,
        );
      });
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export default SuccessCriterionPage;
