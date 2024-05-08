import { useState } from 'react';
import Scooter from "./screens/Scooter";
import AccountComp from './screens/AccountComp'
import React from 'react';


const App = () => {

  const [isAccount, setIsAccount] = useState(true);

  return (
    <>
      <button className='btn btn-success' onClick={() => setIsAccount(!isAccount)}>Toggle Account / Scooter</button>
      {
        isAccount ? <AccountComp /> : <Scooter />
      }
    </>
  )
}

export default App