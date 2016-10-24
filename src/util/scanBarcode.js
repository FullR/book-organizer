
const defaultOptions = {
   "preferFrontCamera" : false,
   "showFlipCameraButton" : false,
   "prompt": "Place a barcode inside the scan area", // android only
   "orientation" : "landscape" // android only
};

export default function scanBarcode() {
  return new Promise((resolve, reject) => {
    if(!cordova) {
      reject(new Error("Barcode scanning not suppored: Cordova not defined"));
      return;
    }
    cordova.plugins.barcodeScanner.scan(resolve, reject)
  });
}
