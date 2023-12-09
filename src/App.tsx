import { useEffect, useState } from 'react';
import './App.css'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'
import { AllTimes } from './types';
import { Progress } from 'antd';

function App() {

  const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };

  const [alltimes, setAllTimes] = useState<AllTimes>({
    training: 0,
    rest: 0
  });

  const [cycle, setCycle] = useState(0)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsActive(true)
  }

  function handleTimeChange(time: Date, type: keyof AllTimes) {
    setAllTimes({
      ...alltimes,
      [type]: time.$s
    });
  }

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    const initialTime = alltimes


    if (isActive) {
      interval = setInterval(() => {
        setAllTimes((prevAllTimes) => {
          if (prevAllTimes.training > 0 && prevAllTimes.rest !== 0) {
            console.log(prevAllTimes.training, 'step 1');
            return {
              ...prevAllTimes,
              training: prevAllTimes.training - 1,
            };
          } else if (prevAllTimes.training === 0 && prevAllTimes.rest > 0) {
            console.log(prevAllTimes.rest, 'step 2');
            return {
              ...prevAllTimes,
              rest: prevAllTimes.rest - 1,
            };
          } else if (prevAllTimes.rest === 0 && prevAllTimes.training === 0) {
            if (cycle > 0) {
              setCycle((prev) => prev - 1);
              console.log(cycle, 'step 3');
              return {
                training: initialTime.training,
                rest: initialTime.rest,
              };
            } else {
              setIsActive(false);
              console.log(cycle, 'step 4');
              return initialTime;
            }
          }
          return prevAllTimes;
        });

      }, 1000);
    }


    return () => clearInterval(interval);
  }, [isActive, cycle]);



  return (
    <>
      <NavBar />
      <Form func={handleTimeChange} setCycle={setCycle} handleSubmit={handleSubmit} />
      <Progress format={(percent) => percent + 's'} type="circle" percent={alltimes.training}
        status="active" strokeColor={conicColors} />
    </>
  )
}

export default App
