const noadv = [
	{
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

const adv = [
	{
		p: "zero",
		time: "6:35 - 7:30"
	},
	{
		p: "adv",
		time: "7:35 - 8:05"
	},
	{
		p: "1",
		time: "8:10 - 9:05"
	},
	{
		p: "2",
		time: "9:10 - 10:10"
	},

	// p 3 and lunch
	{
		p: "lnc",
		time: "10:10 - 10:40",
		l: "1"
	},
	{
		p: "3",
		time: "10:45 - 11:55",
		l: "1"
	},

	{
		p: "3",
		time: "10:15 - 10:45",
		l: "2"
	},
	{
		p: "lnc",
		time: "10:45 - 11:15",
		l: "2"
	},
	{
		p: "3",
		time: "11:20 - 11:55",
		l: "2"
	},

	{
		p: "3",
		time: "10:15 - 11:25",
		l: "3"
	},
	{
		p: "lnc",
		time: "11:25 - 11:55",
		l: "3"
	},

	{
		p: "4",
		time: "12:00 - 1:00"
	},
	{
		p: "5",
		time: "1:05 - 2:05"
	},
	{
		p: "dism",
		time: "2:05 - 2:10"
	}
];
const lunches = { // prob messed up somewhere, please double check
	allen: 1,
	bland: 1,
	brendible: 1,
	doyle: 1,
	gibbs: 1,
	guevarra: 1,
	howard: 1,
	cain: 1,
	knox: 1,
	loiselle: 1,
	sorierro: 1,
	pike: 1,
	ridgeway: 1,
	saffle: 1,
	schultzwetherington: 1, // name contains a - "schultz-wetherington"
	schwoch: 1,
	vallier: 1,
	wilson: 1,
	anderson: 2,
	barnette: 2,
	beatty: 2,
	beckwith: 2,
	iddins: 2,
	cambra: 2,
	carrell: 2,
	estrada: 2,
	kfowler: 2, // name contains a . and a space, "K. Fowler"
	gladfeather: 2,
	kober: 2,
	reisch: 2,
	iverson: 2,
	jolly: 2,
	morford: 2,
	snedigar: 2,
	snow: 2,
	parker: 2,
	southworth: 2,
	stern: 2,
	taylor30: 2, // why "Taylor 30"
	wood: 2,
	brokaw: 3,
	dansereau: 3,
	rfowler: 3, // "R. Fowler"
	haegele: 3,
	hamilton: 3,
	hubeek: 3,
	lantz: 3,
	newchoir: 3, // "New Choir"
	misely: 3,
	morrison: 3,
	rath: 3,
	rexus: 3,
	shoot: 3,
	stumpf: 3,
	thorn: 3,
	wetherington: 3,
	apostilldes: 3	
	
}
const end = [{
	we: true
}]

function toTitleCase(text) {
	if (typeof text !== 'string') {
		return text;
	} else {
		let newText = text.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
		return newText.replace('Ela', 'ELA').replace('Us', 'US');
	}
}

const main = Vue.createApp({
	data() {
		return {
			setup: {
				init: true,
				step: 1,
				importMethod: "a",
				studentVue: {
					lastLogin: "",
					rememberMe: false,
					username: "",
					password: "",
					name: "",
					permID: 0,
				},
				loggingIn: false,
				loginError: "",
			},
			full: false,
			day: new Date().getDay(),
			configMenuOpen: false,
			hide: true,
			lunch: "1",
			cohort: "normal",
			zooms: {
				p1: "",
				p2: "",
				p3: "",
				p4: "",
				p5: "",
				padv: "",
				pzero: "",
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
				pzero: "",
			},
			schedule: {
				normal: [end, noadv, adv, noadv, adv, noadv, end],
				// a: [end, in1, re1, wed, in2, re2, end],
				// b: [end, re1, in1, wed, re2, in2, end],
				// t: [end, in1, in1, wed, in2, in2, end],
			},
			version: 2,
		};
	},
	created() {
		let data = JSON.parse(localStorage.getItem("data"));

		if (data && data.version !== this.version) {
			localStorage.setItem('data-v' + (data.version || 1), JSON.stringify(data));
			this.save();
			console.log('reset data due to a newer data version')
			return;
		}

		if (data) {
			this.classes = data.classes || this.classes;

			// cohort (remote)
			this.cohort = 'normal' // data.cohort || this.cohort;

			this.lunch = data.lunch || this.lunch;

			// zooms (remote)
			this.zooms = data.zooms || this.zooms;

			this.hide = (data.hide !== undefined ? data.hide : this.hide);

			// full remote
			this.full = data.full || this.full;

			this.rooms = data.rooms || this.rooms;

			this.setup.init = (data.init !== undefined ? data.init : this.setup.init);

			this.setup.studentVue.password = data.password || "";
			this.setup.studentVue.username = data.username || "";

			this.setup.studentVue.rememberMe = data.rememberMe || false;
			this.setup.studentVue.lastLogin = data.lastLogin || new Date();
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
				init: this.setup.init,
				classes: this.classes,
				cohort: this.cohort,
				lunch: this.lunch,
				zooms: this.zooms,
				hide: this.hide,
				full: this.full,
				rooms: this.rooms,
				password: this.setup.studentVue.password,
				username: this.setup.studentVue.username,
				lastLogin: this.setup.studentVue.lastLogin,
				rememberMe: this.setup.studentVue.rememberMe,
				version: this.version,
			};
			localStorage.setItem("data", JSON.stringify(data_new));
		},
		going() {
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
		},
		dayName() {
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			return days[this.day];
		},
		goes(day) {
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
			// return pd;

			// full remote
			return per.p === 'arr' && this.full ? 'Study' : per.p === 'dism' && this.full ? 'Study' : pd === '' ? 'Period ' + per.p : pd;
		},
		configMenu() {
			this.configMenuOpen = !this.configMenuOpen;
		},
		studentVueLogin() {
			console.log("logging in")

			this.setup.loggingIn = true;

			fetch('https://bhsdb.wackery.com/api/validate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: this.setup.studentVue.username,
					password: this.setup.studentVue.password
				})
			})
				.then((res) => res.json()).then((json) => {
					console.log(json)
					if (json["code"] == "ERROR") {
						// uh oh something went wrong!
						console.error("ERROR FROM API! " + json["content"]["error"]);

						main.setup.loginError = json["content"]["error"];
						main.setup.loggingIn = false;
					} else {
						if (main.setup.loginError !== '') {
							main.setup.loginError = "";
						}

						// we good! 
						// request the student schedule/data
						fetch("https://bhsdb.wackery.com/api/get_student_info", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								username: this.setup.studentVue.username,
								password: this.setup.studentVue.password
							})
						}).then((res) => res.json()).then((json) => {
							main.setup.studentVue.name = json.content.FormattedName;
							main.setup.studentVue.permID = json.content.PermID;
							console.log("student_info:")
							console.log(json)

							main.setup.step++;
						})
						// todo: use a loop to get all 3 terms, im lazy and its late
						fetch("https://bhsdb.wackery.com/api/get_schedule", {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								username: this.setup.studentVue.username,
								password: this.setup.studentVue.password
							})
						}).then((res) => res.json()).then((json) => {
							for (let classPD of json.content.ClassLists.ClassListing) {
								if (classPD.Period === 8) {
									// advisory, add that here
									main.rooms['padv'] = toTitleCase(classPD.RoomName);
									continue;
								}

								main.classes['p' + classPD.Period] = toTitleCase(classPD.CourseTitle);
								main.rooms['p' + classPD.Period] = toTitleCase(classPD.RoomName);
							}

							main.save();

							console.log("schedule t1:")
							console.log(json)
						})

					}
				})
			// .catch((err) => { console.log("Error: " + err) });

			main.setup.studentVue.lastLogin = new Date();
		},
		setupDone() {
			this.setup.init = false;
			this.save();
			this.resetSetup();
		},
		resetSetup() {
			this.setup.step = 1;
			this.setup.importMethod = 'a';
			this.setup.loggingIn = false;
		},
		resetSite() {
			localStorage.removeItem('data');
			location.reload();
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

main.$.appContext.config.errorHandler = (err, vm, info) => {
	if (JSON.parse(localStorage.getItem('data')) !== {}) {
		localStorage.setItem('data', '{ }');
		console.log('localstorage cleared to try fixing the problem')
		
	}
	console.log(err + vm + info);
}

if (main.setup.studentVue.rememberMe && main.setup.studentVue.username !== '' && main.setup.studentVue.password !== '') {
	let lastLoginTime = new Date(main.setup.studentVue.lastLogin);
	let now = new Date();

	// if the last login was more than a day ago, login again
	console.log(now.getTime() - lastLoginTime.getTime())
	if (now.getTime() - lastLoginTime.getTime() > 86400000) {
		main.studentVueLogin();
		main.resetSetup();
	}
}

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


var buttonInstall = document.getElementById("installbutton");

window.addEventListener("load", function () {
	if (isPWA()) {
		localStorage.setItem("installed", true)
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

window.addEventListener('appinstalled', () => {
	// Hide the app-provided install promotion
	document.getElementById("howtomakeapp").style.display = "none";
	// Clear the deferredPrompt so it can be garbage collected
	localStorage.setItem("installed", "true");
	// Optionally, send analytics event to indicate successful install
	location.reload();
	console.log('PWA was installed');
});

init_ServiceWorker();
