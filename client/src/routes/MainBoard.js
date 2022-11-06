import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useState} from 'react';
import Loader from '../components/Loader';
import {useNavigate} from 'react-router-dom';
import AuthContext from '../utils/AuthProvider';

const theUser = {
  name:'You',
  id:'00000'
}

function MainBoard() {

  const [members, setMembers] = useState([theUser])
  const [expenses,setExpenses] = useState([])
  const navigate = useNavigate()

  const {auth} = useContext(AuthContext)

  if(!auth){
    navigate('/login')
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
