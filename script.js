const hostname = location.hostname
const hostedHostname = "michael-levitski.github.io"
const swPath = hostname === hostedHostname ? "/mongodbcloud/sw.js" : "/sw.js"
const button = document.createElement("a")
const defaultUrl = "https://cloud.mongodb.com/"

let deferredPrompt

if ("serviceWorker" in navigator) {
    button.textContent = "Install App"
    button.href = "./mongo.html"
    document.body.appendChild(button)

    navigator.serviceWorker.register(swPath)
}

else {
    document.body.innerText = "Sorry your browser is not compatible with this application."
    button.href = defaultUrl
    button.textContent = "Click here to go to " + defaultUrl
    document.body.appendChild(document.createElement("br"))
    document.body.appendChild(button)
}

addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault()
    deferredPrompt = e
    button.addEventListener("click", promptUser)
})

function promptUser(e) {
    e.preventDefault()
    deferredPrompt.prompt()
    deferredPrompt = null
}

addEventListener("appinstalled", function() {
    document.body.innerHTML = ""
    window.location = defaultUrl
})

