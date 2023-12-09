import { render, screen } from "@testing-library/react"
import Form from "./Form"

describe('FormComponent', () => {
    test('should render', async () => {
        render(<Form />)

        const trainingInput = await screen.findByText('Tempo de HIIT');
        const restInput = await screen.findByText('Descanso');
        const cycleInput = await screen.findByText('Ciclos');

        expect(trainingInput).toBeInTheDocument();
        expect(restInput).toBeInTheDocument();
        expect(cycleInput).toBeInTheDocument();
    })
})