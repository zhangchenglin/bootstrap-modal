const root = './' // 路径没有问题，当前是为符合nodejs的环境，而不是为了符合gulp的环境。
const node_modules = root + 'node_modules/'
const gulpfile = root + 'gulpfile.js/'
const src = root + 'src/'
const dist = root + 'dist/'

module.exports = {
  root: root,
  node_modules: node_modules,
  gulpfile: gulpfile,
  src: src,
  dist: dist,
}