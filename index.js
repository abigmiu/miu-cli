#!/usr/bin/env node
const fs = require('fs')

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

program.parse(process.argv);
