var osmosis = require('osmosis');
var Promise = require('bluebird');
var JobDAO = require('./model/job');

var job = new JobDAO();
var searchUrl = 'https://www.seek.com.au/php-jobs/in-melbourne';

/**** Same as above ****/
osmosis
  .get(searchUrl)
  .find('article')
  .set({
    'script': 'script'
  })
  .data((data) => {
    console.log('--- single data obj ---');
    let script = data.script;
    script = JSON.parse(script);

    let datePosted = script.datePosted;
    let description = script.description;
    let employmentType = script.employmentType;
    let orgName = script.hiringOrganization.name;

    let addressLocal = script.jobLocation.address.addressLocality;
    let addressRegion = script.jobLocation.address.addressRegion;
    let jobTitle = script.title;
    let jobUrl = script.url;

    console.log(datePosted);
    console.log(description);
    console.log(employmentType);
    console.log(orgName);

    console.log(addressLocal);
    console.log(addressRegion);
    console.log(jobTitle);
    console.log(jobUrl);
  })
  .error(console.log);
  //.debug(console.log);
