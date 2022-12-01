/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../utils/AuthProvider';
import {getGroupData} from '../serverApi/server';

function MainBoard() {

  const {auth,currentUser} = useContext(AuthContext)
  const defaultUser = currentUser? {name:currentUser.username,id:currentUser._id,groups:currentUser.groups}:{name:'...loading',id:null}
  const [group , setGroup] = useState({id:null, members:[]})
  const [expenses,setExpenses] = useState([])
  console.log(defaultUser)

  useEffect(()=>{
    if(auth && defaultUser.groups[0]){
      getGroupData(defaultUser.groups[0]._id.toString()).then(e =>{
        setGroup(e)
        setExpenses(e.expenses)
      })
    }
  },[auth,setGroup])
  if(!auth){
    return <Navigate to='/login'/>
  }
  
  const props = { setGroup, group, setExpenses, expenses}

  return (
    <div className="App">
      <Header />
      <Dashboard {...props} />
    </div>
  );
}
export default MainBoard;
