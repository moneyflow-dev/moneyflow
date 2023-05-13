import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { DateTime } from "luxon";

import { createBackup } from "./backup";

export const exportBackup = async () => {
  const backup = await createBackup();

  const timestamp = DateTime.now().toMillis();
  const filename = `moneyflow-backup-${timestamp}.json`;
  const data = JSON.stringify(backup);
  const writeResult = await Filesystem.writeFile({
    path: filename,
    directory: Directory.Cache,
    data,
    encoding: Encoding.UTF8,
  });
  try {
    await Share.share({
      files: [writeResult.uri],
    });
  } catch (err) {
    console.log("Share canceled");
  }
  await Filesystem.deleteFile({
    path: filename,
    directory: Directory.Cache,
  });
};
