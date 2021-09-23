import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { getBoardsAsync } from './redux/boardSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsAsync())
  }, [dispatch])
  
  return (
    <div className="App">
      What Aaronnds do you need to run?
    </div>
  );
}

export default App;
