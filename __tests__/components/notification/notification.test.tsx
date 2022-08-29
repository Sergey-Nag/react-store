import { render } from '@testing-library/react';
import { Notification } from '../../../src/components/notification/notification';
import { NotificationStyle } from '../../../src/enums/notification-style';

describe('Notification', () => {
  describe('Should render the component with different types', () => {
    it.each([
      NotificationStyle.default,
      NotificationStyle.error,
      NotificationStyle.info
    ])('%s', (type) => {
      const { asFragment } = render(
        <Notification type={type}>Test notifications</Notification>
      );
      
      expect(asFragment()).toMatchSnapshot();
    });
  });
});