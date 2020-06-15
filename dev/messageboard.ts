class MessageBoard extends HTMLElement {
    private static instance:MessageBoard
    private messages:string[] = []

    constructor() {
        super()

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this)
    }

    public static getInstance():MessageBoard {
        console.log("Ik kom in de getInstance method.")
        if(!MessageBoard.instance) {
            console.log("Er bestaat nog geen MessageBoard")
            MessageBoard.instance = new MessageBoard()
            console.log("A new messageboard was created.")
        }
        console.log("MessageBoard wordt teruggegeven.")
        return MessageBoard.instance
    }

    public addMessage(message:string) {
        this.messages.splice(0, 0)
        this.messages.push(message)
        this.updateMessages()
    }

    private updateMessages() {
        this.innerHTML = ""
        for(const message of this.messages) {
            console.log("Message: " + message)
            let messageElement = document.createElement("message")
            messageElement.innerHTML = message
            this.appendChild(messageElement)
        }
    }
}

window.customElements.define("messageboard-component", MessageBoard)