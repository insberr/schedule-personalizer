# Schedule Personalizer v5

Complete rewrite of Schedule Personalizer, with new features!

Schedule Personalizer is a self hosted school schedule website/web app that displays the schedule for the current day. It is very customizable and will work with almost any school. If Schedule Personalizer isnt compatible with your schedule, please open an issue on GitHub, we would be glad to throw in support for it!

## Component locations

Components that are only used for one page should be put into `src/pages/<page>/components` while components used for multiple pages go into `src/components`

### Possible features to consider adding?

-   Site updates in the background when theres a new commit to the git repo
-   Allow storing config (or schedules and events) in a database and make it writeable from a UI ?
-   Multipe school config, so a school district can host one instance of schedule personalizer for all their schools
-   Lunches can be based on multiple periods (oh goodness thatll be complex as hell)
-   Support for other gradebook/student info sites other than StudentVue
-   Support for multiple schedules in a day for support of studdents who are in other during school programs like Cambridge and Running Start ??? (Working progress)
-   Customizable teacher and class name character case (upper, lower, title, regex, array of class abbreviations to be changed)?
-   add a “view full schedule mode” that shows the times for all lunches (Create issue for this and actually implement)
-   support for other languages, might be somewhat pointless because of google translate but might be a good idea still

### Setup

You will need

-   Yarn
-   Node.js

Install dependencies by running:

```bash
yarn
```

#### Config

Read `src/config/readme.md` for info about configuring Schedule Personalizer.

#### Build

```bash
yarn
yarn build
```

Files to be served are in `dist/`

#### dev run

```bash
yarn
yarn dev
```
