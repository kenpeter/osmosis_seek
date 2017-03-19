var osmosis = require('osmosis');
var Promise = require('bluebird');
var JobDAO = require('./model/job');

/*
<script type="application/ld+json">{"@context":"http://schema.org","@type":"JobPosting","datePosted":"2017-03-14T05:01:30Z","description":"Talented PHP Developer with commercial experience and an eye on strategic thinking wanted!","employmentType":"Full Time","hiringOrganization":{"@type":"Organization","name":"10collective"},"industry":"Information & Communication Technology","jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":"Eastern Suburbs","addressRegion":"Melbourne"}},"title":"PHP Developer (M2529)","url":"https://www.seek.com.au/job/33019010"}</script>


{
	"@context": "http://schema.org",
	"@type": "JobPosting",
	"datePosted": "2017-03-14T05:01:30Z",
	"description": "Talented PHP Developer with commercial experience and an eye on strategic thinking wanted!",
	"employmentType": "Full Time",
	"hiringOrganization": {
		"@type": "Organization",
		"name": "10collective"
	},
	"industry": "Information & Communication Technology",
	"jobLocation": {
		"@type": "Place",
		"address": {
			"@type": "PostalAddress",
			"addressLocality": "Eastern Suburbs",
			"addressRegion": "Melbourne"
		}
	},
	"title": "PHP Developer (M2529)",
	"url": "https://www.seek.com.au/job/33019010"
}

{ script: '{"@context":"http://schema.org","@type":"JobPosting","datePosted":"2017-03-09T00:00:46Z","description":"James - 0415 676 072. Are you an awesome PHP Developer? Want to work in a truly awesome business? Look no further...","employmentType":"Full Time","hiringOrganization":{"@type":"Organization","name":"Just Digital People"},"industry":"Information & Communication Technology","jobLocation":{"@type":"Place","address":{"@type":"PostalAddress","addressLocality":"CBD & Inner Suburbs","addressRegion":"Melbourne"}},"title":"Full Stack PHP Developer","url":"https://www.seek.com.au/job/32984882"}' }

*/

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
