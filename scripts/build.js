const fs = require('fs');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(require('child_process').exec);
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const packagePath = `${process.cwd()}/package.json`;
const pkg = require(packagePath);

const { name, dir } = path.parse(pkg.main);

const filebase = `${dir}/${name}`;

const exec = (command, extraEnv) =>
  execAsync(command, {
    env: { ...process.env, ...extraEnv },
  });

async function build(formats) {
  console.log(`Building modules...`);
  const promises = formats.map(({ format, file, description, env }) => {
    return exec(`rollup -c -f ${format} -o ${file}`, {
      BUILD_FORMAT: format,
      ...env,
    });
  });
  try {
    await Promise.all(promises);
    formats.forEach(({ file, description }, i) => {
      const minifiedFile = fs.readFileSync(file);
      const minifiedSize = prettyBytes(minifiedFile.byteLength);
      const gzippedSize = prettyBytes(gzipSize.sync(minifiedFile));
      console.log(
        `The ${description} (${file}) is ${minifiedSize}, (${gzippedSize} gzipped)`
      );
    });
  } catch (err) {
    console.error('🚨 build error!🚨');
    console.error(err.message);
    process.exit(1);
  }
}

const formats = [
  { format: 'es', file: `${filebase}.es.js`, description: 'ES module' },
  {
    format: 'umd',
    file: `${filebase}.js`,
    description: 'UMD module',
  },
  {
    format: 'umd',
    file: `${filebase}.min.js`,
    description: 'minified UMD module',
    env: {
      BUILD_ENV: 'production',
    },
  },
];

build(formats);
