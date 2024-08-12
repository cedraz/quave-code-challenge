import React from 'react';
import { Button, Dropdown } from 'flowbite-react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const SelectButton = React.forwardRef(({ communityName, ...props }, ref) => (
  <Button
    ref={ref}
    className="h-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    {...props}
  >
    {communityName || 'Select an event'}
    <ChevronDownIcon className="ml-2 h-6 w-6" />
  </Button>
));

const SelectCommunityMenu = ({ communities, onSelect }) => {
  const [selectedCommunity, setSelectedCommunity] = React.useState(null);

  const handleSelect = (value) => {
    onSelect(value._id);
    setSelectedCommunity(value.name);
  };

  return (
    <Dropdown
      onSelect={handleSelect}
      label=""
      dismissOnClick={false}
      className="h-fit"
      renderTrigger={() => <SelectButton communityName={selectedCommunity} />}
    >
      {communities.map((community) => (
        <Dropdown.Item
          key={community._id}
          onClick={() => handleSelect(community)}
        >
          {community.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export { SelectCommunityMenu };
