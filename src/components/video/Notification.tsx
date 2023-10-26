import React, { useEffect, useState } from 'react';

type NotificationProps = {
  notification: any;
  onRemove: (time: number) => void;
};

const Notification: React.FC<NotificationProps> = ({
  notification,
  onRemove,
}) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsHiding(true);
      // Remove the notification after the animation is done
      setTimeout(() => onRemove(notification.time), 500);
    }, 5000);
  }, [onRemove, notification.time]);

  return (
    <div className={`notification ${isHiding ? 'hiding' : ''}`}>
      {notification.type === 'goal' ? (
        <span>
          {notification.type} - {notification.player} -{' '}
          {notification.distanceOfShot} Meters
        </span>
      ) : notification.type === 'card' ? (
        <span>
          {notification.cardType} {notification.type} - {notification.player}
        </span>
      ) : notification.type === 'endHalf' ? (
        <span>Halftime</span>
      ) : notification.type === 'endGame' ? (
        <span>Game Over</span>
      ) : (
        <span>{notification.type}</span>
      )}
    </div>
  );
};

export default Notification;
