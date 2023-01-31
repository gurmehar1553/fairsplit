/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useEffect, useState} from 'react';
import AuthContext from '../utils/AuthProvider';
import {getGroupData} from '../serverApi/server';
import Buffering from '../components/Buffering';

function MainBoard() {

  const {auth,currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [activeGroup , setActiveGroup] = useState(currentUser.groups[0])
  const [expenses,setExpenses] = useState([])

  useEffect(()=>{
    if(auth && currentUser.groups[0]){
      setLoading(true)
      getGroupData(currentUser.groups[0]._id.toString()).then(e =>{
        setActiveGroup(e.group)
        setExpenses(e.group.expenses)
        setLoading(false)
      })
    }
  },[auth,setActiveGroup])
  
  const props = { setGroup:setActiveGroup, group:activeGroup, setExpenses, expenses}

  return (
    <div className="App">
      <Header />
      {loading? <Buffering />:<Dashboard {...props} /> }
    </div>
  );
}
export default MainBoard;
