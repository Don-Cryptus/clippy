import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const History: React.FC = () => {
  return (
    <>
      <div className="border border-solid rounded-md border-zinc-700 shadow-2xl">
        <div className="flex items-center mb-2 space-x-2 bg-zinc-800 px-5 pt-5 pb-2.5">
          <FontAwesomeIcon icon={['far', 'hdd']} />
          <h2 className="font-semibold">Local Storage</h2>
        </div>

        <ul className="list-disc mx-5 px-5 pb-5">
          <li>1124 local item (7.71 MB) are saved on this computer</li>
        </ul>
      </div>
      <div className="pt-5 flex w-full justify-end">
        <button
          type="button"
          className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded inline-flex items-center space-x-2 text-sm"
        >
          <FontAwesomeIcon icon={['fas', 'trash-alt']} />
          <span>Clear...</span>
        </button>
      </div>
    </>
  );
};

export default History;
