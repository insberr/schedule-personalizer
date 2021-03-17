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
			tbcolors: true,
			lunch: 1,
			cohort: 'a',
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
	}
}).mount('#main');
