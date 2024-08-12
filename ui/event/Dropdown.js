import React from 'react';
import { Dropdown } from 'flowbite-react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function isValidToCheckout(checkInTime, checkOutTime) {
  if (!checkInTime || checkOutTime) return false;
  return (new Date() - new Date(checkInTime)) / 1000;
}

export function DropdownMenu({
  name,
  checkInTime,
  checkOutTime,
  checkInFunction,
  checkOutFunction,
}) {
  const [showCheckoutButton, setShowCheckoutButton] = React.useState(
    isValidToCheckout(checkInTime, checkOutTime)
  );

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (!showCheckoutButton && checkInTime && !checkOutTime) {
      const timeRemaining = 5 - (new Date() - new Date(checkInTime)) / 1000;

      if (timeRemaining > 0) {
        const timer = setTimeout(() => {
          setShowCheckoutButton(true);
        }, timeRemaining * 1000);

        return () => clearTimeout(timer);
      }
      setShowCheckoutButton(true);
    }
  }, [checkInTime, checkOutTime, showCheckoutButton]);

  return (
    <Dropdown
      label=""
      renderTrigger={() => (
        <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" />
      )}
      dismissOnClick={false}
    >
      <Dropdown.Header>
        <span>
          {checkInTime && checkOutTime
            ? `${name} already made check-in and check-out`
            : 'Options: '}
        </span>
      </Dropdown.Header>

      {checkInTime ? null : (
        <Dropdown.Item>
          <div
            className="w-full cursor-pointer px-2 py-1 text-left text-sm"
            onClick={checkInFunction}
          >
            Check-in {name}
          </div>
        </Dropdown.Item>
      )}

      {checkInTime && showCheckoutButton && !checkOutTime ? (
        <Dropdown.Item className="flex flex-col">
          <div
            className="w-full cursor-pointer px-2 py-1 text-left text-sm"
            onClick={checkOutFunction}
          >
            Check-out {name}
          </div>
        </Dropdown.Item>
      ) : null}
    </Dropdown>
  );
}
