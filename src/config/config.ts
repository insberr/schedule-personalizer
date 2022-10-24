// Main config
// Uh
// This is so we can add multi-school support
// Someday we will add multi-school support

// If the config is installed as a module from a git repo, uncomment this and comment out everything else
/*
import * as config from 'configModuleName';
export default config;
*/

// All or part of config is stored on a database?
// This is recommended for the events and schedules config, and any other config that needs to be updated frequently
// and quickly updated for users. A web request is faster than waiting for the browser to decide to
// update the cache
/*
// Write code for that here
*/

// Multi School (Not yet implemented)
/*
import * as schoolName from './schoolName';
export const multiSchool = true;
export const schoolConfigs = {
    'School Name': schoolName
};
*/
