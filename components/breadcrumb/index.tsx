import { useRouter } from 'next/router';
import Link from 'next/link';
import data from '../../data.json';

const Breadcrumb = () => {
  const {
    query: {
      principle: principleId,
      guideline: guidelineId,
      criterion: criterionId,
    },
  } = useRouter();

  let principle, guideline, criterion;
  const links = [{ href: '/', text: 'Home' }];

  if (principleId) {
    principle = data.find((p) => p.ref_id.split('.').join('-') === principleId);
    links.push({
      href: `/principles/${principleId}`,
      text: `Principle ${principle.ref_id} - ${principle.title}`,
    });
  }

  if (guidelineId) {
    guideline = principle.guidelines.find(
      (g) => g.ref_id.split('.').join('-') === guidelineId,
    );
    links.push({
      href: `/principles/${principleId}/guidelines/${guidelineId}`,
      text: `Guideline ${guideline.ref_id} - ${guideline.title}`,
    });
  }

  if (criterionId) {
    criterion = guideline.success_criteria.find(
      (sc) => sc.ref_id.split('.').join('-') === criterionId,
    );
    links.push({
      href: `/principles/${principleId}/guidelines/${guidelineId}/success-criteria/${criterionId}`,
      text: `SC ${criterion.ref_id} - ${criterion.title}`,
    });
  }

  return (
    <nav>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          margin: 0,
          marginBottom: 24,
          padding: 0,
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        {links.map((link, index) => (
          <>
            {index !== 0 && (
              <li role="separator" style={{ marginRight: 12, marginLeft: 12 }}>
                {'>'}
              </li>
            )}
            <li>
              <Link href={link.href}>
                <a
                  aria-current={index === links.length - 1 ? 'page' : undefined}
                >
                  {link.text}
                </a>
              </Link>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
