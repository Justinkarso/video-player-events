# Video player timed events

![Screenshot](https://i.imgur.com/dcWuWav.jpg)

## Installation

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev` to start the dev server

**Run the project in production mode**

4. Go to App.tsx change the useFetch datasource to
   1. https://gist.githubusercontent.com/Justinkarso/c3bb57f004e94e5644374ff3d01268c4/raw/6520b9cd6ff629718122d14c83417eb87d13364e/gistfile1.txt
5. Run `npm run build` to build the project
6. Open `dist` rightclick `index.html` and select `Open with Live Server`

**Test the project**

6. Run `npm run test` to run the tests

### Note

> If you are getting an error "Something went wrong" screen please try to change the data source in App.tsx.

## Technical Requirements

- [x] Use React
- [x] State management (Jotai)
- [x] TypeScript
- [x] SCSS
- [x] Webpack
- [x] Modular Code / Components
- [x] Async data fetch
- [x] Video element, no library
- [x] Jest testing
- [x] Git
- [x] Readme

## Functionality

**Core functionality**

- [x] Event popups
- [x] Stackable events
- [x] Timeline event stamps
- [x] Reset to start

**Additional functionality**

- [x] Play/Pause
- [x] Keyboard shortcuts
- [x] Fullscreen
- [x] Volume control
- [x] Scrubbing

## Notes

- I used Jotai for state management, which is a new library that I wanted to try out. It's similar to Recoil, but with a smaller footprint.

## Improvements

- Add more tests (currently only testing 1 test checking the element structure)
- Add better styling
- Add more functionality (e.g. skip to next event)
- Clean up code
- Add more comments
- Add more documentation
- Generate static assets

## Difficulties

- Video player element with timed events is not something I've done before, so I had to do some research on how to implement it.
