window.onload = function() {
  //Background_________________________________________________

  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  //Make the canvas occupy the full page
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  var gradient = ctx.createRadialGradient(W/2,H/2,200,W/2,H/2,30);
  //Utilits
  function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
  }
  
  function randomWord() {
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
}
  
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Lets create some particles now
  var particles = [];
  var particle_count = 100;
  //canvas.addEventListener('mousedown', run_effect, false);
  //canvas.addEventListener('touch', run_effect, false);

  function run_effect() {
	  particles = [];

    for (var i = 0; i < particle_count; i++) {
      particles.push(new particle());
    }
  }

  function particle() {
    //speed, life, location, life, colors
    //speed range = -2.5 to 2.5
    this.speed = {
      x: -2.5 + Math.random() * 5,
      y: -2.5 + Math.random() * 5
    };
    //location = center of the screen
    this.location = {
      x: W / 2,
      y: H / 2
    };
	
    this.color = randomColor();

    this.font = {
      size: randomInt(3, 10)
    };
    
    this.word = randomWord();
  }

  function draw() {
    ctx.globalCompositeOperation = "source-over";
    //Painting the canvas gradient
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "blue");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.font = p.font.size + "vh Lobster";
      ctx.textAlign = "center";
      ctx.transition = "all 2s ease";
      ctx.fillStyle = p.color;
      ctx.fillText(p.word, p.location.x, p.location.y);
      ctx.fill();
      ctx.stroke();

      //lets move the particles
      p.location.x += p.speed.x;
      p.location.y += p.speed.y;
      
      p.speed.x += randomInt(-0.01, 0.01);
      p.speed.y += randomInt(-0.01, 0.01);
      
      // Make 'em big and small
      // Warning: Causes extreme lag
      //p.font.size += randomInt(-0.1, 0.1)
    }
  }
  setInterval(draw, 10);

  //Magic Ball__________________________________________________
  $("#8ball-hole").hide();
  $("#8ball, #8ball-hole").click(function() {
    $("#8ball-hole").hide();
    run_effect();
    $("#8ball").effect( "shake", {times:5} );
    $("#8ball-hole").show(2000);
  });
       
};

// Big Word Array
words = [ "Можливо", "Думаю що так", "Так", "Не можу сказати", "Думаю що ні", "Смутно", "Точно ні", "Дуже ймовірно", "Точно так", "Запитайте знову", "Шанси хороші", "Духи говорять ні", "Шансів мало", "Ні", "Запитайте пізніше", "Незрозуміло", "Духи говорять так", "Без сумнівів", "Є сумніви", "Не зараз"];
