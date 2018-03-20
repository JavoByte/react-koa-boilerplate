import rimraf from 'rimraf';

const clean = () => new Promise((resolve, reject) => {
  rimraf(
    'build/*',
    {
      glob: {
        dot: true,
        ignore: ['build/.git'],
      },
    },
    (err, res) => (err ? reject(err) : resolve(res)),
  );
});

export default clean;
