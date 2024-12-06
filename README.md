# Backend

### To run

```
cd server
npm install
npm run dev \\ run development server
npm start   \\ run prod server
```

### Working with branches

Create a branch in the git repo

```
git fetch
git checkout [branch-name]
```

Execute changes in your branch. When its time to merge:

```
git add .
git commit -m "Commit message"
git checkout main
git pull origin main
git checkout [branch-name]
git rebase main
git push --force
```

# Frontend

### To run

```
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Install Typescript

1. Run
   `npm install --save typescript @types/node @types/react @types/react-dom @types/jest`
2. Change index.js and App.js to \*.tsx
3. In index.tsx, replace `createRoot(container)` with `createRoot(container!)`
