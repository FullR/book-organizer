const electron = require("electron");
const {appName, appId} = require("./package");
const {app, Menu, BrowserWindow, crashReporter} = electron;
const width = 1024;
const height = 768;

app.on("window-all-closed", () => app.quit());

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: appName || "",
    minWidth: width,
    minHeight: height,
    center: true
  });
  app.setAppUserModelId(appId);
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
});
