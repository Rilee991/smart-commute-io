import React, { useState, useRef, useEffect } from 'react';

export const Select = ({ children, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className="relative inline-block text-left w-52">
      {React.Children.map(children, child =>
        React.cloneElement(child, { isOpen, setIsOpen, value, onChange })
      )}
    </div>
  );
};

export const SelectTrigger = ({ children, isOpen, setIsOpen }) => (
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
    aria-haspopup="true"
    aria-expanded={isOpen}
  >
    {children}
    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
);

export const SelectContent = ({ children, isOpen }) => (
  isOpen && (
    <div className="origin-top-right absolute right-0 mt-2 z-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {children}
      </div>
    </div>
  )
);

export const SelectItem = ({ children, value, onChange }) => (
  <button
    onClick={() => onChange(value)}
    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
  >
    {children}
  </button>
);

export const SelectValue = ({ placeholder, value }) => (
  <span>{value || placeholder}</span>
);
