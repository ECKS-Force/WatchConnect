import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../../build/style.css';

import RatingModal from './RatingModal';

import Navbar from './Navbar';
import Login from './Login';
import WatchList from './WatchList';
import ShowPage from './ShowPage';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    // check if logged in
    const sessionCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('session='));
    
    if (sessionCookie && sessionCookie.split('=')[1] === 'true') {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const openModal = (modalObj) => {
    setModal(modalObj);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    switch(modal.type) {
      case 'RATING':
        return <RatingModal
          show={modal.show}
          closeModal={closeModal}
        />;
    }
  };

  // if (!loggedIn) {
  //   return (
  //     <Switch>
  //       <Route path="/login">
  //         <Login />
  //       </Route>
  //       <Route path="/signup">
  //         <div>Sign up</div>
  //       </Route>
  //       {/* <Route path="/">
  //         <Redirect to="/login" />
  //       </Route> */}
  //     </Switch>
  //   );
  // } else {
    return (
      <>
        {showModal &&
          <div className="modal-container">
            <div className="modal-bg" onClick={() => { setShowModal(false) }}></div>
            {renderModal()}
          </div>
        }
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/">
              <div>Home</div>
            </Route>
            <Route path="/my-list">
              <WatchList openModal={openModal} />
            </Route>
            <Route path="/shows/:id">
              <ShowPage openModal={openModal} />
            </Route>
          </Switch>
        </main>
      </>
    );
  // }
}

export default App;