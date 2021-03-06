import fs from 'fs';
import rpc from 'sync-rpc';

type GetCssOptions = {
    filepath: string;
    readFileSync?: Function;
    postcss: string | boolean | undefined;
};

export function getCss(options: GetCssOptions): string {
    const { filepath, postcss, readFileSync = fs.readFileSync } = options;
    let result: string = readFileSync(filepath, { encoding: 'utf8' });
    if (postcss) {
        const client = rpc(`${__dirname}/getcss-worker.js`, 'Get CSS Server');
        result = client({ input: result, from: filepath });
    }
    return result;
}
