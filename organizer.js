const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/* 
 * 
 * @param list Array of objects,each object having the following fields:
 * - SourceFile: The full path to the image file.
 * - DateTimeOriginal: The original datetime on which the image or video was captured, formatted as yyyy-MM
 * This list can be obtained by running the command `exiftool -d "%Y-%m" -json -SourceFile -DateTimeOriginal [Path to folder containing images to organize e.g. "/Users/me/Pictures/**"]`
 * 
 * @param saveDirectory the directory where the images will be saved.
 */
function organizePhotos(list, saveDirectory){
  list.forEach(image => {

    const imageOriginalFileName = path.basename(image.SourceFile);
    const imageNewSavePath = path.join(
      saveDirectory, 
      image.DateTimeOriginal? image.DateTimeOriginal : "To organize", 
      imageOriginalFileName
    );
    const imageNewParentDir = path.dirname(imageNewSavePath);
    if (!fs.existsSync(imageNewParentDir)) {
      fs.mkdirSync(imageNewParentDir);
    }
    fs.renameSync(image.SourceFile, imageNewSavePath);
  });
}

function listImages(dir){
  // https://exiftool.org/
  let output = execSync('exiftool -d "%Y-%m" -json -SourceFile -DateTimeOriginal **', {cwd: dir});
  return JSON.parse(output.toString());
}
