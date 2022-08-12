/** 调整打包输出文件的plugin.json */
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, '../dist/plugin.json')
const json = fs.readFileSync(filePath, 'utf8')
const data = JSON.parse(json)
// data.preload = './preload/dist/index.js'
delete data.development

fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
