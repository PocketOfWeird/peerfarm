const { spawn } = require('child_process');

const settings = (startF, endF, proj, outDir, format, cam, step=1, pad=000, resX=1920, resY=1080) => ({
  startF,
  endF,
  proj,
  outDir,
  format,
  cam,
  step,
  pad,
  resX,
  resY
});

const splitIntoChunks = (settings, chunkSize) {
  let chunks = [];
  for (let frame = settings.startF; frame <= settings.endF; frame+=chunkSize) {
    let chunk = {
      ...settings,
      startF: frame,
      endF: Math.min(frame + chunkSize - 1, settings.endF)
    }
    chunks.push(chunk);
  }
  return chunks;
}

const startRender = (chunk, cb) => {
    const command = chunk => `${process.env.MAYA_BIN_DIR}\\Render.exe -r file -s ${chunk.startF} -e ${chunk.endF} -b ${chunk.step} -proj ${chunk.proj} -rd ${chunk.outDir} -fnc name.ext -pad ${chunk.pad} -of ${chunk.format} -cam ${chunk.cam} -x ${chunk.resX} -y ${chunk.resY}`;
    const child = spawn(command(chunk));
    child.stdout.on('data', info => {
      cb(null, null, info);
    });
    child.stderr.on('data', errorInfo => {
      cb(null, errorInfo, null);
    });
    child.on('error', error => {
      cb.(error, null, null);
    });
    child.on('exit', (code, signal) => {
      cb.(null, signal, code, true);
    });
}

module.exports = {
  settings,
  splitIntoChunks,
  startRender
};
