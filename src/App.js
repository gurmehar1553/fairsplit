import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Form from './components/Form';
import Toggelable from './components/Toggelable';

function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard/>
      <Toggelable>
        <Form />
      </Toggelable>
    </div>
  );
}

export default App;
