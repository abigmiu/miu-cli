const xlsx = require('node-xlsx').default
const fs = require('fs')

/** 读取传入的sheetName的表数据 */
function read(path, sheetName) {
  const workSheetsFromFile = xlsx.parse(path)
  for (let i = 0; i < workSheetsFromFile.length; i++) {
    if (workSheetsFromFile[i].name === sheetName) {
      return workSheetsFromFile[i].data
    }
  }
}

/**
 * 变成对象形式
 */
function spreedAry(data) {
  const newObj = {}
  for (const [key, value] of Object.entries(data)) {
    const keyItems = key.split('.')
    let temp = newObj
    for (let i = 0; i < keyItems.length - 1; i++) {
      const singleKey = keyItems[i]
      if (!temp[singleKey]) {
        temp[singleKey] = {}
      }
      temp = temp[singleKey]
    }
    const lastKey = keyItems[keyItems.length - 1]
    temp[lastKey] = value
  }
  return newObj
}

function main(params) {
  const sheetData = read(params.path, params.sheetName)
  const length = params.jsonNames.length

  const jsonAry = new Array(length).fill(null);
  jsonAry.forEach((_, index) => jsonAry[index] = {})
  for (let i = 0; i < sheetData.length; i++) {
    const key = sheetData[i][0]
    if (!key) continue
    const value = sheetData[i].slice(1)
    value.forEach((item, index) => {
      jsonAry[index][key] = item;
    })
  }

  const spreedData = jsonAry.map((item) => spreedAry(item))

  if (!fs.existsSync('excelToJsonDist')) {
    fs.mkdirSync('./excelToJsonDist')
  }

  params.jsonNames.forEach((name, index) => {
    fs.writeFileSync(`./excelToJsonDist/${name}.json`, JSON.stringify(spreedData[index], null, 4))
  })

  console.log('生成成功， 在当前文件夹的excelToJsonDist目录下')
}

/**
 *
 * @param {*} fileName
 * @param {*} pathName
 * @param {Array<string>} languages
 */
exports.excelToJson = (fileName, sheetName, languages) => {
  if (!fileName.endsWith('.xlsx')) {
    throw new Error('文件名需要以 .xlsx 结尾')
  }

  main({
    path: fileName,
    sheetName,
    jsonNames: languages,
  })
}
