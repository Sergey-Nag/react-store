import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Notification } from "../components/notification/notification";
import { NOTIFICATION_LIFETIME } from "../constants/notification-lifetime";
import { NOTIFICATION_WRAPPER_ID } from "../constants/notification-wrapper-id";
import { NotificationStyle } from "../enums/notification-style";
import uid from 'uniqid';

type NotificationContextType = {
  notify: (content: JSX.Element, type?: NotificationStyle) => void,
}

const initialState: NotificationContextType = {
  notify() {}
};

interface NotificationItem {
  content: JSX.Element,
  type: NotificationStyle,
  id: string,
}

const NotificationContext = createContext(initialState);

export function NotificationsProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notify = (content: JSX.Element, type: NotificationStyle = NotificationStyle.default) => {
    setNotifications([...notifications, {content, type, id: uid()}]);
  }

  const renderNotifications = () => {
    const notificationElements = 
      notifications.map(({content, type, id}) => 
        <Notification type={type} key={id}>{content}</Notification>
      );

    return !!notifications.length && createPortal(
        notificationElements,
        document.getElementById(NOTIFICATION_WRAPPER_ID) as HTMLElement
      );
  }

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (notifications.length) {
      timerId = setTimeout(() => {
        setNotifications(([, ...restNotifications]) => [...restNotifications]);
      }, NOTIFICATION_LIFETIME);
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      { children }
      { renderNotifications() }
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
