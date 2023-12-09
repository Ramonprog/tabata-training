import { useState } from 'react';
import './App.css'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'
import { AllTimes } from './types';

function App() {
  const [alltimes, setAllTimes] = useState<AllTimes>({
    training: '',
    rest: ''
  });

  const [cycle, setCycle] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(alltimes)
    console.log(cycle)
  }

  function handleTimeChange(time: Date, type: keyof AllTimes) {
    setAllTimes({
      ...alltimes,
      [type]: time.$s
    });
  }
  return (
    <>
      <NavBar />
      <Form func={handleTimeChange} setCycle={setCycle} handleSubmit={handleSubmit} />
    </>
  )
}

export default App
