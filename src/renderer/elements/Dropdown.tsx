/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classNames } from '../utils/util';
import { GlobalShortcutKeysType } from '../utils/contants';

interface DropdownProps {
  items: string[] | readonly string[] | number[];
  value: string | number;
  onChange: (char: GlobalShortcutKeysType | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="mt-1 relative ">
            <Listbox.Button className="flex w-[55px] items-center justify-between border-gray-300 px-1 dark:bg-dark-light dark:border-dark-light dark:text-white border rounded-md focus:outline-none dark:focus:bg-dark-dark">
              <span className="block text-sm truncate text-white w-full">
                {value}
              </span>
              <FontAwesomeIcon size="xs" className="text-white" icon="sort" />
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-0.5 w-full bg-dark-light shadow-lg max-h-24 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                {items?.map((item) => (
                  <Listbox.Option
                    key={item}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-white',
                        'cursor-default select-none relative py-1 pl-3 '
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-1'
                            )}
                          >
                            <FontAwesomeIcon
                              size="xs"
                              className="text-white"
                              icon="check"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Dropdown;
