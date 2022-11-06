import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useEffect, useState} from 'react';
import Loader from '../components/Loader';
import {useNavigate} from 'react-router-dom';
import {varifyAuth} from '../serverApi/server';

const theUser = {
  name:'You',
  id:'00000'
}

function MainBoard() {

  const [members, setMembers] = useState([theUser])
  const [expenses,setExpenses] = useState([])
  const navigate = useNavigate()

  async function getAuth(){
    const condition =await varifyAuth()
    console.log("Error -----",condition)
    if(!condition){
      navigate('/login')
    }
  }

  useEffect(()=>{
    getAuth()
  },[])
  
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
