document.addEventListener( 'mousemove', onDocumentMouseMove, false );
var numPawns = 16;
var numPieces = 4;
var numQueens = 2;
var numKings = 2;

var firstTween, secondTween, thirdTween, fouthTween, fifthTween;
var numParts = 4; //number of different Pieces
var start = 0;
var ready = 0;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var loader = new THREE.OBJLoader();

var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('theCanvas'), antialias: true});
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRation);
renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, windowHalfX / windowHalfY, 1, 10000);
camera.position.z = 1000;
camera.updateProjectionMatrix();

var scene  = new THREE.Scene();

var light = new THREE.AmbientLight( 0xffffff, 0.4 ); // soft white light
scene.add( light );

var spotLight = new THREE.SpotLight( 0xffffff, 1 );
spotLight.position.set(0, 0, 0);
scene.add(spotLight);

//setups function
//

setupTween();
loadPieces();


materialWhite = new THREE.MeshPhongMaterial( { color: 0xffffff } ); 
materialBlack = new THREE.MeshPhongMaterial( { color: 0x201f1f}, {shininess : 45 } ); 

var countPawns = 0;
var countBishops = 0;
var countQueens = 0;
var countKings = 0;
var objLoader;
var object;
var test;
var whitePawns = [];
var blackPawns = [];
var blackBishops = [];
var whiteBishops = [];
var whiteQueen;
var blackQueen;
var whiteKing;
var blackKing;

function loadPieces(){
   for(var i = 0; i < numPawns/2; i = i + 1){
      objLoader = new THREE.OBJLoader();
      objLoader.setPath( 'chess_obj/' );
      objLoader.load( 'peon.obj', function ( object ) {
         countPawns++;
         object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

               child.material = materialWhite;

            }

         } );
         whitePawns.push(object);
         if(countPawns == numPawns){
            addPawns();
         }
      });
   }

   for(var i = 0; i < numPawns/2; i = i + 1){
      objLoader = new THREE.OBJLoader();
      objLoader.setPath( 'chess_obj/' );
      objLoader.load( 'peon.obj', function ( object ) {
         countPawns++;

         object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

               child.material = materialBlack;

            }

         } );

         blackPawns.push(object);
         if(countPawns == numPawns){
            addPawns();
         }
      });
   }

   for(var i = 0; i < numPieces/2; i = i + 1){
      objLoader = new THREE.OBJLoader();
      objLoader.setPath( 'chess_obj/' );
      objLoader.load( 'bishop2.obj', function ( object ) {
         countBishops++;

         object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

               child.material = materialWhite;

            }

         } );

         whiteBishops.push(object);
         if(countBishops == numPieces){
            addBishops();
         }
      });
   }
   for(var i = 0; i < numPieces/2; i = i + 1){
      objLoader = new THREE.OBJLoader();
      objLoader.setPath( 'chess_obj/' );
      objLoader.load( 'bishop2.obj', function ( object ) {
         countBishops++;

         object.traverse( function ( child ) {

            if ( child instanceof THREE.Mesh ) {

               child.material = materialBlack;

            }

         } );

         blackBishops.push(object);
         if(countBishops == numPieces){
            addBishops();
         }
      });
   }
   objLoader = new THREE.OBJLoader();
   objLoader.setPath( 'chess_obj/' );
   objLoader.load( 'Creature.obj', function ( object ) {
      countKings++;

      object.traverse( function ( child ) {

         if ( child instanceof THREE.Mesh ) {

            child.material = materialWhite;

         }

      } );

      whiteKing = object;;
      if(countKings == numKings){
         addKings();
      }
   });

   objLoader = new THREE.OBJLoader();
   objLoader.setPath( 'chess_obj/' );
   objLoader.load( 'Creature.obj', function ( object ) {
      countKings++;

      object.traverse( function ( child ) {

         if ( child instanceof THREE.Mesh ) {

            child.material = materialBlack;

         }

      } );

      blackKing = object;
      if(countKings == numKings){
         addKings();
      }
   });

   objLoader = new THREE.OBJLoader();
   objLoader.setPath( 'chess_obj/' );
   objLoader.load( 'stauntonqueen.obj', function ( object ) {
      countQueens++;

      object.traverse( function ( child ) {

         if ( child instanceof THREE.Mesh ) {

            child.material = materialWhite;

         }

      } );

      whiteQueen = object;
      if(countQueens == numQueens){
         addQueens();
      }
   });

   objLoader = new THREE.OBJLoader();
   objLoader.setPath( 'chess_obj/' );
   objLoader.load( 'stauntonqueen.obj', function ( object ) {
      countQueens++;

      object.traverse( function ( child ) {

         if ( child instanceof THREE.Mesh ) {

            child.material = materialBlack;

         }

      } );

      blackQueen = object;
      console.log(whiteQueen);
      if(countQueens == numQueens){
         addQueens();
      }
   });
}

function addPawns(){
   for(var i = 0; i < numPawns/2; i++){
      whitePawns[i].position.y = -30;
      whitePawns[i].position.x = 130;
      whitePawns[i].position.z = -340 + 99 * i;
      whitePawns[i].scale.set(0.8,0.8,0.8);
      scene.add(whitePawns[i]);
   }
   for(var i = 0; i < numPawns/2; i++){
      blackPawns[i].position.y = -30;
      blackPawns[i].position.x = -380;
      blackPawns[i].position.z = -340 + 99 * i;
      blackPawns[i].scale.set(0.8,0.8,0.8);
      scene.add(blackPawns[i]);
   }
   firstTween.onUpdate(function(){
      whitePawns[2].position.x = currentFirst.x;
   });
   secondTween.onUpdate(function(){
      blackPawns[3].position.x = currentSecond.x;
   });
   thirdTween.onUpdate(function(){
      whitePawns[1].position.x = currentThird.x;
   });
   ready += 1;
}

function addBishops(){
   for(var i = 0; i < numPieces/2; i++){
      whiteBishops[i].position.y = -100;
      whiteBishops[i].position.x = 345;
      whiteBishops[i].position.z = -135 + 100 * 3 * i;
      whiteBishops[i].scale.set(25.0,25.0,25.0);

      scene.add(whiteBishops[i]);
   }
   for(var i = 0; i < numPieces/2; i++){
      blackBishops[i].position.y = -100;
      blackBishops[i].position.x = -345;
      blackBishops[i].position.z = -135 + 100 * 3 *i;
      blackBishops[i].scale.set(25.0,25.0,25.0);
      scene.add(blackBishops[i]);
   }
   ready += 1;
}

function addKings(){
   whiteKing.position.y = -53;
   whiteKing.position.x = 345;
   whiteKing.position.z = -45;
   whiteKing.scale.set(4.3,4.3,4.3);
   whiteKing.rotateX(4.7);

   scene.add(whiteKing);

   blackKing.position.y = -53;
   blackKing.position.x = -345;
   blackKing.position.z = -45;
   blackKing.scale.set(4.3,4.3,4.3);
   blackKing.rotateX(4.7);
   scene.add(blackKing);
   fifthTween.onUpdate(function(){
      whiteKing.position.y = currentFifth.y;
      whiteKing.rotateY(currentFifth.degree);
   });

   ready += 1;
}

function addQueens(){
   whiteQueen.position.y = -98;
   whiteQueen.position.x = 345;
   whiteQueen.position.z = 55;
   whiteQueen.scale.set(0.3,0.3,0.3);

   console.log(whiteQueen);
   scene.add(whiteQueen);

   blackQueen.position.y = -98;
   blackQueen.position.x = -345;
   blackQueen.position.z = 55;
   blackQueen.scale.set(0.3,0.3,0.3);

   scene.add(blackQueen);
   fourthTween.onUpdate(function(){
      blackQueen.position.x = currentFourth.x;
      blackQueen.position.z = currentFourth.z;
   });

   ready += 1;
}

var loader = new THREE.TextureLoader();

// load a resource
var loader = new THREE.TextureLoader();
loader.load( 'chess_obj/Chess.jpg', function ( texture ) {
   var geoFloor = new THREE.BoxGeometry(800,1,800);
   var matFloor  = new THREE.MeshBasicMaterial( { map: texture} );
   var meshFloor = new THREE.Mesh(geoFloor, matFloor);
   meshFloor.position.set( 0, -100, 0 );
   scene.add( meshFloor );
} );





requestAnimationFrame(render);


function render() {
   spotLight.position.set( 0, 500, 0 );
   spotLight.castShadow = true;
   // spotLight.angle = Math.PI / 4;
   spotLight.penumbra = 0.05;
   // spotLight.decay = 2;
   // spotLight.distance = 10;
   // spotLight.shadow.mapSize.width = 1024;
   // spotLight.shadow.mapSize.height = 1024;
   // spotLight.shadow.camera.near = 1;
   // spotLight.shadow.camera.far = 200;

   renderer.autoClear = true;
   renderer.render(scene, camera);
   camera.position.x += ( mouseX - camera.position.x ) * .05;
   camera.position.y += ( - mouseY - camera.position.y ) * .05;
   // camera.position.x = 500;
   // camera.position.y = 1000;
   if(ready == numParts && start == 0){
      firstTween.start();
      start = 1;
   }
   if(ready == numParts){
      TWEEN.update();
   }
   camera.lookAt( scene.position );
   requestAnimationFrame(render);
}

function onDocumentMouseMove(event) {

   mouseX = ( event.clientX - windowHalfX ) * 10;
   mouseY = ( event.clientY - windowHalfY ) * 10;

}

function setupTween(){
   currentFirst = {x:100};
   firstTween = new TWEEN.Tween(currentFirst).to({x: 30}, 1000);

   currentSecond = {x:-400};
   secondTween = new TWEEN.Tween(currentSecond).to({x: -170}, 1000);

   currentThird = {x:100};
   thirdTween = new TWEEN.Tween(currentThird).to({x: -80}, 1000);
   
   currentFourth = {x: -345, z: 55};
   fourthTween = new TWEEN.Tween(currentFourth).to({x: 50, z: -340}, 1000);

   currentFifth = { degree: 0, y: -53};
   fifthTween = new TWEEN.Tween(currentFifth).to({degree: 0.04, y: -73}, 2000);

   firstTween.chain(secondTween);
   secondTween.chain(thirdTween);
   thirdTween.chain(fourthTween);
   fourthTween.chain(fifthTween);


}
