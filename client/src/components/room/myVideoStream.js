const streams = {};

export const cameraSelections = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "videoinput");
};
export const audioSelections = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === "audioinput");
};

// Start stream
export const startStream = async (constraints, userId) => {
  console.log("🚀 ~startStream ~ userId", userId);
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  streams[userId] = stream;
  //   if (!streams[userId]){
  //   } else {
  //     streams[userId] = stream;
  //   }
  console.log({ allStreams: streams });
  return stream;
};

export const stopStream = async (deviceId) => {
  if (streams[deviceId] != null) {
    streams[deviceId].getTracks().forEach(function (track) {
      track.stop();
    });
    delete streams[deviceId];
  }
};
