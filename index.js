#!/usr/bin/env node
const fs = require('fs')

const { generateI18nJson } = require('./copy-i18n/index')

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

program.parse(process.argv);
