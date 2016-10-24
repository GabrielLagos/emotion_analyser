# Emotional Analysis for Shakespeare's Henry IV 

This application allows a user to go through Shakespeare's play, Henry IV one line at a time and see the emotional
content of that line. It uses the Alchemy Emotions API to perform the analysis in real time. **Unfortunately the API service
was extremely problematic and keeps throwing errors saying "daily-transaction-limit-exceeded"** 

Although very frustrating, I decided to add some code that basically faked the values that I would have received from the server 
and only if the server threw the above error.

> To get up and running quickly, I used the [**React Static Boilerplate**](https://github.com/kriasoft/react-static-boilerplate) (RSB). The RSB is an
> opinionated boilerplate and tooling for creating modern stand-alone web applications (aka
> [SPA](https://en.wikipedia.org/wiki/Single-page_application)s) for a serverless architecture.

To see the application in action, have a look at the demo: 
[Demo](http://babeljs.io/docs/learn-es2015/)

### Features

&nbsp; &nbsp; ✓ The program uses React manage the views, Redux to manage application state, and Sagas to handle asynchronous operations (in this case it was calling the Alchemy API)<br>
&nbsp; &nbsp; ✓ ES6+/Babel/Webpack was used throughout - I even through in a few async/await calls as well as generators in my sagas! <br>
&nbsp; &nbsp; ✓ I used mocha/chai to test my redux state and enzyme/chai to test my components. These can be found in the test directory. **Note that testing is not comprehensive**<br>


**Following is the directory layout. I've indicated where my code lives so you can save time looking all over the place!**

### Directory Layout

```shell
.
├── /components/                # Shared or generic UI components
│   ├── /play.json          # <-- THE ENTIRE PLAY
│   └── /play-reducer.js    # <-- REDUCER/ACTIONS TO HANDLE ACCESS TO THE PLAY
├── /components/                # Shared or generic UI components
│   ├── /Button/                # Button component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used insted of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js           # <-- Application state manager (Redux/Sagas)
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/              # <-- EVERTHING UNDER IS MINE.
│   └── /services           # <-- ALCHEMY ACCESS SERVICES
|       └── /alchemyApi.js # <--- METHOD TO FETCH DATA FROM ALCHEMY
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /reducers/              # REDUCERS FOR VARIOUS STATE VARIABLES
|   └── /emotion-reducer.js # <--- METHOD TO FETCH DATA FROM ALCHEMY
├── /test/                  # <--- A few Unit and integration tests
├── /utils/                     # Utility and helper classes
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── routes.json                 # This list of application routes
│── run.js                      # Build automation script, e.g. `node run build`
└── webpack.config.js           # Bundling and optimization settings for Webpack
```


### Getting Started

**Step 1**. Make sure that you have [Node.js](https://nodejs.org/) v6 or newer installed on your
machine.

**Step 2**. Install all dependencies

```shell
$ npm install                   # Install project dependencies listed in package.json
```

**Step 3**. Compile and launch your app by running:

```shell
$ node run                      # Same as `npm start` or `node run start`
```

You can also test your app in release (production) mode by running `node run start --release` or
with HMR and React Hot Loader disabled by running `node run start --no-hmr`. The app should become
available at [http://localhost:3000/](http://localhost:3000/).


### License

Copyright © 2015-present Kriasoft, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/kriasoft/react-static-boilerplate/blob/master/LICENSE.txt) file.

---
Made with ♥ by Gabriel Lagos
