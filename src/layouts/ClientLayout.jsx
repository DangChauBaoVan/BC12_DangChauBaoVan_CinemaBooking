import React from 'react';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import withLayout from 'hocs/withLayout';

function ClientLayout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default withLayout(ClientLayout);
