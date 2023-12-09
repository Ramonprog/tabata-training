import { TimePicker, InputNumber, Button } from 'antd';
import { useEffect, useState } from 'react';
import styles from './styles.module.css'

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
        <>
            <form className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="training">Tempo de HIIT</label>
                    <TimePicker className={styles.input} placeholder='Tempo HITT' format="ss" name='training' onChange={(time) => handleTimeChange(time, 'training')} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="rest">Descanso</label>
                    <TimePicker format="ss" className={styles.input} placeholder='Tempo de descanso' name='rest' onChange={(time) => handleTimeChange(time, 'rest')} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="cycle">Ciclos</label>
                    <InputNumber className={styles.input} type='number' placeholder='Quantidade de rodadas' name='cycle' min={0} onChange={(e) => setCycle(e.target.value)} />
                </div>

                <Button className={`button ${styles.button}`}>Iniciar Treinamento</Button>
            </form>
        </>
    )
}

export default Form