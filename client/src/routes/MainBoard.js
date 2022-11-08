import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../utils/AuthProvider';

const theUser = {
  name:'You',
  id:'00000'
}

function MainBoard() {

  const [members, setMembers] = useState([theUser])
  const [expenses,setExpenses] = useState([])

  const {auth} = useContext(AuthContext)

  if(!auth){
    return <Navigate to='/login'/>
  }
  
  const props = {
    setMembers,
    members,
    setExpenses,
    expenses
  }

  return (
    <div className="App">
      <Header />
      <Dashboard {...props} />
    </div>
  );
}
export default MainBoard;
