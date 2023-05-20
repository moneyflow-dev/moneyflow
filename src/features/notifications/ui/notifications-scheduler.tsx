import { DateTime } from "luxon";
import { memo, useEffect } from "react";

import { useSettingsStore } from "@entities/settings";

import {
  cancelAllNotifications,
  scheduleNotification,
} from "@shared/lib/notifications";

export const NotificationsScheduler = memo(function NotificationsScheduler() {
  const { notifications: notificationsSettings } = useSettingsStore(
    (state) => ({ notifications: state.notifications }),
  );

  useEffect(() => {
    const scheduleNotifications = async () => {
      await cancelAllNotifications();
      const date = DateTime.now().set({
        hour: notificationsSettings.time.hour,
        minute: notificationsSettings.time.minute,
      });
      // Schedule for next 14 days
      for (let i = 0; i < 14; i++) {
        const at = date.plus({ day: i });
        await scheduleNotification({
          title: "Reminder",
          body: "Don't forget to record transactions",
          at,
        });
      }
    };

    if (notificationsSettings.enabled) {
      scheduleNotifications();
    } else {
      cancelAllNotifications();
    }
  }, [notificationsSettings]);

  return null;
});
