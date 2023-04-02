<h1 align="center">🌱 Sink & Seed 🌱</h1>
<h3 align="center"> Plant E-Commerce site </h3>

<h2> Links: </h2>
<li> https://s-secommerce-production.up.railway.app/#/ </li>
<li> To utilize the Stripe API, please refer to the following doc: https://stripe.com/docs/testing </li>
<h4> *Note: This e-commerce web app is purely for testing and developmental purposes </h4>

<h2> Technologies </h2>
<li> Node.js </li>
<li> React, Redux, Webpack </li>
<li> Express </li>
<li> PostgreSQL </li>
<li> Sequelize ORM </li>
<li> JSON Web Token, Bcrypt </li>
<li> Mocha </li>
<li> Chai </li>
<li> Stripe API </li> 
  
<h2>Local install: </h2>
<li> Node </li>
<li> Local PostreSQL database </li>

<h2>To run locally:</h2>
<li> Fork and clone this repo </li>

```
git i -y
```
_________________________
```
npm i
```
_________________________
```
npm run start:dev
```
_________________________

Create .env file and add: 
<li> JWT_SECRET=customPassword</li>
<li> JWT_EXPIRATION_TIME=timeFrame</li>
<li> STRIPE_SECRET </li>

**For your STRIPE_SECRET, please review [Stripe documentation](https://stripe.com/docs/keys#:~:text=Stripe%20APIs%20use%20your%20secret,key%20and%20save%20the%20value.)

<h2>To test deployed app:</h6>
<li> Create account in app or use example: </li>

```
Example Account info: 
   Username: ethyl
   Password: 123 
```
