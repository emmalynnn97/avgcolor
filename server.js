import { getAverageColor } from 'fast-average-color-node';
import colorSort from 'color-sorter'
import fs from 'fs'
const list=[]
const colors=[]
  
const testFolder = './public/images/';

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        getAverageColor(`./public/images/${file}`).then(color => {
            colors.push(color.rgb)
            list.push({file:file,color:color.rgb})
            var sorted = colors.sort(colorSort.sortFn)
          })
    });
  });
  



