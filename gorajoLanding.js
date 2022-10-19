const express = require('express') // IMPORT express
const app = express() // create an instance of the import.
const port = 4000 // variable to store the port to listen on

let options = {
};

app.use(express.static("public", options));

app.get('/', (req, res) => {
	let html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="outline&background.css">
    <title>Gorajo - Discord Game Bot</title>
  </head>
  <body>
  
  <div class="col">
	  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">Gorajo Games</a> 
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Blackjack</a>
      </li>
	  <li class="nav-item">
        <a class="nav-link" href="#">Dice</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Scramble</a>
	  </li>
	  <li class="nav-item">
        <a class="nav-link" href="#">More to come!</a>
	  </li>
    </ul>
  </div>
</nav>

		
		<div
  class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
  style="background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F576%2F161%2Foriginal%2Fwhite-and-gray-color-polygon-abstract-vector-background.jpg&f=1&nofb=1&ipt=2925942bc8ea7310529217e433ec5557e57c6cc554cd74d985a976bd5bdda906&ipo=images');
  height: 100vh"
>
  <h1 class="mb-3 h2">Gorajo - Discord Game Bot</h1>

  <p>
    Gorajo is a discord bot that will allow users in a discord server to play games via commands in a chat room. 
	  Users can play games such as Scramble, Blackjack, Dice, and more! From this page, you can access other game pages to
	  view player statistics per game to see how you stack up against other players.
  </p>
</div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

  </body>
</html>`;
res.send(html);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) // make app listen on the port.