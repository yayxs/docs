// github 上的存储仓库
export interface Library {
  title: string
  url?: string
  github: string
  description: string
  image?: string
  icon?: string
  // <user>/<repo>/<branch>/<path/to/dir>
  // https://github.com/yayxs/mdn-web-docs
  docs?: string
}

const libraries: Record<string, Library> = {
  'mdn-web-docs': {
    title: 'MDN Web Docs',
    github: 'https://github.com/yayxs/mdn-web-docs',
    description: '读MDN文档',
    docs: 'yayxs/mdn-web-docs/main/docs',
  },
}

export default libraries
