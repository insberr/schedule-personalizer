const noadv = [{
		p: "zero",
		time: "6:35 - 7:30"
	},
	{
		p: "1",
		time: "7:35 - 8:45"
	},
	{
		p: "2",
		time: "8:50 - 9:55"
	},

	// p 3 and lunch
	{
		p: "lnc",
		time: "9:55 - 10:25",
		l: "1"
	},
	{
		p: "3",
		time: "10:30 - 11:40",
		l: "1"
	},

	{
		p: "3",
		time: "10:00 - 10:30",
		l: "2"
	},
	{
		p: "lnc",
		time: "10:30 - 11:00",
		l: "2"
	},
	{
		p: "3",
		time: "11:05 - 11:40",
		l: "2"
	},

	{
		p: "3",
		time: "10:00 - 11:10",
		l: "3"
	},
	{
		p: "lnc",
		time: "11:10 - 11:40",
		l: "3"
	},

	{
		p: "4",
		time: "11:45 - 12:55"
	},
	{
		p: "5",
		time: "1:00 - 2:05"
	},
	{
		p: "dism",
		time: "2:05 - 2:10"
	}
]

const adv = [{
		p: "zero",
		time: "6:35 - 7:30"
	},
	{
		p: "1",
		time: "7:35 - 8:45"
	},
	{
		p: "2",
		time: "8:50 - 9:55"
	},

	// p 3 and lunch
	{
		p: "lnc",
		time: "9:55 - 10:25",
		l: "1"
	},
	{
		p: "3",
		time: "10:30 - 11:40",
		l: "1"
	},

	{
		p: "3",
		time: "10:00 - 10:30",
		l: "2"
	},
	{
		p: "lnc",
		time: "10:30 - 11:00",
		l: "2"
	},
	{
		p: "3",
		time: "11:05 - 11:40",
		l: "2"
	},

	{
		p: "3",
		time: "10:00 - 11:10",
		l: "3"
	},
	{
		p: "lnc",
		time: "11:10 - 11:40",
		l: "3"
	},

	{
		p: "4",
		time: "11:45 - 12:55"
	},
	{
		p: "5",
		time: "1:00 - 2:05"
	},
	{
		p: "dism",
		time: "2:05 - 2:10"
	}
]

const in1 = [{
		we: false,
		p: "arr",
		time: "8:05 - 8:35"
	},
	{
		p: "adv",
		time: "8:35 - 9:05"
	},
	{
		p: "pass",
		time: "9:05 - 9:10"
	},
	{
		p: "1",
		time: "9:10 - 10:40"
	},
	{
		p: "pass",
		time: "10:40 - 10:45"
	},

	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "1"
	},
	{
		p: "3",
		time: "11:20 - 12:30",
		l: "1"
	},

	{
		p: "3",
		time: "10:45 - 11:20",
		l: "2"
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
		l: "2"
	},
	{
		p: "3",
		time: "11:55 - 12:30",
		l: "2"
	},

	{
		p: "3",
		time: "10:45 - 12:00",
		l: "3"
	},
	{
		p: "lnc",
		time: "12:00 - 12:30",
		l: "3"
	},

	{
		p: "pass",
		time: "12:30 - 12:35"
	},
	{
		p: "5",
		time: "12:35 - 2:05"
	},
	{
		p: "dism",
		time: "2:05 - 2:35"
	},
];

const in2 = [{
		p: "arr",
		time: "8:05 - 8:35",
		we: false
	},
	{
		p: "adv",
		time: "8:35 - 9:05"
	},
	{
		p: "pass",
		time: "9:05 - 9:10"
	},
	{
		p: "2",
		time: "9:10 - 10:40"
	},
	{
		p: "pass",
		time: "10:40 - 10:45"
	},

	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "1"
	},
	{
		p: "3",
		time: "11:20 - 12:30",
		l: "1"
	},

	{
		p: "3",
		time: "10:45 - 11:20",
		l: "2"
	},
	{
		p: "lnc",
		time: "11:20 - 11:50",
		l: "2"
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
		we: false,
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
		we: false,
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
		we: false,
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

const end = [{
	we: true
}]

const main = Vue.createApp({
	data() {
		return {
			setup: {
				init: true,
				step: 1,
				importMethod: "a",
				studentVue: {
					username: "",
					password: "",
					token: ""
				},
				done: false,
			},
			full: false,
			day: new Date().getDay(),
			configMenuOpen: false,
			hide: false,
			lunch: "1",
			cohort: "normal",
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
				pzero: "0 Hour"
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
				normal: [end, noadv, adv, noadv, adv, noadv, end],
				// a: [end, in1, re1, wed, in2, re2, end],
				// b: [end, re1, in1, wed, re2, in2, end],
				// t: [end, in1, in1, wed, in2, in2, end],
			},
		};
	},
	created() {
		let data = JSON.parse(localStorage.getItem("data"));
		if (data) {
			this.classes = data.classes || this.classes;

			// cohort (remote)
			// this.cohort = data.cohort || this.cohort;

			this.lunch = data.lunch || this.lunch;

			// zooms (remote)
			// this.zooms = data.zooms || this.zooms;

			this.hide = data.hide || this.hide;

			// full remote
			// this.full = data.full || this.full;

			this.rooms = data.rooms || this.rooms;
		}
		this.save();

	},
	mounted() {
		this.$nextTick(function () {
			document.getElementById('loading').className = "d-none";
		});
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
		going() {
			return true;
			/*
			if (this.cohort === 't') return true;
			if (this.full) return false;
			if (this.day === 3) return false;

			if (this.cohort === 'a') {
				if (this.day === 1) return true;
				if (this.day === 2) return false;
				if (this.day === 4) return true;
				if (this.day === 5) return false;
			}

			if (this.day === 1) return false;
			if (this.day === 2) return true;
			if (this.day === 4) return false;
			if (this.day === 5) return true;

			if (this.day === 0 || this.day === 6) return false;
    */
		},
		dayName() {
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return days[this.day];
		},
		goes(day) {
			return '';
			/*
			if (this.cohort === 't') {
				return '';
			} else if (day === 'w' || day === 3 || this.full) {
				return '<br>Remote';
			} else if (this.cohort === 'a') {
				if ((day === 'm' || day === 1) || (day === 'th' || day === 4)) {
					return '<br>In Person';
				} else {
					return '<br>Remote';
				}
			} else if (this.cohort === 'b') {
				if ((day === 'tu' || day === 2) || (day === 'f' || day === 5)) {
					return '<br>In Person';
				} else {
					return '<br>Remote';
				}
			} else {
				return '<br>Error';
			}
    */
		},
		perName(per) {
			let pd = this.classes['p' + per.p];
			return pd;

			// full remote
			// return per.p === 'arr' && this.full ? 'Study' : per.p === 'dism' && this.full ? 'Study' : pd === '' ? 'Period ' + per.p : pd;
		},
		config() {
			this.configMenuOpen = !this.configMenuOpen;
		},
		studentVueLogin() {
			console.log("logging in")
			fetch('https://stvapi.herokuapp.com/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: this.setup.studentVue.username,
						password: this.setup.studentVue.password,
						portal: 'wa-beth-psv.edupoint.com' // might be a good idea to ask for this from the user?
					})
				})
				.then((res) => res.json()).then((json) => {
					console.log(json)
					if (json["code"] == "ERROR") {
						// uh oh something went wrong!
						console.error("ERROR FROM API! " + json["content"]["error"]);
					} else {
						// we good! 
						// request the student schedule/data
						fetch("https://stvapi.herokuapp.com/get_student_info", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								token: json.content.token
							})
						}).then((res) => res.json()).then((json) => {
							console.log("student_info:")
							console.log(json)
						})
						// todo: use a loop to get all 3 terms, im lazy and its late
						fetch("https://stvapi.herokuapp.com/get_schedule", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								token: json.content.token
							})
						}).then((res) => res.json()).then((json) => {
							console.log("schedule t1:")
							console.log(json)
						})
						fetch("https://stvapi.herokuapp.com/get_schedule", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								token: json.content.token,
								term: 1
							})
						}).then((res) => res.json()).then((json) => {
							console.log("schedule t2:")
							console.log(json)
						})
						fetch("https://stvapi.herokuapp.com/get_schedule", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								token: json.content.token,
								term: 2
							})
						}).then((res) => res.json()).then((json) => {
							console.log("schedule t3:")
							console.log(json)
						})

						// then we log out
						fetch("https://stvapi.herokuapp.com/logout", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								token: json.content.token
							})
						})

					}
				})
			// .catch((err) => { console.log("Error: " + err) });
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
		isPWA: function () {
			return isPWA()
		},
		isInstalled: function () {
			return localStorage.getItem("installed") !== null && localStorage.getItem("installed") === "true";
		}
	}
}).mount("#main");


/*
  Refresh the data and ui when the site becomes visible. This helps to avoid date/time issues
*/
function visibilityListener() {
	switch (document.visibilityState) {
		case "hidden":
			break;
		case "visible":
			main.day = new Date().getDay();
			main.configMenuOpen = false;
			break;
	}
}

document.addEventListener("visibilitychange", visibilityListener);



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
	const {
		outcome
	} = await deferredPrompt.userChoice;
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