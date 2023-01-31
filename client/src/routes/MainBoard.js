/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'
import {useContext, useEffect, useState} from 'react';
import AuthContext from '../utils/AuthProvider';
import {getGroupData} from '../serverApi/server';
import Buffering from '../components/Buffering';
import {Link} from 'react-router-dom';

function NoGroupComp(){
  return(
    <>
      <div className='noGroupComp'>
        <h1>  
          You are not in any Group...
          <div className='text-center'>
            <Link className='btn loginBtn my-auto' to='/groupsForm'>Add Group</Link>
          </div>
        </h1>
      </div>
    </>
  )
}

function MainBoard() {

  const {auth,currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [activeGroup , setActiveGroup] = useState(currentUser.groups[0])
  const [expenses,setExpenses] = useState([])

  useEffect(()=>{
    // console.log(currentUser)
    if(currentUser.groups.length===0){
      setActiveGroup(null)
      setLoading(false)
    }
    else if(auth && currentUser.groups[0]){
      setLoading(true)
      getGroupData(currentUser.groups[0]._id.toString()).then(e =>{
        setActiveGroup(e.group)
        setExpenses(e.group.expenses)
        setLoading(false)
      })
    }
  },[auth,setActiveGroup])
  
  const props = { setGroup:setActiveGroup, group:activeGroup, setExpenses, expenses}
  if(activeGroup===null){
    return(
      <>
        <div className="App">
          <Header />
          <NoGroupComp />
        </div>

      </>
    )
  }
  return (
    <div className="App">
      <Header />
      {loading? <Buffering />:<Dashboard {...props} /> }
    </div>
  );
}
export default MainBoard;
