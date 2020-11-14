const fs = require('fs').promises;
const path = require('path');
const FileType = require('file-type');
const { nanoid } = require('nanoid');

const knownFileTypes = ['mp4', 'mkv', 'avi'];

async function walk(dir) {
  let files = await fs.readdir(dir);
  files = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) return walk(filePath);
      else if (stats.isFile()) return filePath;
    })
  );

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

async function processFile(file) {
  // console.log(`Processing ${file}`);
  const fileType = await FileType.fromFile(file);

  if (!fileType || !knownFileTypes.includes(fileType.ext)) {
    return null;
  }

  const movie = {
    id: nanoid(),
  };

  const chunk = file.split('/');

  movie.language = chunk[5];
  movie.title = chunk[chunk.length - 2];

  const titleChunk = movie.title
    .trim()
    .replace('(', '$')
    .replace(')', '$')
    .split('$');

  movie.year = titleChunk[titleChunk.length - 2];

  return movie;
}

async function prepareJSON(files) {
  const promises = files.map((file) => processFile(file));

  const results = await Promise.all(promises);

  return results.filter((e) => e);
}

(async () => {
  try {
    const folderPath = process.argv[4] || '/media/ashwin/Data/Movies';
    const files = await walk(folderPath);
    const array = await prepareJSON(files);

    const db = {
      movies: array,
    };

    await fs.writeFile('db.json', JSON.stringify(db));
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();
