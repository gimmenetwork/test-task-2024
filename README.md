PAGES:
/ - the page that initially opens for user authorization.

/registr - registration page, from where all information goes to the Supabase database. After confirmation of the mailbox, the account can be used

/MainPage - the main page that shows steps for adding books and further actions with them

/listofbooks - a page where you can see all the books added by the user. If desired, books can be filtered for quick search. By clicking on any selected book, you can go to a page where you can see all the information on the specifically selected book

/books/[id]?id=[id] - page of a specific selected book, where the user can see the available data, also change it and save it. If the number of pages read equals the book size, the user can leave a review and rate the book. Also, if the number of pages read that the user wants to indicate is greater than the size of the book, then he will see an error.

/readbooks - a page on which the user can see a list of all books read. Without going to the selected book, the client can share his review on the X platform (formerly Twitter).

/addnewbook - On the page you can add a book to the database by specifying the book title, genre and number of pages


FEATURES:
On pages, in the top menu section, you can change the language, which will remain even if the page is reloaded, i18ln library used.
By clicking on the button in the “My Account” menu section, the user can select 2 options: All books or Read books.
