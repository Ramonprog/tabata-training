import { TimePicker, InputNumber, Input } from 'antd';
import { useEffect, useState } from 'react';

interface AllTimes {
    training: string;
    rest: string;
}


const Form = () => {
    const [alltimes, setAllTimes] = useState<AllTimes>({
        training: '',
        rest: ''
    });

    const [cycle, setCycle] = useState(0)

    function handleTimeChange(time: Date, type: keyof AllTimes) {
        setAllTimes({
            ...alltimes,
            [type]: time.$s
        });
    }

    useEffect(() => {
        console.log(alltimes)
    }, [alltimes])

    return (
        <form>
            <div>
                <label htmlFor="training">Tempo de HIIT</label>
                <TimePicker format="ss" name='training' onChange={(time) => handleTimeChange(time, 'training')} />
            </div>
            <div>
                <label htmlFor="rest">Descanso</label>
                <TimePicker format="ss" name='rest' onChange={(time) => handleTimeChange(time, 'rest')} />
            </div>
            <div>
                <label htmlFor="cycle">Ciclos</label>
                <InputNumber type='number' name='cycle' min={0} onChange={(e) => setCycle(e.target.value)} />
            </div>
        </form>
    )
}

export default Form