import { getAverageColor } from 'fast-average-color-node';
import colorSort from 'color-sorter'
import { promises as fs } from 'fs'
const list = []

const inFolder = './public/images';
const outFolder = './public/sorted'

const files = await fs.readdir(inFolder);

const colors = await Promise.all(
  files.map(async file => {
    console.log(file)
    try {
      const color = await getAverageColor(`${inFolder}/${file}`);
      return { file, color: color.rgb };
    } catch (e) {
      console.log(e)
    }

  })
);

var sorted = colors.filter(c => c != null).sort(
  ({ color: color1 }, { color: color2 }) => colorSort.sortFn(color1, color2)
);



await fs.rmdir(outFolder, { recursive: true });
await fs.mkdir(outFolder);

await Promise.all(
  sorted.map(async ({ color, file }, index) => {
    try {
      return await fs.copyFile(`${inFolder}/${file}`, `${outFolder}/${index}.png`)
    } catch (e) {
      console.log(e)
    }
  })
)


