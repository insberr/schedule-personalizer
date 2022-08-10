# Schedule Personalizer V2
Complete rewrite of schedule personalizer, with new features!

## Component locations
Components that are only used for one page should be put into `src/pages/<page>/components` while components used for multiple pages go into src/components

### To do (Read the project on the repo)
- Cloudflare site analytics
- the ability for users to customize the colors
- a button on each class that brings up the more info pop up
- better setup process
- the current class period is highlighted a different color or something
- better way of handling time events
- neater data structure
- lunches should be customizable in case they change the period lunch is based on 🙄
- add display of zero hour class info if a person has a zero hour class
- add support for cambridge schedules ????
- each teacher name is a variable with the id thingy as the value
- obviously better time and day handling
- add a “view full schedule mode” that shows the times for all lunches
- the ability to have any amount of lunches and not just 3. Because who knows if they will make 4 lunches next year

### dev run
```
yarn
yarn dev
```