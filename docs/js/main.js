"use strict";
class Captain extends HTMLElement {
    constructor(ship) {
        super();
        this.ship = ship;
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    update() {
        let x = this.ship.position.x + this.ship.clientWidth / 2;
        let y = this.ship.position.y;
        this.style.transform = `translate(${x}px, ${y}px) rotate(${0}deg)`;
    }
    onCollision(numberOfHits) {
        if (numberOfHits == 1) {
            this.style.backgroundImage = `url(images/emote_alert.png)`;
            console.log(`Captain of ${this.ship.color} pirateship WOKE UP!`);
            MessageBoard.getInstance().addMessage("De kapitein van schip " + this.ship.color + " is wakker geworden van een botsing.");
        }
        else if (numberOfHits == 7) {
            this.style.backgroundImage = `url(images/emote_faceAngry.png)`;
            console.log(`Captain of ${this.ship.color} pirateship got ANGRY!`);
            MessageBoard.getInstance().addMessage("De kapitein van schip " + this.ship.color + " is boos, want hij is te vaak gebotst.");
        }
    }
}
window.customElements.define("captain-component", Captain);
class Main {
    constructor() {
        this.ships = [];
        for (let i = 0; i < 10; i++) {
            this.ships.push(new PirateShip());
        }
        console.log("Piratenschepen aangemaakt!");
        this.gameLoop();
    }
    gameLoop() {
        for (const ship of this.ships) {
            ship.update();
            for (const otherShip of this.ships) {
                if (ship !== otherShip) {
                    if (ship.hasCollision(otherShip)) {
                        ship.hit = true;
                        break;
                    }
                    else {
                        ship.hit = false;
                    }
                }
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Main());
class MessageBoard extends HTMLElement {
    constructor() {
        super();
        this.messages = [];
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
    }
    static getInstance() {
        console.log("Ik kom in de getInstance method.");
        if (!MessageBoard.instance) {
            console.log("Er bestaat nog geen MessageBoard");
            MessageBoard.instance = new MessageBoard();
            console.log("A new messageboard was created.");
        }
        console.log("MessageBoard wordt teruggegeven.");
        return MessageBoard.instance;
    }
    addMessage(message) {
        this.messages.splice(0, 0);
        this.messages.push(message);
        this.updateMessages();
    }
    updateMessages() {
        this.innerHTML = "";
        for (const message of this.messages) {
            console.log("Message: " + message);
            let messageElement = document.createElement("message");
            messageElement.innerHTML = message;
            this.appendChild(messageElement);
        }
    }
}
window.customElements.define("messageboard-component", MessageBoard);
class Ship extends HTMLElement {
    constructor() {
        super();
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.counter = 60;
        this.colors = ["Green", "Blue", "Orange", "White", "Black", "Red"];
        this._color = "";
        this._position = new Vector(Math.random() * window.innerWidth - this.clientWidth, Math.random() * window.innerHeight - this.clientHeight);
        this.speed = new Vector(2, 4);
        this.rotation = 180;
        this.createShip();
    }
    get position() { return this._position; }
    get color() { return this._color; }
    createShip() {
        let game = document.getElementsByTagName("game")[0];
        game.appendChild(this);
        Ship.numberOfShips++;
        if (Ship.numberOfShips > 6)
            Ship.numberOfShips = 1;
        this.style.backgroundImage = `url(images/ship${Ship.numberOfShips + 3}.png)`;
        this._color = this.colors[Ship.numberOfShips - 1];
    }
    update() {
        this._position.x += Math.cos(this.degToRad(this.rotation)) * this.speed.x;
        this._position.y += Math.sin(this.degToRad(this.rotation)) * this.speed.y;
        this.turn();
        this.keepInWindow();
        this.draw();
    }
    turn() {
        this.counter++;
        if (this.counter > 60) {
            this.counter = 0;
            this.rotationSpeed = Math.round(Math.random() * 3);
            this.rotationSpeed *= Math.random() < 0.5 ? -1 : 1;
        }
        this.rotation += this.rotationSpeed;
    }
    keepInWindow() {
        if (this._position.x + this.clientWidth < 0)
            this._position.x = window.innerWidth;
        if (this._position.y + this.clientHeight < 0)
            this._position.y = window.innerHeight;
        if (this._position.x > window.innerWidth)
            this._position.x = 0;
        if (this._position.y > window.innerHeight)
            this._position.y = 0;
    }
    draw() {
        this.style.transform = `translate(${this._position.x}px, ${this._position.y}px) rotate(${this.rotation}deg)`;
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    hasCollision(ship) {
        return (ship._position.x < this._position.x + this.clientWidth &&
            ship._position.x + ship.clientWidth > this._position.x &&
            ship._position.y < this._position.y + this.clientHeight &&
            ship._position.y + ship.clientHeight > this._position.y);
    }
}
Ship.numberOfShips = 0;
class PirateShip extends Ship {
    constructor() {
        super();
        this.numberOfHits = 0;
        this._hit = false;
        this.previousHit = false;
        this.captain = new Captain(this);
    }
    set hit(value) { this._hit = value; }
    update() {
        this.checkCollision();
        this.captain.update();
        super.update();
    }
    checkCollision() {
        if (this._hit && !this.previousHit) {
            this.captain.onCollision(++this.numberOfHits);
            let times = this.numberOfHits == 1 ? "time" : "times";
            console.log(`${this.color} pirateship got hit ${this.numberOfHits} ${times}!`);
            MessageBoard.getInstance().addMessage("Schip " + this.color + " is al " + this.numberOfHits + " keer gebotst!");
        }
        this.previousHit = this._hit;
    }
}
window.customElements.define("ship-component", PirateShip);
class Vector {
    constructor(x, y) {
        this._x = 0;
        this._y = 0;
        this._x = x;
        this._y = y;
    }
    get x() { return this._x; }
    set x(value) { this._x = value; }
    get y() { return this._y; }
    set y(value) { this._y = value; }
}
//# sourceMappingURL=main.js.map