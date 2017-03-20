var osmosis = require('osmosis');
var Promise = require('bluebird');
var JobDAO = require('./model/job');

const jobDAO = new JobDAO();

const theListArr = [
  {
    list: 'https://www.seek.com.au/nodejs-jobs/in-All-Melbourne-VIC?page=',
    num: 4
  },
  {
    list: 'https://www.seek.com.au/javascript-jobs/in-All-Melbourne-VIC?page=',
    num: 10
  },
  {
    list: 'https://www.seek.com.au/php-jobs/in-All-Melbourne-VIC?page=',
    num: 10 // max 10
  },
  {
    list: 'https://www.seek.com.au/IT-jobs/in-All-Melbourne-VIC?page=',
    num: 10 // max 10
  }
];


function genEachPage(theList, theListLength) {
  const theReturn = [];
  // theList ==== https://www.seek.com.au/php-jobs/in-All-Melbourne-VIC?page=
  for(var i=1; i<=theListLength; i++) {
    let page = theList + i;
    theReturn.push(page);
  }

  return theReturn;
}

function cleanup() {
  return jobDAO.delete();
}

function run() {
  return Promise.each(theListArr, (listObj) => {
    return new Promise((resolve, reject) => {
      console.log('====' + listObj.list + '====');
      let jobArr = genEachPage(listObj.list, listObj.num);

      Promise.each(jobArr, (singlePage) => {
        return new Promise((resolve1, reject1) => {
          console.log();
          console.log('~~~~~~' + singlePage + '~~~~~~');

          osmosis
            .get(singlePage)
            .find('article')
            .set({
              'script': 'script'
            })
            .data((data) => {
              console.log();
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

              resolve1();
            })
            .error((err) => {
              console.log('--- single page error:' + singlePage);
              console.error(err);
              reject1();
            });

        });
      })
      .then(() => {
        // ..............
        resolve();
      })
      .catch((err) => {
        console.log('--- page array error:' + theList);
        console.error(err);
        reject();
      });

    });

  });

}


cleanup()
.then(() => {
  return run();
})
.then(() => {
  console.log('--- all done ---');
  process.exit(0);
})
.catch(err => {
  console.log('--- main error ---');
  console.error(err);
  process.exit(1);
});
