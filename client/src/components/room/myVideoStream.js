let myStream = null;

export const cameraSelections = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "videoinput");
};

// Start stream
export const startStream = async (constraints) => {
  myStream = await navigator.mediaDevices.getUserMedia(constraints);
  return myStream;
};

export const stopStream = async () => {
  if (myStream != null) {
    myStream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
};
