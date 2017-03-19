var osmosis = require('osmosis');
var Promise = require('bluebird');
var JobDAO = require('./model/job');

const theList = 'https://www.seek.com.au/php-jobs/in-All-Melbourne-VIC?page=';
const theListLength = 10;

//var job = new JobDAO();

/*
var osmosisPromise = new Promise((resolve, reject) => {
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

      resolve();
    })
    .error(console.log);
    //.debug(console.log);
});
*/

/*
osmosisPromise.then(() => {
  console.log('--- all done ---');
  process.exit(0);
});
*/

function genEachPage(theList, theListLength) {
  const theReturn = [];
  // theList ==== https://www.seek.com.au/php-jobs/in-All-Melbourne-VIC?page=
  for(var i=1; i<=theListLength; i++) {
    let page = theList + i;
    theReturn.push(page);
  }

  return theReturn;
}


function main() {
  let jobArr = genEachPage(theList, theListLength);
  //console.log(jobArr);

  return Promise.each(jobArr, (singlePage) => {
    return new Promise((resolve, reject) => {
      console.log('~~~~~~' + singlePage + '~~~~~~');

      osmosis
        .get(singlePage)
        .find('article')
        .set({
          'script': 'script'
        })
        .data((data) => {
          console.log('-------- single data obj -------');
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

          resolve();
        })
        .error(console.log);
    });
  });

}


main().then(() => {
  console.log('--- all done ---');
  process.exit(0);
});
