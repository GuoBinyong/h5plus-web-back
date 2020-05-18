import "es-expand"
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';


/**
 * Remove the scope prefix for the package name
 * 去除包名的 scope 前缀
 *
 * @param  pkgName : string    name of the package 包的名字
 * @returns string  Return the name after removing the scope prefix  返回去除 scope 前缀后的名字
 */
function removeScope(pkgName) {return pkgName.replace(/@[^/]+\//,"")}


/**
 * convert the name of the package from a divider format to a hump format, and the scope prefix is automatically removed
 * 把包的名字从分隔线格式转换成驼峰格式，并且会自动去除 scope 前缀
 *
 * @param  pkgName : string    name of the package 包的名字
 * @param separators ?: string | Array<string>   optional; default: ["-","_"] ; separator or separator good array ["-","_"]； 可选；默认值：["-","_"] ；分隔符，或 包含多个分隔符的数组
 * @returns string  return hump format string  返回驼峰格式的字符串
 */
function toHumpFormat(pkgName, separators) {return removeScope(pkgName).toHumpFormat(separators)}

/**
 * 获取 package.json 中配置的 description、optionalDependencies、peerDependencies 中的所有依赖的名字列表
 * Get an array of dependent names in the configuration of description, optional Dependencies, peer Dependencies configured in package.json
 * @param {*} package  package.json 中的配置对象； Configuration objects in package.json
 * @returns Array<string>  返回包含 description、optionalDependencies、peerDependencies 中所有依赖名字的数组； Returns an array of all name-dependent names in the description, option, peer Dependencies
 */
function getDependencieNames(packageConf) {
	return Object.keys(Object.assign({}, packageConf.dependencies, packageConf.optionalDependencies, packageConf.peerDependencies))
}


/*
注意：
- rollup 默认翻用的不是 node 的模块解析算法，所以，rollup 找不到由 npm 安装的依赖（模块），所以 由 npm 安装的依赖也不被被要想构建进最终的输出包中；这样也起到了排除 node_modules 中模块的效果；排除模块的功能 由 external 选项指定
- @rollup/plugin-node-resolve 插件可让 rollup 用 node 的模块解析算法来查找模块；
*/

export default [
	/*
	浏览器友好的 UMD 构建
	特点：
	   - 将所有依赖都构建在了一起
	   - 可在不支持 js模块方案 的环境下运行，也可以作为 js模块 被导入
	*/
	{
		input: 'src/index',
		external: getDependencieNames(pkg),  //移除 package.json 中所有的依赖包
		output: {
			name: toHumpFormat(pkg.name),  //驼峰格式的 pkg.name
			// 如果 pkg.browser 是字符串类型，则 file 为 pkg.browser，否则为 `<包名>.umd.js`
            file: typeof pkg.browser === "string" ? pkg.browser : `dist/${removeScope(pkg.name)}.umd.js`,
			format: 'umd'
		},
		plugins: [
			// 使用node解析算法查找模块
            resolve({
                /*
                browser   类型: Boolean   默认值: false
                是否优先使用 `package.json` 中的 browser 字段来解析依赖包的入口文件；
                - 构建专门用于浏览器环境的包时，建义设置为 `browser:true`；
                - 构建专门用于node环境的包时，建义设置为 `browser:false` 或者 删除此选项；
                */
                browser:true,
                /*
                extensions   类型: Array[...String]    默认值: ['.mjs', '.js', '.json', '.node']
                扩展文件名
                */
                // extensions:['.mjs', '.js', '.json', '.node']
            }),
			commonjs(), // 将依赖的模块从 CommonJS 模块规范转换成 ES2015 模块规范
			babel({
				exclude: ['node_modules/**']
			})
		]
	},

	/*
	模块友好的构建
	特点：
	   - 移除了 node_modules 中的所有依赖
	   - 仅支持以 js模块 的方式被导入
	*/
	{
		input: 'src/index',
		external: getDependencieNames(pkg),  //移除 package.json 中所有的依赖包
		output: [
			{ file: pkg.main, format: 'cjs' }, // CommonJS (用于 Node)
			{ file: pkg.module, format: 'es' }  // ES module （用于打包工具（如：webpack等）
		],
		plugins: [
			babel({
				exclude: ['node_modules/**']
			})
		]
	}
];
