import depcheck from 'depcheck';

export default (options = {}) => ({
  name: 'rollup-plugin-depcheck',
  buildStart: () => {
    console.log('Depchecking...');
    return depcheck(__dirname, options, unused => {
      [
        ['Unused dependencies:', unused.dependencies],
        ['Unused devDependencies:', unused.devDependencies],
        ['Missing dependencies:', Object.keys(unused.missing)]
      ]
        .map(([text, deps]) => [text, deps.map(dep => `* ${dep}`).join('\n')])
        .filter(([, deps]) => deps.length > 0)
        .forEach(([text, deps]) => {
          console.log(text);
          console.log(deps);
        });
    });
  }
});
