# gep create
生成editorConfig和prettier配置文件

# gep copy-i18n [languages...]

生成对应的翻译json文件, 不会清空需要翻译的文件已经存在的值

```shell
# cd 到你的，确保里面一定有 zh.json 文件
cd /languages
gep copy-i18n en th # 表示生成和zh.json 里面一样的键的 en.json, th.json 文件
# 可以看当前仓库的example/languages 文件
```

# gep e2j fileName sheetName [languages...]
读取excel 转成多语言json文件

# gep j2e fileName sheetName
读取当前文件夹下的json文件转成excel

这两个命令详情其实就是这个仓库的内容 [https://github.com/abigmiu/json-excel](https://github.com/abigmiu/json-excel)
