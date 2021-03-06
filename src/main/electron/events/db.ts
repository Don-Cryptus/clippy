import { ipcMain, webContents } from 'electron';
import fs from 'fs';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  DATABASE_URL,
  DEFAULT_DB_CONFIG_PATH,
  prismaClientConfig,
} from '../../utils/constants';
import { dbBackupTask } from '../../utils/scheduler';
import { localStorageHistory, syncDbLocationDialog } from '../../utils/util';

const prisma = new PrismaClient(prismaClientConfig);

// READ DATABASE URL
ipcMain.handle(
  'getDatbasePath',
  () =>
    fs.existsSync(DEFAULT_DB_CONFIG_PATH) &&
    fs.readFileSync(DEFAULT_DB_CONFIG_PATH, 'utf-8')
);

// GET DATABASE INFO
ipcMain.handle('getDatabaseInfo', async () => localStorageHistory());

// CLEAR DATABASE
ipcMain.handle('clearDatabase', async () => {
  await prisma.clipboard.deleteMany({ where: { star: false } });

  return localStorageHistory();
});

// TOGGLE SYNC CLIPBOARD HISTORY
ipcMain.handle('toggleSyncClipboardHistory', async () => {
  const { synchronize } = (await prisma.settings.findFirst({
    where: { id: 1 },
  })) as Prisma.SettingsCreateInput;

  const updateSettings = await prisma.settings.update({
    where: { id: 1 },
    data: { synchronize: !synchronize },
  });

  if (updateSettings.synchronize && !fs.existsSync(DEFAULT_DB_CONFIG_PATH)) {
    await syncDbLocationDialog();
  }
  await dbBackupTask();

  const currentSettings = (await prisma.settings.findFirst({
    where: { id: 1 },
  })) as Prisma.SettingsCreateInput;

  webContents
    .getAllWebContents()
    .forEach((webContent) =>
      webContent.send('refreshSettings', currentSettings)
    );

  // copy last changes to sync location
  if (fs.existsSync(DEFAULT_DB_CONFIG_PATH)) {
    const syncLocation = fs.readFileSync(DEFAULT_DB_CONFIG_PATH, 'utf8');
    fs.copyFileSync(DATABASE_URL, syncLocation);
  }
});

// SAVE, LOAD OR OVERWRITE DB IN SPECIFIC PATH
ipcMain.handle('selectDatabasePath', async () => {
  const location = await syncDbLocationDialog();
  await dbBackupTask();
  return location;
});
