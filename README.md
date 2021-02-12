# Trello Clone
This project uses react, express.js and mysql. To run the project locally, create an env file and add the following items to it:   
      
   ``DB_USER=[YOUR_USER_NAME]  
     DB_PASSWORD=[YOUR_PASSWORD]
     DB_NAME=[YOUR_DB_NAME]
   ``   
   make sure to create the tasks table in your mysql ddatabase and that mysql is up and running.   
   After installing the dependencies you can run the project in dev mode via `npm run dev`.   
   
   Unfortunately I didn't have time to finish the API calls. If I had more time I would have taken care of the following:
   1. Handling the API calls properly,
   2. using `Redux` for state management. Every single place that a component is updating its parent, should have been handled via `Redux`. The main reason I couldn't implement moving cards was that state management has been handled poorly.
   3. using a css famework like `tailwind` for better UI
   4. implement basic user authentication.

   
   


