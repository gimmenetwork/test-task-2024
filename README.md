# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-   [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

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
