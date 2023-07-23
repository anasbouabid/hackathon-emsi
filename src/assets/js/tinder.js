let imgCount = 0
const data = [
    {company: "", title: "", type: "", attendance:"", period:"", logo: "https://www.pngall.com/wp-content/uploads/13/Google-Logo-PNG-Images.png"},
]
const frame = document.body.querySelector('.frame')
data.forEach(_data => appendCard(_data))

let current = frame.querySelector('.tinder-card:last-child')
let likeText = current.children[0]
let startX = 0, startY = 0, moveX = 0, moveY = 0
initCard(current)

document.querySelector('#like').onclick = () => {
    moveX = 1
    moveY = 0
    complete()
}
document.querySelector('#hate').onclick = () => {
    moveX = -1
    moveY = 0
    complete()
}

function appendCard(data) {
    const firstCard = frame.children[0]
    const newCard = document.createElement('div')
    newCard.className = 'tinder-card'
    // newCard.style.backgroundImage = `url(${data.img})`
    newCard.innerHTML = `
        <div class="is-like"></div>
        <div class="bottom">
            <img class="offer-logo" src="${data.img}" alt="offer logo">
            <div class="offer-title w-100 d-flex align-items-center justify-content-between">
                <h3>Google</h3>
                <h5>PFE</h5>
            </div>
            <div class="offer-info w-100 d-flex align-items-center justify-content-between">
                <h5>Remote (3 months)</h5>
                <h5>25OO DH</h5>
            </div>
            <h2 class="offer-position">Software Engineer</h2>
            <p class="offer-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum eius eum ipsa laboriosam laborum molestiae mollitia quam quasi repudiandae voluptatibus? Autem, corporis dolore dolores ipsam ipsum optio quasi sequi sunt.</p>
            <div class="offer-tags">
                <span>Java</span> <span>Spring boot</span>
                <span>Java</span> <span>Spring boot</span>
                <span>Java</span> <span>Spring boot</span>
                <span>Java</span> <span>Spring boot</span>
                <span>Java</span> <span>Spring boot</span>
            </div>
        </div>
        `
    if (firstCard) frame.insertBefore(newCard, firstCard)
    else frame.appendChild(newCard)
    imgCount++
}

function initCard(card) {
    card.addEventListener('pointerdown', onPointerDown)
}

function setTransform(x, y, deg, duration) {
    current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`
    likeText.style.opacity = Math.abs((x / innerWidth * 5.1))
    likeText.className = `is-like ${x > 0 ? 'like' : 'nope'}`
    if (duration) current.style.transition = `transform ${duration}ms`
}

function onPointerDown({ clientX, clientY }) {
    startX = clientX
    startY = clientY
    current.addEventListener('pointermove', onPointerMove)
    current.addEventListener('pointerup', onPointerUp)
    current.addEventListener('pointerleave', onPointerUp)
}

function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX
    moveY = clientY - startY
    setTransform(moveX, moveY, moveX / innerWidth * 50)
}

function onPointerUp() {
    current.removeEventListener('pointermove', onPointerMove)
    current.removeEventListener('pointerup', onPointerUp)
    current.removeEventListener('pointerleave', onPointerUp)
    if (Math.abs(moveX) > frame.clientWidth / 2) {
        current.removeEventListener('pointerdown', onPointerDown)
        complete()
    } else cancel()
}

function complete() {
    const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3
    const flyY = (moveY / moveX) * flyX
    setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth)

    const prev = current
    const next = current.previousElementSibling
    if (next) initCard(next)
    current = next
    likeText = current.children[0]
    appendCard(data[imgCount % 4])
    setTimeout(() => frame.removeChild(prev), innerWidth)
}

function cancel() {
    setTransform(0, 0, 0, 100)
    setTimeout(() => current.style.transition = '', 100)
}
