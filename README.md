# Checkout

A checkout system where there are four products available, each with a price per unit. Some products have a special price when bought in certain quantities e.g. 3 of product A costs 140 not 150. The items can be "scanned" via their ItemCode which adds them to the basket and it returns the basket or the subtotal when queried. Items can also be removed if no longer needed.

## Getting Started

I have followed TDD (Test Driven Development) best practises when completing the kata.

### Prerequisites

This application uses Node v8.9.4 (Stable). To verify you have each installed you will need to open a terminal window and run the following commands

```
$ which node
```

If the command does not return a file path you will need to follow the instructions below:

* [Node (and npm)](https://docs.npmjs.com/getting-started/installing-node)

### Installing

After verifying you have Node.js installed you can run the test suite as follows:

1. Open a terminal instance.
2. Clone this repository from GitHub by running `git clone https://github.com/kat1906/checkout` in the terminal.
3. Add dependencies by typing `npm install` in the terminal.

## Running the tests

Run the tests by typing `npm test` in the terminal.

### What is tested

Each of the methods, with both successful and unsuccessful requests (where applicable).

## Built With

* [NodeJS](https://nodejs.org/en/) - JavaScript runtime