import React, { Fragment, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../build/style.css';

import AddShowModal from './AddShowModal';
import RatingModal from './RatingModal';

import NavBar from './NavBar';
import WatchList from './WatchList';
import ShowPage from './ShowPage';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = (modalObj) => {
    setModal(modalObj);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModal = () => {
    switch(modal.type) {
      case 'ADD_SHOW':
        return <AddShowModal />;
      case 'RATING':
        return <RatingModal
          show={modal.show}
          closeModal={closeModal}
        />;
    }
  };

	return (
    <>
      {showModal &&
        <div className="modal-container">
          <div className="modal-bg" onClick={() => { setShowModal(false) }}></div>
          {renderModal()}
        </div>
      }
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ?
              <div>Logged In</div> :
              <div>Not Logged In</div>
            }
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
}

export default App;