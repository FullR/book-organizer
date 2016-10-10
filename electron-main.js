const electron = require("electron");
const {app, Menu, BrowserWindow, crashReporter} = electron;
const width = 1024;
const height = 768;

app.on("window-all-closed", () => app.quit());

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: "",
    minWidth: width,
    minHeight: height,
    center: true
  });
  app.setAppUserModelId("com.criticalthinking.app-id");
  mainWindow.loadURL(`file://${__dirname}/www/index.html`);
});
