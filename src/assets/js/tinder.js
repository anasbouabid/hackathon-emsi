let imgCount = 0
const data = [
    {img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Bill_Gates_-_Nov._8%2C_2019.jpg/640px-Bill_Gates_-_Nov._8%2C_2019.jpg", name: 'Anas1', speciality: "Backend Software Engineering", data: {}},
    {img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg", name: 'Anas2', speciality: "Fullstack software engineer", data: {}},
    {img: "https://cdn.britannica.com/99/124299-050-4B4D509F/Linus-Torvalds-2012.jpg", name: 'Anas3', speciality: "Software Engineer", data: {}},
    {img: "https://www.andrewng.org/static/c5eb39b8da664718384eefcbc915f5cd/5ee5f/andrew-ng-homepage.jpg", name: 'Anas4', speciality: "ML Engineer", data: {}}
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
    newCard.style.backgroundImage = `url(${data.img})`
    newCard.innerHTML = `
          <div class="is-like">LIKE</div>
          <div class="bottom">
            <div class="title">
              <span>${data.name}</span>
              <!--<span>${data.speciality}</span>-->
            </div>
            <div class="info">
              <span>${data.speciality}</span>
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
    likeText.style.opacity = Math.abs((x / innerWidth * 2.1))
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
