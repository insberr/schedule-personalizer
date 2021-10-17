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

const lateStart = [
	{ p: "arr", time: "8:15 - 8:30" },
	{ p: "1", time: "8:35 - 9:25" },
	{ p: "2", time: "9:30 - 10:25" },

	{ p: "lnc", time: "10:25 - 10:55", l: "1" },
	{ p: "3", time: "11:00 - 12:10", l: "1" },

	{ p: "3", time: "10:30 - 11:00", l: "2" },
	{ p: "lnc", time: "11:00 - 11:30", l: "2" },
	{ p: "3", time: "11:35 - 12:10", l: "2" },

	{ p: "3", time: "10:30 - 11:40", l: "3" },
	{ p: "lnc", time: "11:40 - 12:10", l: "3" },

	{ p: "4", time: "12:15 - 1:10" },
	{ p: "5", time: "1:15 - 2:05" },
	{ p: "dism", time: "2:05 - 2:10" }
];

const lunches = { // lunch, these are teacher ids that identify teachers within the district.
	"1522F63C-385F-4A8F-B89D-3E6F46012FE3": 1,
	"E2899865-11A1-4C45-A63B-25BFBE878157": 1,
	"1FD1AA82-942A-40EE-95D4-F34305640AF6": 1,
	"A7ABDA74-2925-42EF-AC7C-6326DC6E4B20": 1,
	"05B18ACF-4FB0-4D48-A97B-5E8A295FE753": 1,
	"8FAC9753-5B46-44FB-A649-1AF4A8CC1541": 1,
	"292C3235-37B1-4475-B807-708D0A336D0D": 1,
	"E348AC0E-CC2C-4EC4-B3FE-122982161F4E": 1,
	"EA675775-8E99-489C-94E4-86228C4F1892": 1,
	"8C2BA073-F252-4166-9AA0-8BAA32010154": 1,
	"BE947D94-A04C-425F-B91F-5AA4402F312F": 1,
	"FB630C19-B6B5-4206-BAAA-760A36CF2891": 1,
	"D6880979-2D55-48BB-AEC1-85AE6DA526FE": 1,
	"AB98701E-A3DE-47A9-99DB-5AAC7397EB11": 1,
	"05CB9140-0555-459A-8EF4-906E4CC765FA": 1,
	"554D6D51-BA62-414B-AE85-4359EECBEBAD": 1,
	"10B967EC-7856-481F-A582-B084362DE8E0": 1,
	"49512926-C5E3-42C7-90FA-AEE628D72717": 1,
	"833B4D50-83AF-4973-8C0B-917FEA73A621": 1,
	"2082227C-4340-4A77-9BFD-2A91DE42E5F4": 2,
	"743247FA-3794-433D-B93B-3B8F928D51CC": 2,
	"0AD4E730-8F18-4E95-AEEA-2ED5C337C151": 2,
	"3ED4A9A4-1C03-4B3A-AB2C-394FBAD20616": 2,
	"818785EB-41A3-441F-A1CF-3444C9EC66EF": 2,
	"684B20C2-BAB0-4E22-BFE0-22F8CBB994C5": 2,
	"D271A345-ED7C-412A-BB26-27A41FE3399D": 2,
	"5A278915-6DA9-45BF-967A-D3C6909CAE36": 2,
	"EF0E762D-7A7D-4BBD-864B-4C6D6743E9FF": 2,
	"4CE7FB9A-1C6F-4174-9C50-9F32F056B707": 2,
	"429ED605-7245-4A99-A876-BA180822D7B8": 2,
	"67BF212C-EB81-4FE3-AC0D-03AB4AD5F8F4": 2,
	"F0887088-6E68-4CB7-82A1-EFD647AA0DD4": 2,
	"D81A4ABA-8EAB-40D1-8DCA-AEA24D5DF935": 2,
	"E7E3184B-A6CD-4DC5-8DCF-E7EED29B1043": 2,
	"3A021C70-1EBB-4EC3-A30F-1D3BCBC75B55": 2,
	"E0322F38-B08D-4A24-8ECD-C5C51CBB91BF": 2,
	"A84A6028-B7A1-4216-BA17-83FCC23E5CF4": 2,
	"CBDFA846-B3CB-45C5-BB36-C870B5AC4099": 2,
	"8D601451-1F29-44C4-9F33-B40659143F33": 2,
	"D628E698-735A-4FA3-903F-CC04C4FF1487": 2,
	"EBE2A4EF-690D-4A4D-B0FC-6DDD9941FF65": 2,
	"5055B0DF-34AB-42AA-8AD4-07E7FB95293E": 3,
	"9C064163-370F-4D03-96A0-A57D0E06B8F7": 3,
	"E3741ADD-A38D-4CF3-8628-80E31B902401": 3,
	"11F13E4A-D3C2-44C2-B85E-E42D044C4A7D": 3,
	"5ED1F075-B1E6-4012-9F25-F9BD96DE3CB7": 3,
	"1B5BFD83-2919-4A21-85A0-CD82D6364AF2": 3,
	"736302BF-89B1-4FC3-BC31-ED8CFA8D4E6C": 3,
	"ED394502-C892-444F-988E-528DD1D4655A": 3,
	"6C0E7AA5-FB41-46C7-A017-125B4590EF87": 3,
	"87361F26-64B4-4245-BD95-A20E8495F86B": 3,
	"EB696A7C-FD7F-4A05-B60C-217D04FDD7FF": 3,
	"31132696-3038-4611-9A5D-4F07D3D57F0A": 3,
	"CDE89AD0-1D63-4DB7-8C89-A66F1C5C41E2": 3,
	"F315657A-F3F1-459E-ABE8-003D4D3ECF81": 3,
	"E597CBAA-D3C7-4C74-B0B3-9DAAAE85CCF2": 3,
	"02E56D4C-FFAD-4A44-A7B9-9927CB1B2787": 3
}

const noSchool = [
	{ we: true },
	{ p: 'study', time: 'Theres no school today Silly!' }
]

const end = [
	{
		we: true
	},
	{ p: 'study', time: 'Its The Weekend Silly!' },
];

const earlyDismissal1 = [
	{ p: 'zero', time: '6:35 - 7:30' },
	{ p: '1', time: '7:35 - 7:50' },
	{ p: '2', time: '7:55 - 8:25' },
	{ p: '3', time: '8:30 - 9:00' },
	{ p: '4', time: '9:05 - 9:30' },
	{ p: '5', time: '9:35 - 10:05' },
	{ p: 'dism', time: '10:05 - 10:10' }
]

const earlyDismissal2 = [
	{ p: 'zero', time: '6:35 - 7:30' },
	{ p: 'adv', time: '7:35 - 9:15' },
	{ p: '1', time: '9:20 - 10:05' },
	{ p: 'dism', time: '10:05 - 10:10' }
]

const earlyDismissal3 = [
	{ p: 'zero', time: '6:35 - 7:30' },
	{ p: 'adv', time: '7:35 - 8:50' },
	{ p: '2', time: '8:55 - 9:30' },
	{ p: '3', time: '9:35 - 10:05' },
	{ p: 'dism', time: '10:05 - 10:10' }
]

const earlyDismissal4 = [
	{ p: 'zero', time: '6:35 - 7:30' },
	{ p: 'adv', time: '7:35 - 8:45' },
	{ p: '4', time: '8:50 - 9:25' },
	{ p: '5', time: '9:30 - 10:05' },
	{ p: 'dism', time: '10:05 - 10:10' }
]

/* 
	REMEMBER Months 0 - 11
			Days 1 - 30/31 (F Febuary has 29 days or something)
*/

/*
	events: {
		month: {
			day: {
				details: "",
				schedule: []
			}
		}
	}
*/
const events = {
	9: {
		21: {
			details: "Early dismissal (K-12)",
			schedule: earlyDismissal1
		},
		// no school on the 22nd
		22: {
			details: "No school for students",
			schedule: noSchool
		},
		// early dismissal 27-29 (6-12)
		27: {
			details: "Early dismissal (6-12)",
			schedule: earlyDismissal2
		},
		28: {
			details: "Early dismissal (6-12)",
			schedule: earlyDismissal3
		},
		29: {
			details: "Early dismissal (6-12)",
			schedule: earlyDismissal4
		},
	}
}

const api_url = "https://bhsdb.wackery.com/api"

let t = new Date().setDate(8)
function toTitleCase(text) {
	if (typeof text !== 'string') {
		return text;
	} else {
		let newText = text.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
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
					lunchid: ""
				},
				loggingIn: false,
				loginError: "",
			},
			full: false,
			day: new Date().getDay(),
			week: 0, // I was going to make it so you can view future weeks too, but im too lazy to code it lol
			dayChanged: false,
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
			teachers: {
				p1: {
					name: "",
					email: "",
				},
				p2: {
					name: "",
					email: "",
				},
				p3: {
					name: "",
					email: "",
				},
				p4: {
					name: "",
					email: "",
				},
				p5: {
					name: "",
					email: "",
				},
				padv: {
					name: "",
					email: "",
				},
			},
			schedule: {
				normal_default: [end, noadv, adv, noadv, adv, noadv, end],
				normal: [end, noadv, adv, noadv, adv, noadv, end],
				// a: [end, in1, re1, wed, in2, re2, end],
				// b: [end, re1, in1, wed, re2, in2, end],
				// t: [end, in1, in1, wed, in2, in2, end],
			},
			scheduleEvent: null,
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

			this.teachers = data.teachers || this.teachers;

			this.setup.init = (data.init !== undefined ? data.init : this.setup.init);

			this.setup.studentVue.password = data.password || "";
			this.setup.studentVue.username = data.username || "";

			this.setup.studentVue.rememberMe = data.rememberMe || false;
			this.setup.studentVue.lastLogin = data.lastLogin || new Date();
		}
		this.save();

		this.scheduleEventCheck();

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
				teachers: this.teachers,
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
		perTeacher(per) {
			if (per.p === 'arr' || per.p === 'dism' || per.p === 'zero' || per.p === 'lnc' || per.p === 'study') return '';
			return this.teachers['p' + per.p];
		},
		configMenu() {
			this.configMenuOpen = !this.configMenuOpen;
		},
		studentVueLogin() {
			console.log("logging in")

			this.setup.loggingIn = true;

			fetch(api_url + '/validate', {
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
						fetch(api_url + "/get_student_info", {
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


						}).then(() => {
							// display model
							this.openModel().then(() => {
								// todo: use a loop to get all 3 terms, im lazy and its late
								fetch(api_url + "/get_schedule", {
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
										if (classPD.Period == 8) {
											// advisory, add that here
											main.rooms['padv'] = toTitleCase(classPD.RoomName);
											main.teachers['padv'].name = toTitleCase(classPD.Teacher);
											main.teachers['padv'].email = classPD.TeacherEmail.toLowerCase();
											continue;
										}
										if (classPD.Period == 3) {
											this.setup.studentVue.lunchid = classPD.TeacherStaffGU
										}
										main.classes['p' + classPD.Period] = toTitleCase(classPD.CourseTitle);
										main.rooms['p' + classPD.Period] = toTitleCase(classPD.RoomName);

										main.teachers['p' + classPD.Period].name = toTitleCase(classPD.Teacher);
										main.teachers['p' + classPD.Period].email = classPD.TeacherEmail.toLowerCase();
									}

									this.runLunchDetect();
									main.save();
									console.log("schedule t1:")
									console.log(json)
									this.setup.loggingIn = false;

								})
							}, () => {
								// user said no to prompt
								this.setup.loggingIn = false;
							})
						})
					}
				})
			// .catch((err) => { console.log("Error: " + err) });

			main.setup.studentVue.lastLogin = new Date();
		},
		updateLunch(teacherid) {
			if (teacherid in lunches) {
				this.lunch = lunches[teacherid].toString()
				return true
			}
			return false
		},
		runLunchDetect() {
			if (this.setup.studentVue.lunchid != "") {
				if (this.updateLunch(this.setup.studentVue.lunchid)) {
					console.log("Lunch was detected sucessfully")
					this.setupDone();
				} else {
					console.log("Lunch was not found! displaying prompt")
					main.setup.step++;
				}
			} else {
				main.setup.step++;
			}
		},
		openModel() {
			return new Promise((resolve, reject) => {
				if (!main.setup.init) {
					resolve();
					return;
				}
				var gamerpopup = new bootstrap.Modal(document.getElementById('isthisyou'), { backdrop: 'static', keyboard: false, focus: true });
				document.getElementById("gamerno").onclick = function () {
					gamerpopup.hide();
					reject();
				}
				document.getElementById("gameryes").onclick = function () {
					gamerpopup.hide();
					resolve();
				}
				gamerpopup.show();
			}) // please refactor i dont do promises
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
		},
		scheduleEventCheck() {
			let month = new Date().getMonth();
			let date = new Date().getDate();

			if (events[month] !== undefined && events[month][date + ((this.day + (this.week * 7)) - new Date().getDay())] !== undefined) {
				this.scheduleEvent = events[month][date + ((this.day + (this.week * 7)) - new Date().getDay())];
				this.schedule[this.cohort][this.day] = events[month][date + ((this.day + (this.week * 7)) - new Date().getDay())].schedule;
			} else {
				this.scheduleEvent = null;
				this.schedule[this.cohort] = [...this.schedule[this.cohort + "_default"]];
			}
		},
		currentLookingAtDay() {
			let date = new Date(new Date().setDate(new Date().getDate() + ((this.day + (this.week * 7)) - new Date().getDay())));
			return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ((new Date().getDay() === (this.day + (this.week * 7)) && this.dayChanged) ? ' - Today' : '');
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
		},
		day() {
			this.scheduleEventCheck();
			this.dayChanged = true;

			if (typeof this.day === 'string') {
				this.day = parseInt(this.day);
			}

			if (this.day < 0) {
				if (this.week > 0) {
					this.day = 6;
					this.week--;
				} else {
					this.day = 0;
				}
			}

			if (this.day > 6) {
				this.day = 0;
				this.week++;
			}

			this.scheduleEventCheck();
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
