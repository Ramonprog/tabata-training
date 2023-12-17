import { useEffect, useState } from 'react';
import './App.css'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'
import { AllTimes } from './types';
import { Progress } from 'antd';
import _ from 'lodash';

function App() {

  const conicColors = { '0%': '#87d068', '50%': '#ffe58f', '100%': '#ffccc7' };

  const [alltimes, setAllTimes] = useState<AllTimes>({
    training: 0,
    rest: 0
  });
  const [initialTime, setInitialTime] = useState<AllTimes>({
    training: 0,
    rest: 0
  })

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
    setInitialTime({
      ...alltimes,
      [type]: time.$s
    });
  }

  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState((alltimes.training / initialTime.training) * 100)


  useEffect(() => {
    let interval;

    const updateProgress = () => {

      const porcentagem = (alltimes.training / initialTime.training) * 100;
      setProgress(porcentagem);

    };

    if (isActive) {
      interval = setInterval(() => {
        setAllTimes((prevAllTimes) => {
          if (prevAllTimes.training > 0 && prevAllTimes.rest !== 0) {
            return {
              ...prevAllTimes,
              training: prevAllTimes.training - 1,
            };
          } else if (prevAllTimes.training === 0 && prevAllTimes.rest > 0) {
            return {
              ...prevAllTimes,
              rest: prevAllTimes.rest - 1,
            };
          } else if (prevAllTimes.rest === 0 && prevAllTimes.training === 0) {
            if (cycle > 0) {
              setCycle((prev) => prev - 1);
              return {
                training: initialTime.training,
                rest: initialTime.rest,
              };
            } else {
              setIsActive(false);
              return initialTime;
            }
          }
        });
        updateProgress();
      }, 1000);
    }

    return () => clearInterval(interval);

  }, [isActive, cycle, alltimes.training]);


  return (
    <>
      <NavBar />
      <Form func={handleTimeChange} setCycle={setCycle} handleSubmit={handleSubmit} />
      <Progress format={() => alltimes.training + "s"} type="circle" percent={progress + 1}
        status="active" strokeColor={conicColors} />
    </>
  )
}

export default App
