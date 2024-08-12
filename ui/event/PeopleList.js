import React from 'react';
import { Pagination, Table, TextInput } from 'flowbite-react';
import { DropdownMenu } from './Dropdown';
import { Meteor } from 'meteor/meteor';
import { format } from 'date-fns';

const PeopleList = ({ people, currentEventId }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const filteredPeople = people
    .filter((person) => person.communityId === currentEventId)
    .filter(
      (person) =>
        (person.firstName &&
          person.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.lastName &&
          person.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.title &&
          person.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (person.companyName &&
          person.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const totalPages = Math.ceil(filteredPeople.length / itemsPerPage);
  const paginatedPeople = filteredPeople.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckIn = (id) => {
    Meteor.call('people.checkIn', id, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  const handleCheckOut = (id) => {
    Meteor.call('people.checkOut', id, (error) => {
      if (error) {
        console.error(error);
      }
    });
  };

  const formatDate = (date) =>
    date ? format(new Date(date), 'MM/dd/yyyy, HH:mm') : 'N/A';

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="overflow-x-auto">
      <TextInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        id="email1"
        type="email"
        placeholder="name@flowbite.com"
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
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export { PeopleList };
