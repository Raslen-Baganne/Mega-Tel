import React from 'react';
import Navb from '../sections/Navbar/Navb';
import Footer from '../sections/Footer/Footer';

const MemoizedNavb = React.memo(Navb);
const MemoizedFooter = React.memo(Footer);

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <MemoizedNavb />
      {children}
      <MemoizedFooter />
    </div>
  );
};

export default DefaultLayout;
