import { DateTime } from "luxon";
import { FormEvent, useRef } from "react";

import { SettingCard, useSettingsStore } from "@entities/settings";

import { ClockIcon } from "@shared/ui/icons";

export const NotificationsTimeSettingCard = () => {
  const timeElementRef = useRef<HTMLInputElement | null>(null);
  const { notifications: notificationsSettings, setNotificationsSettings } =
    useSettingsStore((state) => ({
      notifications: state.notifications,
      setNotificationsSettings: state.setNotificationsSettings,
    }));

  const datetime = DateTime.now().set(notificationsSettings.time);
  const localeTimeString = datetime.toLocaleString({
    hour: "2-digit",
    minute: "2-digit",
  });
  const timeString = datetime.toFormat("HH:mm");

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const time = event.currentTarget.value;
    if (time) {
      const date = DateTime.fromISO(time);
      setNotificationsSettings({
        ...notificationsSettings,
        time: { hour: date.hour, minute: date.minute },
      });
    }
  };

  const onClick = () => {
    timeElementRef.current?.click();
  };

  return (
    <>
      <SettingCard
        title="Remind everyday at"
        description={localeTimeString}
        onClick={onClick}
        icon={<ClockIcon size="md" />}
      />
      <input
        className="absolute w-0 h-0"
        type="time"
        ref={timeElementRef}
        value={timeString}
        onChange={onChange}
      />
    </>
  );
};
