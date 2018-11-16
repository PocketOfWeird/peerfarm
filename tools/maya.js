const splitIntoChunks = (frameList, chunkSize) {

}

const startRender = (startF, endF, step, proj, outDir, format, pad, cam, resX, resY) => {
    `${process.env.MAYA_BIN_DIR}\\Render.exe -r file -s ${startF} -e ${endF} -b ${step} -proj ${proj} -rd ${outDir} -fnc name.ext -pad ${pad} -of ${format} -cam ${cam} -x ${resX} -y ${resY}`;
}
/**/
