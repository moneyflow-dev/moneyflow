import { LocalNotifications } from "@capacitor/local-notifications";
import { DateTime } from "luxon";

interface NotificationOptions {
  title: string;
  body: string;
  at: DateTime;
}

export const scheduleNotification = async ({
  title,
  body,
  at,
}: NotificationOptions) => {
  const { display: permissionStatus } =
    await LocalNotifications.checkPermissions();
  if (permissionStatus === "prompt") {
    await LocalNotifications.requestPermissions();
  } else if (permissionStatus === "granted") {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Math.floor(Math.random() * 100000),
          title,
          body,
          schedule: {
            at: at.toJSDate(),
          },
        },
      ],
    });
  }
};

export const cancelAllNotifications = async () => {
  const { notifications } = await LocalNotifications.getPending();
  if (notifications.length) {
    await LocalNotifications.cancel({
      notifications,
    });
  }
};
