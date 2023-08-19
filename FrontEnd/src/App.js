
import { useState } from 'react';
import './App.css';
import Addbook from './components/Addbook';
import Mybook from './components/Mybook';


function App() {
  const [refresh, setRefresh] = useState(true)
  function handleRefresh(e) {
    setRefresh(!refresh)
  }
  return (
    <div className="App">
      <Addbook handleRefresh={handleRefresh} />
      <Mybook refresh={refresh} />
    </div>
  );
}

export default App;
