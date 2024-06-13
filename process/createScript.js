/*eslint-disable global-require */
/*eslint-disable no-console */
/*eslint-disable object-curly-newline */
/*eslint-disable no-shadow */
/*eslint-disable consistent-return */
/*eslint-disable no-use-before-define */
/*eslint-disable no-undef */

const fse = require('fs-extra');
const prompt = require('prompt');
const path = require('path');

const expConfigPathe = path.resolve(__dirname, '../process/experimentConfig.js');

fse.ensureFile(expConfigPathe).then(() => {
  const { sharedJsContent, createFile, createExpSchema } = require('./cliUtils');

  prompt.start();

  prompt.get(createExpSchema, (err, result) => {
    if (err) {
      return onErr(err);
    }

    const { clientName, siteName, experimentId, setVarFlag } = result;

    const dir = path.resolve(__dirname, `../clients/${clientName}/${siteName}/${experimentId}/`);

    const content = sharedJsContent(experimentId, setVarFlag, clientName, siteName);

    fse
      .ensureDir(dir)
      .then(
        () => fse.pathExists(`${dir}/src`) //=> false
      )
      .then((exists) => {
        if (exists) return;
        return fse.copy('./template/', dir);
        //console.log("Build success! -- now 'npm start' to start development");
      })
      .then(() => {
        createFile(`${dir}/src/lib/shared/shared.js`, content);
        createFile(expConfigPathe, content);
      })
      .then(() => createFile(`${dir}/src/lib/shared/shared.scss`, `$id: '${experimentId}';`))
      .catch((err) => console.error(err));
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}
