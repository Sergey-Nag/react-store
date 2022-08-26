import { PropsWithChildren, useMemo } from "react";
import { ExclamationCircle, CheckCircle, InfoCircle } from 'react-bootstrap-icons';
import './notification.scss';
import cn from "classnames";
import { NotificationStyle } from "../../enums/notification-style";

export interface NotificationProps {
  type: NotificationStyle,
}

export function Notification({ type, children  }: PropsWithChildren<NotificationProps>) {
  const Icon = useMemo(() => {
    switch(type) {
      case NotificationStyle.error: return ExclamationCircle;
      case NotificationStyle.info: return InfoCircle;
      case NotificationStyle.default: return CheckCircle;
    }
  }, [type]);
  
  const alertClassName = cn('alert d-flex align-items-center', `alert-${type}`);

  return (
    <div className={alertClassName} role="alert">
      <Icon className="me-2" size="1.2rem" />
      <div className="text">
        {children}
      </div>
    </div>
  );
}
