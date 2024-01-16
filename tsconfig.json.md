```json
{
  "compilerOptions": {
    // 编译器的各种选项
    "target": "esnext", // 编译后为最新的版本
    "lib": ["dom", "esnext"], // 包含的库文件
    "skipLibCheck": true, // 跳过生命文件的检查
    "strict": true, // 启用所有严格类型检查选项
    "forceConsistentCasingInFileNames": true, // 强制文件名大小写一致
    "noEmit": true, // 不生成编译后的文件
    "esModuleInterop": true, // 允许使用默认导入语法
    "module": "esnext", // 生成模块的方式
    "moduleResolution": "node", // 模块解析策略
    "isolatedModules": true, // 将每个模块视为独立的模块
    "jsx": "preserve", // 保留jsx代码
    "baseUrl": "src", // 设置项目中解析非相对模块的基础路径为 "src" 目录
    "incremental": true, // 启用增量编译
    "allowJs": true, // 允许编译js文件
    "resolveJsonModule": true // 允许导入json文件
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
