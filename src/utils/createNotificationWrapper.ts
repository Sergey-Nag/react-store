import { NOTIFICATION_WRAPPER_CLASSNAME } from "../constants/notification-wrapper-classname";

export const createNotificationWrapper = () => {
  const wrapper = document.createElement('div');
  wrapper.className = NOTIFICATION_WRAPPER_CLASSNAME;
  document.getElementById('root')?.prepend(wrapper);

  return wrapper;
}