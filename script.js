

const in1 = [{
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
		p: "dism",
		time: "2:05 - 2:35",
	},
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
		p: "study",
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
		p: "study",
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
			schedule: {
				a: [in1, re1, wed, in2, re2],
				b: [re1, in1, wed, re2, in2],
			},
		};
	},
	mounted() {
		let data = JSON.parse(localStorage.getItem("data"));
		if (data === undefined || data === null) {
			console.log("hi, no data");
		} else {
			// console.log(data)
			this.classes = data.classes || this.classes;
			this.cohort = data.cohort || this.cohort;
			this.lunch = data.lunch || this.lunch;
			this.zooms = data.zooms || this.zooms;
			this.hide = data.hide || this.hide;
		}
		// console.log(JSON.srtingify(localStorage.getItem('data'));

		this.getQueries();
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
			};
			localStorage.setItem("data", JSON.stringify(data_new));
		},
		getQueries() {
			let queries = new URLSearchParams(window.location.search);

			let hide = queries.get("hide");
			let cohort = queries.get("cohort");
			let classes = queries.get("classes");
			let zooms = queries.get("zooms");
			let lunch = queries.get("lunch");

			if (hide) {
				this.hide = hide;
			}

			if (cohort) {
				this.cohort = cohort;
			}

			if (classes) {
				let place = classes.split(",");
				let i = 1;
				for (let c of place) {
					if (c === "_") {
						i++;
						continue;
					}
					this.classes["p" + i] = c;
					i++;
					if (i > 5) {
						break;
					}
				}
			}

			if (zooms) {
				let place = zooms.split(",");
				let i = 1;
				for (let c of place) {
					if (c === "_") {
						i++;
						continue;
					}
					this.zooms["p" + i] = c;
					i++;
					if (i > 5) {
						break;
					}
				}
				this.zooms.padv = place[5] !== "_" ? place[5] : "";
			}

			if (lunch) {
				this.lunch = lunch;
			}

			window.history.pushState({}, document.title, window.location.pathname);
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
	},
	
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
	return getPWADisplayMode() != "browser"
}
/*
navigator.serviceWorker.getRegistrations().then(function(registrations) {
for(let registration of registrations) {
registration.unregister()
} })
*/

/* === Dark mode === */
darkLabel = "darkModeLabel";
window.addEventListener("load", function () {
	window.darkMode = document.getElementById("darkMode");
	if (darkMode) {
		initTheme();
		darkMode.addEventListener("change", function () {
			resetTheme();
		});
	}
	if (getPWADisplayMode() != "browser") {
		localStorage.setItem("installed", "true")
	}
	var installed = localStorage.getItem("installed") !== null && localStorage.getItem("installed") === "true";
	if (installed) {
		buttonInstall.style.display = "none"
		document.getElementById("installbutton-container").style.display = "none"
	}
});

function resetTheme() {
	if (darkMode.checked) {
		document.body.setAttribute("data-theme", "dark");
		localStorage.setItem("darkMode", "dark");
		document.getElementById(darkLabel).innerHTML = "Dark";
	} else {
		document.body.removeAttribute("data-theme");
		localStorage.removeItem("darkMode");
		document.getElementById(darkLabel).innerHTML = "Light";
	}
}

function initTheme() {
	var darkThemeSelected = localStorage.getItem("darkMode") !== null && localStorage.getItem("darkMode") === "dark";
	darkMode.checked = darkThemeSelected;
	darkThemeSelected ? (document.getElementById(darkLabel).innerHTML = "Dark") : (document.getElementById(darkLabel).innerHTML = "Light");
	resetTheme();
}

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
var buttonInstall = document.getElementById("installbutton")

function showInstallPromotion() {
	buttonInstall.removeAttribute("disabled")
	buttonInstall.style.display = ""
	document.getElementById("installbutton-container").style.display = "block"
}
function hideInstallPromotion() {
	buttonInstall.setAttribute("disabled",true)
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
	buttonInstall.style.display = "none"
	document.getElementById("installbutton-container").style.display = "none"
	// Clear the deferredPrompt so it can be garbage collected
	deferredPrompt = null;
	localStorage.setItem("installed", "true")
	// Optionally, send analytics event to indicate successful install
	console.log('PWA was installed');
  });
init_ServiceWorker()