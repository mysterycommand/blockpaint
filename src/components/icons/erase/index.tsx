import React, { FC } from 'react';
import '../style.css';

type EraseProps = {};

const Erase: FC<EraseProps> = () => (
  <svg
    className="icon erase"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zm-.009-17.942h-.09l-4.17.38a2 2 0 0 0-1.21.57l-9 9a1.92 1.92 0 0 0 .07 2.71l2.74 2.74a2 2 0 0 0 2.66.07l9-9a2 2 0 0 0 .57-1.21l.43-4.17a1 1 0 0 0-1-1.09zm-10.27 14l-2.73-2.73 2-1.95 2.68 2.68-1.95 2zm8.9-8.91l-5.63 5.59-2.7-2.7 5.6-5.6 3-.28-.27 2.99z" />
  </svg>
);

export default Erase;
