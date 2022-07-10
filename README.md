# gep copy-i18n [languages...]

生成对应的翻译json文件, 不会清空需要翻译的文件已经存在的值

```shell
# cd 到你的，确保里面一定有 zh.json 文件
cd /languages
gep copy-i18n en th # 表示生成和zh.json 里面一样的键的 en.json, th.json 文件
# 可以看当前仓库的example/languages 文件
```

