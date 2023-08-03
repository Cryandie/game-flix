# Hello Hellooo! 😀

## Please note that this is my first React app!

- I learned React back in 2020 when I started coding and worked on a small side project, but I haven't used React since then.
- I have experience with Angular and Vue, which helped me create this project even without extensive knowledge of React. This means that there is always room for improvement, which is true for programming in general. 😁

## Good to know:

- Since I couldn't find the API link to use for this project, I used the [RAWG API](https://rawg.io/apidocs).
- The screenshots in the project instructions seem to use a dummy API, so using RAWG makes the app more realistic as it contains real data about games.
- I only used one external module, Material UI for icons (We are not counting react-router-dom right? 🤣).
- In the order section, I organized the data in ascending order to match the arrow icon.
- Each page contains 20 games, using the next button will display the 20 next games from the API. PLease note that we have much more than 100 games in total.
- Since I'm not very familiar with React, I'm not sure if this is the best way to organize the project structure. I'm open to feedback! (This applies to more than just the project structure 😳). This also concerns the folders & files 'casing', I am currently using PascalCase for React Components, and camelCase otherwise.
- If you are using a smartphone, Chrome is recommended for guaranteed responsiveness.

## Project Structure:

- The app (in the root `index.tsx` file) contains:

  - The header
  - The main content (which includes the Contact and Games components)
  - The footer

- The `components` folder contains four subfolders for each component:
  - The `Header` (`header.tsx` and `header.css`) is a navbar that contains our `NavLink` and route components. The `Contact` component is called from here.
  - The `Main` component contains the main content (yes, really! 😆). We have the filter logic for games in `GamesFilter`, and the fetch + sort + search logic in `GamesFetch`. Both of these are used in `Main/index.tsx`.
  - The `utility` folder contains a custom dropdown component for sorting data by order and UseDebounce that prevents the API from being called on every keystroke and reduce the number of requests sent to the server (Used in the NameFilter: Search).

### Thank you for your time! 😊
