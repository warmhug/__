const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), { encoding: 'utf-8' }));

const { name, version } = packageJson;

let finalVerson = version;

const branchName = execSync('git name-rev --name-only HEAD').toString() || '';

const isTestBranch = branchName.includes('test');

function checkFinalVersionValid(versions, checkVersion, tag) {
    if (versions.includes(checkVersion)) {
        const nextCheckVersion = semver.inc(checkVersion, 'prerelease', tag);
        return checkFinalVersionValid(versions, nextCheckVersion, tag);
    }
    return checkVersion;
}

function generateFinalVersion(isBeta) {
    const packageInfo = JSON.parse(execSync(`pnpm view ${name} --json`).toString());
    const tagInfo = packageInfo['dist-tags'];
    const beta = tagInfo["beta"] ? tagInfo["beta"] : "0.0.0"
    const rc = tagInfo["rc"] ? tagInfo["rc"] : "0.0.0"
    const next = tagInfo["next"] ? tagInfo["next"] : "0.0.0"
    const latest = tagInfo["latest"] ? tagInfo["latest"] : "0.0.0"
    const { versions } = packageInfo;
    const tag = isBeta ? 'beta' : 'rc';
    const testVersion = isBeta ? beta : rc;
    const highestReleaseVersion = semver.gt(next, latest) ? next : latest;
    const isTestHigher = semver.gt(testVersion, highestReleaseVersion);
    if (isTestHigher) {
        finalVerson = semver.inc(testVersion, 'prerelease', tag);
    } else {
        finalVerson = semver.inc(highestReleaseVersion, 'prerelease', tag);
    }
    /* 存在case，发布version后，但是tag未更新，导致下次发包取的tag不准确，发布已存在的版本从而发布失败 */
    finalVerson = checkFinalVersionValid(versions, finalVerson, tag);
}

/* 重写packageJson文件，用于测试/预发分支更新version */
generateFinalVersion(isTestBranch);

packageJson.version = finalVerson;
console.log(packageJson)
fs.writeFileSync(path.resolve(__dirname, './package.json'), JSON.stringify(packageJson, null, 2));

/* 自动生成version.ts文件，用于预发展示版本信息 */
const code = `/*
 * generate By script
 */
export const version = ${JSON.stringify(finalVerson)};
`;

fs.writeFileSync(path.resolve(__dirname, './version.ts'), code, { flag: 'w' });
