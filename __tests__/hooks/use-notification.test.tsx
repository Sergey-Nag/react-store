import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { ReactElement } from "react";
import { NOTIFICATION_LIFETIME } from "../../src/constants/notification-lifetime";
import { NOTIFICATION_WRAPPER_ID } from "../../src/constants/notification-wrapper-id";
import { NotificationStyle } from "../../src/enums/notification-style";
import { NotificationsProvider, useNotification } from "../../src/hooks/use-notification";

const renderWithNotificationsProvider = (children: ReactElement) => 
  render(
    <NotificationsProvider>
      <div id={NOTIFICATION_WRAPPER_ID}></div>
      {children}
    </NotificationsProvider>
  )

const Notifier = ({ notification, type }: {notification: JSX.Element, type?: NotificationStyle}) => {
  const {notify} = useNotification();

  return <button onClick={() => notify(notification, type)}>Notify {notification}</button>
}

describe('Notification provider and hook', () => {
  it('Should show notification (without passing on the type prop)', async () => {
    renderWithNotificationsProvider(
      <Notifier notification={<>Test</>} />
    );

    fireEvent.click(screen.getByText('Notify Test'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('Should stack notifications (with the error type prop )', async () => {
    renderWithNotificationsProvider(
      <Notifier notification={<>Test</>} type={NotificationStyle.error} />
    );

    fireEvent.click(screen.getByText('Notify Test'));
    fireEvent.click(screen.getByText('Notify Test'));
    fireEvent.click(screen.getByText('Notify Test'));

    await waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(3);
    });
  });

  it('Should remove notification after notification\'s lifetime expires (with the info type prop)', async () => {
    renderWithNotificationsProvider(
      <Notifier notification={<>Test</>} type={NotificationStyle.info} />
    );

    fireEvent.click(screen.getByText('Notify Test'));
    expect(screen.getByRole('alert')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    }, { timeout: NOTIFICATION_LIFETIME});
  });
});