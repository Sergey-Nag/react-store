import { ReactElement, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { NOTIFICATION_WRAPPER_CLASSNAME } from "../../constants/notification-wrapper-classname";
import { createNotificationWrapper } from "../../utils/createNotificationWrapper";
import { ExclamationCircle, CheckCircle, InfoCircle } from 'react-bootstrap-icons';
import './notification.scss';
import cn from "classnames";

export interface NotificationProps {
  alertStyle?: 'primary' | 'secondary' | 'info' | 'danger';
  children?: string | ReactElement| null;
}

export function Notification({ alertStyle = 'primary', children  }: NotificationProps) {
  const wrapperElement = useMemo(() => 
      document.querySelector(`.${NOTIFICATION_WRAPPER_CLASSNAME}`) ?? createNotificationWrapper(),
      []
    );

  const Icon = useMemo(() => {
    switch(alertStyle) {
      case 'danger': return ExclamationCircle;
      case 'primary': return CheckCircle
      case 'info':
      case 'secondary': return InfoCircle;
    }
  }, [alertStyle]);

  const alertClassName = cn('alert d-flex align-items-center', `alert-${alertStyle}`);
  const [isHidden, setIsHidden] = useState(false);
  const hideAlert = () => setIsHidden(true);

  return isHidden ? null : createPortal(
    <div className={alertClassName} role="alert">
      <Icon className="me-2" size="1.2rem" />
      <div className="text">
        {children}
      </div>
      <button
        type="button" 
        className="btn-close ms-auto" 
        aria-label="Close"
        onClick={hideAlert}
      ></button>
    </div>,
    wrapperElement
  );
}
