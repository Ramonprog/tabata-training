import { TimePicker, Button, Input } from 'antd';
import styles from './styles.module.css'

interface IFormProps {
    func: (time: number, data: string) => void;
    setCycle: (cycle: number) => void;
    handleSubmit: () => void;
}

const Form = ({ func, setCycle, handleSubmit }: IFormProps) => {


    return (
        <>
            <form className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="training">Tempo de HIIT</label>
                    <TimePicker className={styles.input} placeholder='Tempo HITT' format="ss" name='training' onChange={(time) => func(time, 'training')} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="rest">Descanso</label>
                    <TimePicker format="ss" className={styles.input} placeholder='Tempo de descanso' name='rest' onChange={(time) => func(time, 'rest')} />
                </div>
                <div className={styles.field}>
                    <label htmlFor="cycle">Ciclos</label>
                    <Input required type='number' className={styles.input} placeholder='Quantidade de rodadas' name='cycle' min={0} onChange={(e) => setCycle(e.target.value)} />
                </div>

                <Button onClick={handleSubmit} className={`button ${styles.button}`}>Iniciar Treinamento</Button>
            </form>
        </>
    )
}

export default Form