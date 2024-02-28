# Coding Challenge

### Available Scripts

- In the project directory, you can run:

  ```
  npm start
  ```

  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

- Run the backend `json-server` to have the data available for the app:

  ```
  npm run backend
  ```

  Runs the server file in the development mode.\
  See [http://localhost:5000/user](http://localhost:5000/user) to view user data.\
  See [http://localhost:5000/books](http://localhost:5000/books) to view books data.

  > **_NOTE:_** `.env` file is included in this repo since it only contains the url for the backend

- Running unit-tests:

  ```
  npm test
  ```

  Launches the test runner in the interactive watch mode.\
  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> **_NOTE:_** Project images are taken from [Unsplash](https://unsplash.com/) under Unsplash terms of use.

---

# Developer test task

### Instructions

When working on the task, please fork this repository. When finished with the task please open a PR.
You are free to use any framework, tool, library as long as using it satisfies two conditions:

1. Using such tool is in compliance with its licence
2. Underlying technology is relevant to the job requirements listed, i.e. solutions using java/c++/asm/etc won't be considered. We do (primarily) PHP and JS, we expect it from you too. _We don't expect PHP knowledge from a Frontend Developer, but you'll get bonus points for knowing any 'backend' language_

Spend as much effort as you see fit on the task. We don't expect you to provide e2e-tested, WCAG-compliant, PWA-ready, containerized multi-threaded solution, but tests and thought-through UI will get you bonus points for sure.
There will be a code review upon completion, where you will have a chance to present your solution and ask/answer questions.

This is a non-paid test, therefore you're not expected to put crazy hours into solving it. You shouldn't spend more than a couple of hours spanned across 3 days, but please do communicate if you need more time.
Although task is not mandatory, you are encouraged to complete it as **it will** make it easier to integrate you into the team, should we proceed with you.

### Task details

We'll be creating a book club-like service, where authenticated user can add a book they're reading (incl. genre and a size in pages), and add a series of data in form of "Today I read N pages of X".
User's profile should display info about current progress, and a history of read books.
Upon completion of the book user should be able to rate the book, leave a review and share the review in social media.

## TL;DR

Your solution should do these things:

1. Allow user to register
2. Allow registered user to log in
3. Allow registered user to add books to their library 4. Book should have a title, genre and page count
4. Allow registered user to add reading progress information
5. Allow user to leave a review, when user adds last progress update

You are encouraged to use VueJS for the frontend part. FE role candidates don't **need** to build a full backend, but will get bonus points for using state management libs such as [pinia](https://pinia.vuejs.org/) and tools like [idb](https://www.npmjs.com/package/idb) or [json-server](https://www.npmjs.com/package/json-server)

More bonus points are given for:

1. Good UI and UX
2. Accessibility
3. Aggregation and analytics based on user's data e.g. "2023 these are your 5 top-rated books", or "This month you've read 750 pages with most pages read on Tuesday each week".
4. Tests
5. Using current industry-standard-tools properly.
6. Good documentation
