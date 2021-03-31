
const in1 = [
	{ p: "arr", time: "8:05 - 8:35" },
	{ p: "adv", time: "8:35 - 9:05" },
	{ p: "pass", time: "9:05 - 9:10" },
	{ p: "1", time: "9:10 - 10:40" },
	{ p: "pass", time: "10:40 - 10:45" },

	{ p: "lnc", time: "10:45 - 11:15", l: "1" },
	{ p: "3", time: "11:20 - 12:30", l: "1" },

	{ p: "3", time: "10:45 - 11:20", l: "2" },
	{ p: "lnc", time: "11:20 - 11:50", l: "2" },
	{ p: "3", time: "11:55 - 12:30", l: "2" },

	{ p: "3", time: "10:45 - 12:00", l: "3" },
	{ p: "lnc",	time: "12:00 - 12:30", l: "3"	},

	{ p: "pass", time: "12:30 - 12:35" },
	{ p: "5", time: "12:35 - 2:05" },
	{ p: "dism", time: "2:05 - 2:35" },
];

const in2 = [{
		p: "arr",
		time: "8:05 - 8:35",
		go: true,
	},
	{
		p: "adv",
		time: "8:35 - 9:05",
	},
	{
		p: "pass",
		time: "9:05 - 9:10",
	},
	{
		p: "2",
		time: "9:10 - 10:40",
	},
	{
		p: "pass",
		time: "10:40 - 10:45",
	},

	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "1",
	},
	{
		p: "3",
		time: "11:20 - 12:30",
		l: "1",
	},

	{
		p: "3",
		time: "10:45 - 11:20",
		l: "2",
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
		l: "2",
	},
	{
		p: "3",
		time: "11:55 - 12:30",
		l: "2",
	},

	{
		p: "3",
		time: "10:45 - 12:00",
		l: "3",
	},
	{
		p: "lnc",
		time: "12:00 - 12:30",
		l: "3",
	},

	{
		p: "pass",
		time: "12:30 - 12:35",
	},
	{
		p: "4",
		time: "12:35 - 2:05",
	},
	{
		p: "dism",
		time: "2:05 - 2:35",
	},
];

const re1 = [{
		p: "study",
		time: "8:05 - 8:35",
		go: false,
	},
	{
		p: "adv",
		time: "8:35 - 9:05",
	},
	{
		p: "pass",
		time: "9:05 - 9:10",
	},
	{
		p: "1",
		time: "9:10 - 10:40",
	},
	{
		p: "pass",
		time: "10:40 - 10:45",
	},

	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "1",
	},
	{
		p: "3",
		time: "11:20 - 12:30",
		l: "1",
	},

	{
		p: "3",
		time: "10:45 - 11:20",
		l: "2",
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
		l: "2",
	},
	{
		p: "3",
		time: "11:55 - 12:30",
		l: "2",
	},

	{
		p: "3",
		time: "10:45 - 12:00",
		l: "3",
	},
	{
		p: "lnc",
		time: "12:00 - 12:30",
		l: "3",
	},

	{
		p: "pass",
		time: "12:30 - 12:35",
	},
	{
		p: "5",
		time: "12:35 - 2:05",
	},
	{
		p: "study",
		time: "2:05 - 2:35",
	},
];

const re2 = [{
		p: "study",
		time: "8:05 - 8:35",
		go: false,
	},
	{
		p: "adv",
		time: "8:35 - 9:05",
	},
	{
		p: "pass",
		time: "9:05 - 9:10",
	},
	{
		p: "2",
		time: "9:10 - 10:40",
	},
	{
		p: "pass",
		time: "10:40 - 10:45",
	},

	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "1",
	},
	{
		p: "3",
		time: "11:20 - 12:30",
		l: "1",
	},

	{
		p: "3",
		time: "10:45 - 11:20",
		l: "2",
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
		l: "2",
	},
	{
		p: "3",
		time: "11:55 - 12:30",
		l: "2",
	},

	{
		p: "3",
		time: "10:45 - 12:00",
		l: "3",
	},
	{
		p: "lnc",
		time: "12:00 - 12:30",
		l: "3",
	},

	{
		p: "pass",
		time: "12:30 - 12:35",
	},
	{
		p: "4",
		time: "12:35 - 2:05",
	},
	{
		p: "study",
		time: "2:05 - 2:35",
	},
];

const wed = [{
		p: "study",
		time: "8:05 - 8:50",
		go: false,
	},
	{
		p: "1",
		time: "8:50 - 9:35",
	},
	{
		p: "2",
		time: "9:40 - 10:25",
	},
	{
		p: "3",
		time: "10:30 - 11:15",
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
	},
	{
		p: "4",
		time: "11:50 - 12:35",
	},
	{
		p: "5",
		time: "12:40 - 1:25",
	},
	{
		p: "study",
		time: "1:30 - 2:35",
	},
];

const main = Vue.createApp({
	data() {
		return {
			full: false,
			hide: false,
			lunch: "1",
			cohort: "a",
			zooms: {
				p1: "",
				p2: "",
				p3: "",
				p4: "",
				p5: "",
				padv: "",
			},
			classes: {
				p1: "",
				p2: "",
				p3: "",
				p4: "",
				p5: "",
				padv: "Advisory",
				plnc: "Lunch",
				parr: "Arrival",
				pdism: "Dismissal",
				pstudy: "Study",
				ppass: "Passing",
			},
			rooms: {
				p1: "",
				p2: "",
				p3: "",
				p4: "",
				p5: "",
				padv: "",
			},
			schedule: {
				a: [in1, re1, wed, in2, re2],
				b: [re1, in1, wed, re2, in2],
				t: [in1, in1, wed, in2, in2],
			},
		};
	},
	mounted() {
		let data = JSON.parse(localStorage.getItem("data"));
		if (data) {
			this.classes = data.classes || this.classes;
			this.cohort = data.cohort || this.cohort;
			this.lunch = data.lunch || this.lunch;
			this.zooms = data.zooms || this.zooms;
			this.hide = data.hide || this.hide;
			this.full = data.full || this.full;
			this.rooms = data.rooms || this.rooms;
		}
		this.save();
	},
	methods: {
		save() {
			let data_new = {
				classes: this.classes,
				cohort: this.cohort,
				lunch: this.lunch,
				zooms: this.zooms,
				hide: this.hide,
				full: this.full,
				rooms: this.rooms,
			};
			localStorage.setItem("data", JSON.stringify(data_new));
		},
		goes(day) {
			if (this.cohort === 't') {
				return '';
			} else if (day === 'w' || this.full) {
				return '<br>Remote';
			} else if (this.cohort === 'a') {
				if (day === 'm' || day === 'th') {
					return '<br>In Person';
				} else {
					return '<br>Remote';
				}
			} else if (this.cohort === 'b') {
				if (day === 'tu' || day === 'f') {
					return '<br>In Person';
				} else {
					return '<br>Remote';
				}
			} else {
				return '<br>Error';
			}
		},
		perName(per) {
			let pd = this.classes['p' + per.p];
			return per.p === 'arr' && this.full ? 'Study' : per.p === 'dism' && this.full ? 'Study' : pd === '' ? 'Period ' + per.p : pd;
		},
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
		},
		full() {
			this.save();
		}
	},
	computed: {
		isPWA: function() {
			return isPWA()
		},
		isInstalled: function () {
			return localStorage.getItem("installed") !== null && localStorage.getItem("installed") === "true";
		}
	}
}).mount("#main");

function getPWADisplayMode() {
	const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
	if (document.referrer.startsWith('android-app://')) {
	  return 'twa';
	} else if (navigator.standalone || isStandalone) {
	  return 'standalone';
	}
	return 'browser';
}

function isPWA() {
	return getPWADisplayMode() != "browser";
}

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

window.addEventListener("load", function () {
	if (isPWA()) {
		localStorage.setItem("installed", true)
	}
	
	let installed = localStorage.getItem("installed") || false;
	if (installed) {
		buttonInstall.style.display = "none";
		document.getElementById("installbutton-container").style.display = "none";
	}
});


function init_ServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('/schedule-personalizer/sw.js').then(function (registration) {
				// Registration was successful
				console.log('ServiceWorker registration successful with scope: ', registration.scope);
			}, function (err) {
				// registration failed :(
				console.log('ServiceWorker registration failed: ', err);
			});
		});
	}
}

let deferredPrompt;
var buttonInstall = document.getElementById("installbutton");

function showInstallPromotion() {
	buttonInstall.removeAttribute("disabled");
	buttonInstall.style.display = "";
	document.getElementById("installbutton-container").style.display = "block";
}

function hideInstallPromotion() {
	buttonInstall.setAttribute("disabled", true);
}

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent the mini-infobar from appearing on mobile
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI notify the user they can install the PWA
	showInstallPromotion();
});

buttonInstall.addEventListener('click', async () => {
	// Hide the app provided install promotion
	hideInstallPromotion();
	// Show the install prompt
	deferredPrompt.prompt();
	// Wait for the user to respond to the prompt
	const { outcome } = await deferredPrompt.userChoice;
	// Optionally, send analytics event with outcome of user choice
	console.log(`User response to the install prompt: ${outcome}`);
	// We've used the prompt, and can't use it again, throw it away
	deferredPrompt = null;
});

window.addEventListener('appinstalled', () => {
	// Hide the app-provided install promotion
	hideInstallPromotion();
	buttonInstall.style.display = "none";
	document.getElementById("installbutton-container").style.display = "none";
	document.getElementById("howtomakeapp").style.display = "none";
	// Clear the deferredPrompt so it can be garbage collected
	deferredPrompt = null;
	localStorage.setItem("installed", "true");
	// Optionally, send analytics event to indicate successful install
	location.reload();
	console.log('PWA was installed');
});

init_ServiceWorker();
