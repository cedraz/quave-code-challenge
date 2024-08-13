import React from 'react';

// Components
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Button, Dropdown } from 'flowbite-react';

const SelectButton = React.forwardRef(({ communityName, ...props }, ref) => (
  <Button
    ref={ref}
    className="h-fit rounded bg-primary-quaveColor px-4 py-2 font-bold text-white hover:bg-primary-quaveColor"
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
