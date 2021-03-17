
const in1 = [
	{ p: 'arr', time: '8:05 - 8:35', go: true },
	{ p: 'adv', time: '8:35 - 9:05' },
	{ p: 'pass', time: '9:05 - 9:10' },
	{ p: '1', time: '9:10 - 10:40' },
	{ p: 'pass', time: '10:40 - 10:45' },
	{ p: 'lnc', time: 'tbd', l: '1' },
	{ p: '3', time: '10:45 - 12:30' },
	{ p: 'pass', time: '12:30 - 12:35' },
	{ p: '5', time: '12:35 - 2:05' },
	{ p: 'dism', time: '2:05 - 2:35' }
];
const in2 = [
	{ p: 'arr', time: '8:05 - 8:35', go: true },
	{ p: 'adv', time: '8:35 - 9:05' },
	{ p: 'pass', time: '9:05 - 9:10' },
	{ p: '2', time: '9:10 - 10:40' },
	{ p: 'pass', time: '10:40 - 10:45' },
	{ p: 'lnc', time: 'tbd', l: '1' },
	{ p: '3', time: '10:45 - 12:30' },
	{ p: 'pass', time: '12:30 - 12:35' },
	{ p: '4', time: '12:35 - 2:05' },
	{ p: 'dism', time: '2:05 - 2:35' }
];
const re1 = [
	{ p: 'study', time: '8:05 - 8:35', go: false },
	{ p: 'study', time: '8:35 - 9:05' },
	{ p: 'pass', time: '9:05 - 9:10' },
	{ p: '1', time: '9:10 - 10:40' },
	{ p: 'pass', time: '10:40 - 10:45' },
	{ p: 'lnc', time: 'tbd', l: '1' },
	{ p: '3', time: '10:45 - 12:30' },
	{ p: 'pass', time: '12:30 - 12:35' },
	{ p: '5', time: '12:35 - 2:05' },
	{ p: 'study', time: '2:05 - 2:35' }
];
const re2 = [
	{ p: 'study', time: '8:05 - 8:35', go: false },
	{ p: 'study', time: '8:35 - 9:05' },
	{ p: 'pass', time: '9:05 - 9:10' },
	{ p: '2', time: '9:10 - 10:40' },
	{ p: 'pass', time: '10:40 - 10:45' },
	{ p: 'lnc', time: 'tbd', l: '1' },
	{ p: '3', time: '10:45 - 12:30' },
	{ p: 'pass', time: '12:30 - 12:35' },
	{ p: '4', time: '12:35 - 2:05' },
	{ p: 'study', time: '2:05 - 2:35' }
];
const wed = [
	{ p: 'study', time: '8:05 - 8:50', go: false },
	{ p: '1', time: '8:50 - 9:35' },
	{ p: '2', time: '9:40 - 10:25' },
	{ p: '3', time: '10:30 - 11:15' },
	{ p: 'lnc', time: '11:20 - 11:50', l: '1' },
	{ p: '4', time: '11:50 - 12:35' },
	{ p: '5', time: '12:40 - 1:25' },
	{ p: 'study', time: '1:30 - 2:35' }
];

const main = Vue.createApp({
	data() {
		return {
			hide: false,
			tbcolors: true,
			lunch: 1,
			cohort: 'a',
			zooms: {
				p1: '',
				p2: '',
				p3: '',
				p4: '',
				p5: '',
				padv: ''
			},
			classes: {
				p1: '',
				p2: '',
				p3: '',
				p4: '',
				p5: '',
				padv: 'Advisory',
				plnc: 'Lunch',
				parr: 'Arrival',
				pdism: 'Dismissal',
				pstudy: 'Study',
				ppass: 'Passing'
			},
			schedule: {
				a: [in1, re1, wed, in2, re2],
				b: [re1, in1, wed, re2, in2],
			}
		}
	},
	mounted() {
		let data = JSON.parse(localStorage.getItem('data'));
		if (data === undefined || data === null) return;
		this.classes = data.classes || this.classes;
		this.cohort = data.cohort || this.cohort;
		this.lunch = data.lunch || this.lunch;
		this.zooms = data.zooms || this.zooms;
		this.hide = data.hide || this.hide;
		// console.log(JSON.srtingify(localStorage.getItem('data'));
		
		this.getQueries();
		// console.log(this.classes)
		this.save();
	},
	methods: {
		save() {
			let data_new = {
				classes: this.classes,
				cohort: this.cohort,
				lunch: this.lunch,
				zooms: this.zooms,
				hide: this.hide
			};
			localStorage.setItem('data', JSON.stringify(data_new));
		},
		getQueries() {
			let queries = new URLSearchParams(window.location.search);
			let hide = queries.get('hide');
			let cohort = queries.get('cohort');
			let classes = queries.get('classes');
			let zooms = queries.get('zooms');
			let lunch = queries.get('lunch');
			
			
			if (hide) {
				this.hide = hide;
			}
			
			if (cohort) {
				this.cohort = cohort;
			}
			
			if (classes) {
				let place = classes.split(',');
				let i = 0;
				for (let c of place) {
					if (c === '_') { i++; continue; };
					this.classes['p' + i] = c;
					i++
					if (i > 5) { break; };
				}
			}
			
			if (zooms) {
				let place = classes.split(',');
				let i = 0;
				for (let c of place) {
					if (c === '_') { i++; continue; };
					this.classes['p' + i] = c;
					i++
					if (i > 5) { break; };
				}
				this.classes.padv = (place[5] !== '_' ? place[5] : '')
			}
			
			if (lunch) {
				this.lunch = lunch
			}
			
			window.history.pushState({}, document.title, "/" + "");
		}
	},
	watch: {
		lunch() {
			this.save();
		},
		cohort() {
			this.save();
		},
		hide() {
			this.save();
		}
	}
}).mount('#main');

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
