
const defaultOptions = {
   "preferFrontCamera" : false,
   "showFlipCameraButton" : false,
   "prompt": "Place a barcode inside the scan area", // android only
   "orientation" : "landscape" // android only
};

export default function scanBarcode() {
  return new Promise((resolve, reject) => {
    cordova.plugins.barcodeScanner.scan(resolve, reject)
  });
}
