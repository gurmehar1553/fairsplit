import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../utils/AuthProvider';

function MainBoard() {

  const {auth,currentUser} = useContext(AuthContext)
  const defaultUser = currentUser? {name:currentUser.username,id:currentUser._id}:{name:'User Not Found',id:null}
  const [members , setMembers] = useState([defaultUser])
  const [expenses,setExpenses] = useState([])

  if(!auth){
    return <Navigate to='/login'/>
  }
  
  const props = { setMembers, members, setExpenses, expenses}

  return (
    <div className="App">
      <Header />
      <Dashboard {...props} />
    </div>
  );
}
export default MainBoard;
