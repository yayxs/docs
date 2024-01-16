import { fs } from 'memfs' // 内存中模拟文件系统
import git from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import libs from 'data/libraries'
import type { Doc, DocToC } from 'hooks/useDocs'

/**
 * 是否是md mdx 文件
 */

export const MARKDOWN_REGEX = /\.mdx?/

/**
 * 删除md 中的注释
 */
export const FRONTMATTER_REGEX = /^<!--[\s\n]*?(?=---)|(?!---)[\s\n]*?-->/g

/**
 * 删除md 中单行和多行的注释
 */
const COMMENT_REGEX = /<!--(.|\n)*?-->|<!--[^\n]*?\n/g

/**
 * 删除这种格式
 */
const INLINE_LINK_REGEX = /<(http[^>]+)>/g

/**
 * 递归抓取目录
 */
async function crawl(dir: string, filter: RegExp, files: string[] = []) {
  if (fs.lstatSync(dir).isDirectory()) {
    // 传入的是一个目录
    const filenames = fs.readdirSync(dir) as string[] // 读取目录中的文件列表
    await Promise.all(filenames.map(async (filename) => crawl(`${dir}/${filename}`, filter, files))) // 并发处理目录下文件
  } else if (!filter || filter.test(dir)) {
    files.push(dir) // 如果是文件就放入数组
  }

  return files
}

/**
 * 获取到所有的文档
 */
export async function getDocs(lib: keyof typeof libs): Promise<Doc[]> {
  // 没有指定库，获取所有的文档
  if (!lib) {
    const docs = await Promise.all(
      Object.keys(libs)
        .filter((lib) => libs[lib].docs)
        .map(getDocs),
    )
    return docs.filter(Boolean).flat()
  }

  // 获取单个库的配置
  const config = libs[lib]
  // yayxs/mdn-web-docs/main/docs
  const [user, repo, branch, ...rest] = config.docs!.split('/')
  const dir = `/${user}-${repo}-${branch}`
  const root = `${dir}/${rest.join('/')}`
  // 克隆远程的仓库
  await git.clone({
    fs,
    http,
    dir,
    url: `https://github.com/${user}/${repo}`,
    ref: branch,
    singleBranch: true,
    depth: 1,
  })

  // 抓取解析文档
  const files = await crawl(root, MARKDOWN_REGEX)
}
