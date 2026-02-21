// const autojsUtils = require('./modules/autojs-utils');


function test() {
    const greetingPrefix = 'Hello';
    /* e.g. "Hello, AutoJs6 6.4.1" */
    toastLog(`${greetingPrefix}, ${context.getString(R.strings.app_name)} ${app.autojs.versionName}`);
}

// autojsUtils.test();

test();