import { render } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('muestra el mensaje y el título por defecto', () => {
    render(<ErrorMessage message="Ha ocurrido un error" />);
 
  });

  it('muestra un título personalizado', () => {
    render(<ErrorMessage title="Fallo" message="Algo salió mal" />);

  });
}); 