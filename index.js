#!/usr/bin/env node
const fs = require('fs')

const { generateI18nJson } = require('./modules/copy-i18n/index')
const { excelToJson } = require('./modules/jsonToExcel/excelToJson')
const { jsonToExcel } = require('./modules/jsonToExcel/index')

//获得命令运行时的路径
const getCwd = () => process.cwd();

const { program } = require('commander');
const handleCreate = () => {
  fs.writeFileSync(`${getCwd()}/.editorConfig`, fs.readFileSync(`${__dirname}/template/.editorConfig`))
  fs.writeFileSync(`${getCwd()}/.prettierrc`, fs.readFileSync(`${__dirname}/template/.prettierrc`))
  console.log('🎉 生成成功')
}

program
  .command('create')
  .description('生成editorConfig和prettier配置文件')
  .action(() => {
    handleCreate()
  })

program
  .command('copy-i18n [languages...]')
  .description('读取zh.json 并生成输入语言的json文件')
  .action((languages) => {
    generateI18nJson(languages)
  })

program
  .command('e2j fileName sheetName [languages...]')
  .description('读取excel 转成多语言json文件')
  .action((filename, sheetName, languages) => {
    excelToJson(filename, sheetName, languages)
  })

program
  .command('j2e fileName sheetName')
  .description('读取当前文件夹下的json文件转成excel')
  .action((filename, sheetName) => {
    jsonToExcel(filename, sheetName)
  })
program.parse(process.argv);
