# https://rocky-forest-72279.herokuapp.com/

This gem is a Rails + Vue JS (frontend) Project that accepts the necessary form fields and sends emails. 
It uses an abstraction provided by email-delivery gem to send e-mails.

This README would normally document whatever steps are necessary to get the application up and running. 

* Ruby version
    2.3.3

* Rails version
    5.1.4

* System dependencies
    Node
    Yarn
    Webpack

* Configuration
    bundle install
    yarn install

* Database creation
    bundle exec rake db:create
    
* Database initialization
    bundle exec rake db:migrate

* How to run the test suite

    Rails Specs:
    bundle exec rspec spec/
    
    JS Specs:
    Reference: https://github.com/rails/webpacker/issues/574 (To setup Vue component testing)
    cd test (From project directory)
    yarn test


* Deployment instructions

    git add .
    git commit -m "Your commit comment"
    git push heroku master

* ...

* Folder structure
    app
      api (API code)
      controllers (Routing controller actions)
      javascript (Vue JS front-end compoentns)
    spec
      Rails specs
    test
      JS specs

### Javascript Testing tools

    Mocha, Chai, and Avoriaz
    

#### A note on testing client-side code reloading in development env.

    All routes (except API routes) on the application are redirected to root path.
    Root page is exposed with 'From', 'To', 'cc', 'Bcc' , 'Subject', 'Body' form fields.
    When the form is submitted main.vue components 'validateForm' function validates the
    form fields and then triggers the API to send an email to the entries in
    'To','cc' and 'Bcc' list.



## Notes on the relationship b/w models

    No Active record tables on the application atm.

## Notes on API
    
    Application uses Grape gem to build apis. Two apis are exposed 
       
       ## ping API to check if API is online
       ## compose API which take from, to, cc, bcc, subject and body to send emails
       
       ## API Usage
       
       POST http://127.0.0.1:3000/api/v1.0.0/compose  (Dev)
       POST https://rocky-forest-72279.herokuapp.com/api/v1.0.0/compose (Prod)
       BODY
               from:stalin.pranava@gmail.com
               to:love4059@gmail.com
               cc:love4059@gmail.com
               bcc:love4059@gmail.com
               subject:Hey Test
               body:Hey Test again
       