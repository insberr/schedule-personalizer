// import {
//   intervalToDuration,
//    formatDuration,
//    isAfter,
//} from "https://cdn.skypack.dev/pin/date-fns@v2.25.0-afU7qHImK3sVEDiJRpTD/mode=imports,min/optimized/date-fns.js";

const api_url = "https://studentvue.wackery.com";

function toTitleCase(text) {
    if (typeof text !== "string") {
        return text;
    } else {
        let newText = text.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        return newText.replace("Ela", "ELA").replace("Us", "US");
    }
}

// uh oh time shit

function parseTime(time, date) {
    /*if (date === undefined) {
        date = new Date(); // Right now
    }*/ // to appease the code scanner
    let t = time.split(":").map((x) => parseInt(x));
    if (t[0] < 7) {
        t[0] += 12; // 24 hour time, cry about it
    }
    date.setHours(t[0]);
    date.setMinutes(t[1]);
    date.setSeconds(0);
    return date;
}

function distanceToString(distance) {
    let durat = formatDuration(distance, {
        format: ["days", "hours", "minutes", "seconds"],
    });
    return durat == "" ? "-" : durat + " left";
}

function dateFromMain() {
    return new Date(main.year, main.month, main.day);
}

function getDistance(endtime) {
    if (isAfter(new Date(), endtime)) {
        return { seconds: 0 };
    }
    return intervalToDuration({
        start: new Date(),
        end: endtime,
    });
}

// thank god thats over

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
                    lunchid: "",
                },
                loggingIn: false,
                loginError: "",
            },
            countdowns: {
                start: -1,
                end: -1,
                cstart: "0",
                cend: "0",
            },
            trimesters: {
                t1: {
                    start: new Date("September 7, 2021"),
                    schedule: [],
                },
                t2: {
                    start: new Date("December 8, 2021"),
                    schedule: [],
                },
                t3: {
                    start: new Date("March 25, 2022"),
                    schedule: [],
                },
            },
            full: false,
            // week: new Date().getDay(),
            day: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            dayChanged: false,
            configMenuOpen: false,
            classModel: null,
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
                pzero: "0 Hour",
            },
            _defaultClasses: {
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
                pzero: "0 Hour",
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
            showScheduleInfo: true,
            version: 3,
        };
    },
    created() {
        let data = JSON.parse(localStorage.getItem("data"));

        if (data && data.version !== this.version) {
            localStorage.setItem(
                "data-v" + (data.version || 1),
                JSON.stringify(data)
            );
            this.save();
            console.log("reset data due to a newer data version");

            // return;
        }

        if (data) {
            this.classes = data.classes || this.classes;

            // cohort (remote)
            this.cohort = "normal"; // data.cohort || this.cohort;

            this.lunch = data.lunch || this.lunch;

            // zooms (remote)
            this.zooms = data.zooms || this.zooms;

            this.hide = data.hide !== undefined ? data.hide : this.hide;

            // full remote
            this.full = data.full || this.full;

            this.rooms = data.rooms || this.rooms;

            this.teachers = data.teachers || this.teachers;

            this.setup.init =
                data.init !== undefined ? data.init : this.setup.init;

            this.setup.studentVue.password = data.password || "";
            this.setup.studentVue.username = data.username || "";

            this.setup.studentVue.rememberMe = data.rememberMe || false;
            this.setup.studentVue.lastLogin = data.lastLogin || new Date();

            if (data.trimesters !== undefined) {
                this.trimesters.t1.schedule = data.trimesters.t1 || [];
                this.trimesters.t2.schedule = data.trimesters.t2 || [];
                this.trimesters.t3.schedule = data.trimesters.t3 || [];
            } else {
                this.studentVueLogin();
            }
        }
        this.save();

        this.scheduleEventCheck();
        this.setClassesFromTerm(
            this.getTermForDate(new Date(this.year, this.month, this.day))
        );

        // main.week =
        //    Math.floor(main.daysInMonth(main.month, main.year) / 7) -
        //    Math.floor(new Date().getDate() / 7);
    },
    mounted() {
        this.$nextTick(function () {
            document.getElementById("loading").className = "d-none";
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
                trimesters: {
                    t1: this.trimesters.t1.schedule,
                    t2: this.trimesters.t2.schedule,
                    t3: this.trimesters.t3.schedule,
                }
            };
            localStorage.setItem("data", JSON.stringify(data_new));
        },
        doCountdown(time) {
            time = parseTime(time, dateFromMain());
            let dist = getDistance(time);
            return distanceToString(dist);
        },
        going() {
            let weekDay = new Date(this.year, this.month, this.day).getDay();
            if (this.cohort === "t") return true;
            if (this.full) return false;

            if (this.schedule[this.cohort][this.weekDay]?.going === undefined) {
                return true;
            }

            return this.schedule[this.cohort][this.weekDay].going;
        },
        dayName() {
            var days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            return days[new Date(this.year, this.month, this.day).getDay()];
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
            let pd = this.classes["p" + per.p];
            if (this.showScheduleInfo === false) {
                pd = this._defaultClasses["p" + per.p];
            }
            // return pd;

            // full remote
            return per.p === "arr" && this.full
                ? "Study"
                : per.p === "dism" && this.full
                ? "Study"
                : pd === ""
                ? "Period " + per.p
                : pd;
        },
        perTeacher(per) {
            if (per === undefined) return "error getting teacher";
            if (
                per.p === "arr" ||
                per.p === "dism" ||
                per.p === "zero" ||
                per.p === "lnc" ||
                per.p === "study"
            )
                return "";
            return this.teachers["p" + per.p];
        },
        configMenu() {
            this.configMenuOpen = !this.configMenuOpen;
        },
        getTermForDate(date) {
            if (date < this.trimesters.t3.start) {
                if (date < this.trimesters.t2.start) {
                    return 1;
                }
                // else t2
                return 2;
            }
            // else t3
            return 3;
        },
        async studentVueLogin() {
            console.log("logging in");

            this.setup.loggingIn = true;

            await fetch(api_url + "/validate", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    username: this.setup.studentVue.username,
                    password: this.setup.studentVue.password,
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                if (json["code"] == "ERROR") {
                    // uh oh something went wrong!
                    console.error("ERROR FROM API! " + json["content"]["error"]);

                    main.setup.loginError = json["content"]["error"];
                    main.setup.loggingIn = false;
                    return;
                }
            });
            
            if (main.setup.loginError !== "") {
                main.setup.loginError = "";
            }
            
            // we good!
            // request the student schedule/data
            await fetch(api_url + "/get_student_info", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    username: this.setup.studentVue.username,
                    password: this.setup.studentVue.password,
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                main.setup.studentVue.name = json.content.FormattedName;
                main.setup.studentVue.permID = json.content.PermID;

                console.log("student_info:");
                console.log(json);
            });

            // display model
            let promptAnswer = true;
            await this.openModel().then(() => {
                /* user said yes */ 
                promptAnswer = true;
            }, () => {
                /* user said no */
                promptAnswer = false;
            });

            if (promptAnswer === false) {
                main.setup.loggingIn = false;
                return;
            }

            await fetch(api_url + "/get_all_schedules", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify({
                    username: this.setup.studentVue.username,
                    password: this.setup.studentVue.password,
                }),
            })
            .then((res) => res.json())
            .then((json) => {
                console.log("all_schedules:");
                console.log(json);

                for (let [index,term] of json.content.ClassLists.entries()) {
                    main.trimesters["t" + (index + 1)].schedule = term;
                }

                // main.trimesters["t" + (i + 1)].schedule = json.content.ClassLists[i]
            });

            main.save();

            main.setup.loggingIn = false;
            main.runLunchDetect();
            main.setClassesFromTerm(
                main.getTermForDate(new Date(main.year, main.month, main.day))
            );
            main.setupDone();

            main.setup.studentVue.lastLogin = new Date();
            
            /*
            for await (let i of [0, 1, 2]) {
                await fetch(api_url + "/get_schedule", {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "text/plain",
                    },
                    body: JSON.stringify({
                        username:
                            this.setup.studentVue
                                .username,
                        password:
                            this.setup.studentVue
                                .password,
                        term: i,
                    }),
                })
                    .then((res) => res.json())
                    .then((json) => {
                        this.trimesters["t" + (i + 1)].schedule = json.content.ClassLists; // undo this after i fix api

                        main.save();
                        console.log(
                            "schedule t" + i + ":"
                        );
                        console.log(json);
                    });
            }
            

            //},
            //                    
            //                );
            //            });
            //        
            //    });
            // .catch((err) => { console.log("Error: " + err) });
            */
        },
        setClassesFromTerm(term) {
            if (this.trimesters["t" + term].schedule.length === 0) {
                console.log("error getting classes for the term");
                return;
            }

            for (let classPD of this.trimesters["t" + term].schedule) {
                if (classPD.Period == 8) {
                    // advisory, add that here
                    this.rooms["padv"] = toTitleCase(classPD.RoomName);
                    this.teachers["padv"].name = toTitleCase(classPD.Teacher);
                    this.teachers["padv"].email =
                        classPD.TeacherEmail.toLowerCase();
                    continue;
                }
                if (classPD.Period == 3) {
                    this.setup.studentVue.lunchid = classPD.TeacherStaffGU;
                }
                this.classes["p" + classPD.Period] = toTitleCase(
                    classPD.CourseTitle
                );
                this.rooms["p" + classPD.Period] = toTitleCase(
                    classPD.RoomName
                );

                this.teachers["p" + classPD.Period].name = toTitleCase(
                    classPD.Teacher
                );
                this.teachers["p" + classPD.Period].email =
                    classPD.TeacherEmail.toLowerCase();
            }

            this.runLunchDetect();
            this.save();
        },
        updateLunch(teacherid) {
            if (teacherid in lunches) {
                this.lunch = lunches[teacherid].toString();
                return true;
            }
            return false;
        },
        runLunchDetect() {
            if (this.setup.studentVue.lunchid != "") {
                if (this.updateLunch(this.setup.studentVue.lunchid)) {
                    console.log("Lunch was detected sucessfully");
                    // this.setupDone();
                } else {
                    console.log("Lunch was not found! displaying prompt");
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
                var gamerpopup = new bootstrap.Modal(
                    document.getElementById("isthisyou"),
                    { backdrop: "static", keyboard: false, focus: true }
                );
                document.getElementById("gamerno").onclick = function () {
                    gamerpopup.hide();
                    reject();
                };
                document.getElementById("gameryes").onclick = function () {
                    gamerpopup.hide();
                    resolve();
                };
                gamerpopup.show();
            }); // please refactor i dont do promises
        },
        openClassModel(per) {
            if (
                per.p === "study" ||
                per.p === "lnc" ||
                per.p === "arr" ||
                per.p === "dism" ||
                per.p === "zero"
            )
                return;
            this.classModel = per;
            let starti = setInterval(() => {
                this.countdowns.cstart = this.doCountdown(
                    per.time.split(" - ")[0]
                );
            }, 1000);
            let endi = setInterval(() => {
                this.countdowns.cend = this.doCountdown(
                    per.time.split(" - ")[1]
                );
            }, 1000);
            this.countdowns.cstart = this.doCountdown(per.time.split(" - ")[0]);
            this.countdowns.cend = this.doCountdown(per.time.split(" - ")[1]);
            let classModel = new bootstrap.Modal(
                document.getElementById("classModel"),
                { backdrop: "static", keyboard: false, focus: true }
            );

            document.getElementById("classModelButtonOk").onclick = () => {
                clearInterval(starti);
                clearInterval(endi);
                classModel.hide();
            };

            classModel.show();
        },
        setupDone() {
            this.setup.init = false;
            this.save();
            this.resetSetup();
        },
        resetSetup() {
            this.setup.step = 1;
            this.setup.importMethod = "a";
            this.setup.loggingIn = false;
        },
        resetSite() {
            localStorage.removeItem("data");
            location.reload();
        },
        scheduleEventCheck() {
            // return an event, if any
            this.scheduleEvent = getEventFor(
                this.day,
                this.month,
                this.year,
                this.cohort
            );

            if (this.scheduleEvent === null) {
                return (this.schedule[this.cohort] = [
                    ...this.schedule[this.cohort + "_default"],
                ]);
            }
			if (this.scheduleEvent.schedule !== "normal") { 
				this.schedule[this.cohort][
					new Date(this.year, this.month, this.day).getDay()
				] = this.scheduleEvent.schedule;
			}
        },
        currentLookingAtDay() {
            return (
                this.month +
                1 +
                "/" +
                this.day +
                "/" +
                this.year +
                (compareDates(this.year, this.month, this.day) &&
                this.dayChanged
                    ? " - Today"
                    : "")
            );
        },
        daysInMonth(year, month) {
            return new Date(year, month, 0).getDate();
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
            this.dayChanged = true;

            if (this.daysInMonth(this.year, this.month + 1) < this.day) {
                this.day = 1;
                this.month++;

                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
            }

            if (this.day < 1) {
                this.month--;
                this.day = this.daysInMonth(this.year, this.month + 1);

                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
            }

            this.scheduleEventCheck();

            this.setClassesFromTerm(
                this.getTermForDate(new Date(this.year, this.month, main.day))
            );
        },
        showScheduleInfo() {
            // toggle the schedule info being shown and hidden
            
        }
    },
    computed: {
        isPWA: function () {
            return isPWA();
        },
        isInstalled: function () {
            return (
                localStorage.getItem("installed") !== null &&
                localStorage.getItem("installed") === "true"
            );
        },
        week: function () {
            return new Date(this.year, this.month, this.day).getDay();
        },
    },
}).mount("#main");

main.$.appContext.config.errorHandler = (err, vm, info) => {
    console.log(err + info);
};

if (
    main.setup.studentVue.rememberMe &&
    main.setup.studentVue.username !== "" &&
    main.setup.studentVue.password !== ""
) {
    let lastLoginTime = new Date(main.setup.studentVue.lastLogin);
    let now = new Date();

    // if the last login was more than a day ago, login again
    console.log(now.getTime() - lastLoginTime.getTime());
    // 1 hour: 3600000
    // 24 hours: 86400000
    if (now.getTime() - lastLoginTime.getTime() > 3600000) { // currently 1 hour
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
            main.day = new Date().getDate();
            main.month = new Date().getMonth();
            main.year = new Date().getFullYear();
            main.configMenuOpen = false;
            break;
    }
}

document.addEventListener("visibilitychange", visibilityListener);

function getPWADisplayMode() {
    const isStandalone = window.matchMedia(
        "(display-mode: standalone)"
    ).matches;
    if (document.referrer.startsWith("android-app://")) {
        return "twa";
    } else if (navigator.standalone || isStandalone) {
        return "standalone";
    }
    return "browser";
}

function isPWA() {
    return getPWADisplayMode() != "browser";
}
/*
var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
);

var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

var buttonInstall = document.getElementById("installbutton");
*/
window.addEventListener("load", function () {
    if (isPWA()) {
        localStorage.setItem("installed", true);
    }
});

function init_ServiceWorker() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
            navigator.serviceWorker
                .register("/schedule-personalizer/sw.js")
                .then(
                    function (registration) {
                        // Registration was successful
                        console.log(
                            "ServiceWorker registration successful with scope: ",
                            registration.scope
                        );
                    },
                    function (err) {
                        // registration failed :(
                        console.log("ServiceWorker registration failed: ", err);
                    }
                );
        });
    }
}

window.addEventListener("appinstalled", () => {
    // Hide the app-provided install promotion
    document.getElementById("howtomakeapp").style.display = "none";
    // Clear the deferredPrompt so it can be garbage collected
    localStorage.setItem("installed", "true");
    // Optionally, send analytics event to indicate successful install
    location.reload();
    console.log("PWA was installed");
});

init_ServiceWorker();
