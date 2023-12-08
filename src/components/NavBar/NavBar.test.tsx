import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar Component', () => {
    test('should render NavBarComponent', async () => {
        render(<NavBar />)
        expect(
            await screen.findByRole('heading', {
                level: 2,
                name: /Treinamento Tabata/
            })
        )
    })
})