import Header from './components/Header'
import Dashboard from './components/Dashboard'
import {useState} from 'react';
import Loader from './components/Loader';

function App() {

  const [members, setMembers] = useState([{
    name:'You',
    id:'00000'
  }])
  const [expenses,setExpenses] = useState([])
  return (
    <div className="App">
      <Loader />
      <Header />
      <Dashboard setMembers={setMembers} members={members} setExpenses={setExpenses} expenses={expenses} />
    </div>
  );
}
export default App;
