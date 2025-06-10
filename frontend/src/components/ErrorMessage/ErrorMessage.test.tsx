import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('muestra el mensaje y el título por defecto', () => {
    render(<ErrorMessage message="Ha ocurrido un error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Ha ocurrido un error')).toBeInTheDocument();
  });

  it('muestra un título personalizado', () => {
    render(<ErrorMessage title="Fallo" message="Algo salió mal" />);
    expect(screen.getByText('Fallo')).toBeInTheDocument();
    expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
  });
}); 