document.addEventListener("keypress", startGame);

function startGame() {
  document.removeEventListener("keypress", startGame);

  $(".level").text("1");
  $(".index").text("0");
  var seq = [];
  var response;
  console.log(seq);

  seq.push(Math.floor(Math.random() * 4) + 1);
  levelAnimate(seq);



  $(".btn").click(function() {

    level = $(".level").text();
    index = $(".index").text();
    var buttonPressed = this.id;

    if (buttonPressed == "green") {
      checkPress(1, index, seq);
      animate(buttonPressed);
    }
    if (buttonPressed == "red") {
      checkPress(2, index, seq);
      animate(buttonPressed);
    }
    if (buttonPressed == "yellow") {
      checkPress(3, index, seq);
      animate(buttonPressed);
    }
    if (buttonPressed == "blue") {
      checkPress(4, index, seq);
      animate(buttonPressed);
    }

  });

  function checkPress(response, index, seq) {
    level = $(".level").text();
    console.log(level);
    if (response == seq[index]) {
      index++;
      if (index < seq.length) {
        $(".index").text(index);
      } else {
        levelComplete(level);
        seq.push(Math.floor(Math.random() * 4 + 1));
        levelAnimate(seq);
      }
    } else {
      gameOver(level);
    }
  }

  function animate(button_id) {
    var audio = new Audio("sounds/"+button_id+".mp3");
    audio.play();
    $("." + button_id).addClass("pressed");
    setTimeout(function() {
      $("." + button_id).removeClass("pressed");
    }, 100);
  }

  function levelComplete(level) {
    $("h1").text("You cleared level " + level);

    $("body").addClass("level-cleared");
    setTimeout(function() {
      $("body").removeClass("level-cleared");
    }, 100);

    level++;
    $(".level").text(level);
    $(".index").text("0");
  }

  function gameOver(level) {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("h1").text("Game Over, Press any key to restart");
    document.addEventListener("keypress", function(){
      location.reload();
    });
    document.addEventListener("mousedown", function(){
      location.reload();
    });
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
  }

  function levelAnimate(seq) {
    setTimeout(function() {

        var value = seq[seq.length - 1];
        console.log(value);
        switch (value) {
          case 1:
            animate("green");
            break;
          case 2:
            animate("red");
            break;
          case 3:
            animate("yellow");
            break;
          case 4:
            animate("blue");
            break;
        }
      }, 500);
    }
  }
