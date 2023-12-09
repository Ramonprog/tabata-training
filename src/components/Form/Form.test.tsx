import { render, screen } from "@testing-library/react"
import Form from "./Form"
import userEvent from "@testing-library/user-event"

describe('FormComponent', () => {
    test('should render', async () => {
        render(<Form />)

        const trainingInput = await screen.findByText('Tempo de HIIT');
        const restInput = await screen.findByText('Descanso');
        const cycleInput = await screen.findByText('Ciclos');

        expect(trainingInput).toBeInTheDocument();
        expect(restInput).toBeInTheDocument();
        expect(cycleInput).toBeInTheDocument();

        await userEvent.type(trainingInput, '20')
        await userEvent.type(restInput, '10')
        await userEvent.type(cycleInput, '5')

    })
})