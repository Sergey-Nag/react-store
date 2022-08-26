import { fireEvent, render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import { Notification, NotificationProps } from '../../../src/components/notification/notification';

const MockComponent = ({ children }: { children: ReactElement }) => 
  <div className='some-element'>{children}</div>;

describe('Notification', () => {
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
  });

  // it('Should render component as a direct child of the root component whatever the location of the component', () => {
  //   const { baseElement } = render(
  //     <MockComponent>
  //       <Notification>test</Notification>
  //     </MockComponent>
  //   );
    
  //   expect(baseElement).toMatchSnapshot();
  // });

  // describe('Should render different styles of notification depends on the alertStyle prop:', () => {
  //   it.each(['primary', 'secondary', 'info', 'danger'] as NotificationProps['alertStyle'][])('%s', (style) => {
  //     render(<Notification alertStyle={style}>test</Notification>);
      
  //     expect(screen.getByRole('alert')).toBeInTheDocument();
  //     expect(screen.getByRole('alert')).toHaveClass(`alert-${style}`);
  //   });
  // });

  // it('Should remove a specific alert component by clicking the close button', () => {
  //   render(<Notification>test</Notification>);

  //   expect(screen.getByRole('alert')).toBeInTheDocument();

  //   fireEvent.click(screen.getByLabelText('Close'));

  //   expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  // }); 
});