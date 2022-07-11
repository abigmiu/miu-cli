//获得命令运行时的路径
const getCwd = () => process.cwd();
const fs = require('fs')

/**
 * 删除对象的值
 * @param {Object} obj
 */
function clearValue(obj) {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      clearValue(obj[key])
    } else {
      obj[key] = ''
    }
  })
}

/**
 * 从原对象构建一个所有值为空字符串的新对象
 * @param {} obj
 * @returns
 */
function getEmptyData(obj) {
  const newObj = JSON.parse(JSON.stringify(obj))
  clearValue(newObj)
  return newObj
}

/**
 * 合并旧对象的值到新对象
 */
function assignTwoObj(obj1, obj2) {
  Object.keys(obj1).forEach(key => {
    if (typeof obj1[key] === 'string' && typeof obj2[key] === 'string') {
      obj1[key] = obj2[key]
    } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      assignTwoObj(obj1[key], obj2[key])
    }
  })
}

/**
 *
 * @param {Array<string>} languages
 */
function generateI18nJson(languages) {
  if (!Array.isArray(languages)) {
    throw new Error('传入的参数不是Array<string> ', languages)
  }

  if (!fs.existsSync(`${getCwd()}/zh.json`)) {
    throw new Error('不存在中文json文件')
  }

  const zhFile = fs.readFileSync(`${getCwd()}/zh.json`, 'utf-8')
  const zhData = JSON.parse(zhFile)

  languages.forEach(language => {
    const newData = getEmptyData(zhData)
    if (fs.existsSync(`${getCwd()}/${language}.json`)) {
      const languageFile = fs.readFileSync(`${getCwd()}/${language}.json`, 'utf-8')
      const originLanguageData = JSON.parse(languageFile)
      assignTwoObj(newData, originLanguageData)
    }
    fs.writeFileSync(`${getCwd()}/${language}.json`, JSON.stringify(newData, null, 4))
  })
}

exports.generateI18nJson = generateI18nJson
