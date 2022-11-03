import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useState} from 'react';
import Loader from '../components/Loader';
import {Navigate} from 'react-router-dom';

const theUser = {
  name:'You',
  id:'00000'
}

function MainBoard({auth}) {
  
  console.log(auth);
  const [members, setMembers] = useState([theUser])
  const [expenses,setExpenses] = useState([])

  if(!auth){
    return (
      <Navigate to="/login" />
    )
  }
  
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
