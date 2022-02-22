var canv;
var ctx;

var playerx = 300;
var playery = 50;

var speed = 50;

var direction = 'left'

var boxes = [[0,0],[50,0],[100,0],[200,50]]

var mousex;
var mousey;

function sload(){
  console.log('loaded')
  canv = document.getElementById("canvas")
  if (canv.getContext){
    ctx = canv.getContext('2d')
    animate()
  }
}

function animate(){
    ctx.clearRect(0,0,600,600)
    for (var i = 0; i<600; i+=50){
      for(var j = 0; j<600;j+=50){
        ctx.strokeRect(i,j,50,50)
      }
    }
  
    ctx.fillStyle = 'rgb(200,0,0)'
    ctx.clearRect(playerx,playery,50,50)
  
    var oldx = playerx
    var oldy = playery
  
    if (direction == 'left'){
      if (playerx - speed >= 0){
          playerx -= speed
      }
    }
    if (direction == 'down'){
      if (playery + speed <= 550){
          playery += speed
      }
    }
    if (direction == 'right'){
      if (playerx + speed <=550){
              playerx += speed
      }
    }
    if (direction == 'up'){
      if (playery - speed >= 0){
              playery -= speed
      }
    }
    direction = 'no'
  
    for (var i = 0; i< boxes.length; i+=1){
      ctx.fillStyle = 'rgb(0,0,0)'
      ctx.fillRect(boxes[i][0],boxes[i][1],50,50)
      
      if (boxes[i][0] == playerx && boxes[i][1] == playery){
        playerx = oldx
        playery = oldy
      }
    }
    ctx.fillStyle = 'rgb(200,0,0)'
    ctx.fillRect(playerx,playery,50,50)
  
  
    requestAnimationFrame(animate)
}

document.onkeydown = function(e){
  switch(e.key){
    case 's': 
      direction = 'down'
      break
    case 'w': 
      direction = 'up'
      break
    case 'a':
      direction = 'left'
      break
    case 'd':
      direction = 'right'
      break
    case 'r':
      boxes = []
      break
    case ' ':
      teleport()
    
  }
}
document.onmousemove = function(e){
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top;  //y position within the element.
      var pos = [Math.floor(x/50)*50,Math.floor(y/50)*50]
      mousex = pos[0]
      mousey = pos[1]
}

document.getElementById("canvas").onclick = function(e){
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left; //x position within the element.
      var y = e.clientY - rect.top;  //y position within the element.
      var pos = [Math.floor(x/50)*50,Math.floor(y/50)*50]
      
      var isin = false
      for (var i = 0; i<boxes.length;i+=1){
        console.log(pos)
        console.log(boxes[i])
        console.log(arraysEqual(pos,boxes[i]))
        if (arraysEqual(pos,boxes[i]) == true){
          
          isin = true
          console.log('it is in')
          boxes.splice(i,1)
        }
      }
      if (isin == false){
        boxes.push(pos)
      }

}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
function teleport(){
  var pos = [mousex,mousey]
  var isin = false
  for (var i = 0; i<boxes.length;i+=1){
    console.log(pos)
    console.log(boxes[i])
    console.log(arraysEqual(pos,boxes[i]))
    if (arraysEqual(pos,boxes[i]) == true){
      isin = true
    }
  }
  if (isin == false){
    playerx = mousex;
    playery = mousey
  }
}