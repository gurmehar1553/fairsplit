import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useState} from 'react';
import Loader from '../components/Loader';

const theUser = {
  name:'You',
  id:'00000'
}

function MainBoard() {
  
  const [members, setMembers] = useState([theUser])
  const [expenses,setExpenses] = useState([])

  const props = {
    setMembers,
    members,
    setExpenses,
    expenses
  }

  return (
    <div className="App">
      <Loader />
      <Header />
      <Dashboard {...props} />
    </div>
  );
}
export default MainBoard;
