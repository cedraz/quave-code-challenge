import React from 'react';

import { format } from 'date-fns';

// Components
import { Pagination, Table, TextInput } from 'flowbite-react';
import { DropdownMenu } from './OptionsDropdown';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export const PeopleList = ({ people, handleCheckIn, handleCheckOut }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // Filtrar todas as pessoas
  const filteredPeople = people.filter((person) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (person.firstName &&
        person.firstName.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (person.lastName &&
        person.lastName.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (person.title &&
        person.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (person.companyName &&
        person.companyName.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  // Paginar os resultados filtrados
  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const paginatedPeople = filteredPeople.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (date) =>
    date ? format(new Date(date), 'MM/dd/yyyy, HH:mm') : 'N/A';

  const onPageChange = (page) => setCurrentPage(page);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Redefinir para a primeira página
  };

  return (
    <div className="flex max-w-screen-2xl flex-col gap-5 overflow-x-auto">
      <TextInput
        value={searchTerm}
        onChange={handleSearchChange}
        id="searchFilter"
        placeholder="Type the name, title or company"
        icon={MagnifyingGlassIcon}
      />
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Company</Table.HeadCell>
          <Table.HeadCell>Check-in time</Table.HeadCell>
          <Table.HeadCell>Check-out time</Table.HeadCell>
          <Table.HeadCell>Options</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedPeople.map((person) => (
            <Table.Row
              key={person._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {person.firstName} {person.lastName}
              </Table.Cell>
              <Table.Cell>{person.title ? person.title : 'N/A'}</Table.Cell>
              <Table.Cell>
                {person.companyName ? person.companyName : 'N/A'}
              </Table.Cell>
              <Table.Cell>{formatDate(person.checkInTime)}</Table.Cell>
              <Table.Cell>{formatDate(person.checkOutTime)}</Table.Cell>
              <Table.Cell>
                <DropdownMenu
                  name={`${person.firstName} ${person.lastName}`}
                  checkInTime={person.checkInTime}
                  checkOutTime={person.checkOutTime}
                  checkInFunction={() => handleCheckIn(person._id)}
                  checkOutFunction={() => handleCheckOut(person._id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
