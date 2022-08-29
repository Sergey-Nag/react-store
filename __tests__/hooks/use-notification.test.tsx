import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { ReactElement } from "react";
import { NotificationsWrapper } from "../../src/components/notifications-wrapper/notifications-wrapper";
import { NOTIFICATION_LIFETIME } from "../../src/constants/notification-lifetime";
import { NotificationStyle } from "../../src/enums/notification-style";
import { NotificationsProvider, useNotification } from "../../src/hooks/use-notification";

const renderWithNotificationsProvider = (children: ReactElement) => 
  render(
    <NotificationsProvider>
      <NotificationsWrapper></NotificationsWrapper>
      {children}
    </NotificationsProvider>
  )

const Notifier = ({ notification }: {notification: JSX.Element}) => {
  const {notify} = useNotification();

  return <button onClick={() => notify(notification, NotificationStyle.default)}>Notify {notification}</button>
}

describe('Notification provider and hook', () => {
  it('Should show notification', async () => {
    renderWithNotificationsProvider(
      <Notifier notification={<>Test</>} />
    );

    fireEvent.click(screen.getByText('Notify Test'));

    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('Should stack notifications', async () => {
    renderWithNotificationsProvider(
      <Notifier notification={<>Test</>} />
    );

    fireEvent.click(screen.getByText('Notify Test'));
    fireEvent.click(screen.getByText('Notify Test'));
    fireEvent.click(screen.getByText('Notify Test'));

    await waitFor(() => {
      expect(screen.getAllByText('Test')).toHaveLength(3);
    });
  });

  it(`Should remove notification one by one`, () => {
    renderWithNotificationsProvider( 
      <>
        <Notifier notification={<>Test</>} />
        <Notifier notification={<>Test 2</>} />
      </>
    );

    fireEvent.click(screen.getByText('Notify Test'));
    expect(screen.getByText('Test')).toBeInTheDocument();

    setTimeout(() => {
      fireEvent.click(screen.getByText('Notify Test 2'));
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    }, NOTIFICATION_LIFETIME / 2);
    
    setTimeout(() => {
      expect(screen.queryByText('Test')).not.toBeInTheDocument();
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    }, NOTIFICATION_LIFETIME);
    
    setTimeout(() => {
      expect(screen.queryByText('Test 2')).not.toBeInTheDocument();
    }, NOTIFICATION_LIFETIME * 2);
  });
});