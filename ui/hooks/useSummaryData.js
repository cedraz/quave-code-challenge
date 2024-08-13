import { useCallback } from 'react';

export const useSummaryData = ({ people, selectedCommunityId }) => {
  const peopleCheckedIn = people.filter(
    (person) => person.checkInTime && !person.checkOutTime
  ).length;

  const peopleCheckedInPerCompany = useCallback(
    () =>
      people.reduce((acc, person) => {
        if (person.checkInTime && !person.checkOutTime && person.companyName) {
          const { companyName } = person;
          if (!acc[companyName]) {
            acc[companyName] = 0;
          }
          acc[companyName]++;
        }
        return acc;
      }, {}),
    [people, selectedCommunityId]
  );

  const peopleCheckedInPerCompanyString = useCallback(() => {
    const peopleCheckedInPerCompanyObj = peopleCheckedInPerCompany();
    const companies = Object.keys(peopleCheckedInPerCompanyObj);
    return companies
      .map((company) => `${company} (${peopleCheckedInPerCompanyObj[company]})`)
      .join(', ');
  }, [peopleCheckedInPerCompany]);

  const companyGroups = peopleCheckedInPerCompanyString();

  return {
    peopleCheckedIn,
    peopleNotCheckedIn: people.length - peopleCheckedIn,
    companyGroups:
      companyGroups.length > 0 ? companyGroups : 'No companies found.',
  };
};
