function createCallWidget() {
    const widget = document.createElement('div')
    widget.className = "fixed bottom-10 right-10 w-[53px] h-[53px] rounded-full bg-[#19BC8D80] flex items-center justify-center"
    widget.innerHTML = `
        <img class="w-[30px]" src="../assets/adaptive/Vector (16).svg" />
    `

    return widget;
}

function createCallLink(widget) {
    const link = document.createElement('a')
    link.href = 'tel:+74951168260'
    link.className = "fixed bottom-10 right-10"
    link.appendChild(widget)
    return link
}

function initWidgets() {
    const widget = createCallWidget()
    const callLink = createCallLink(widget)

    const body = document.body
    body.appendChild(callLink)


    function toggleWidgetVisability () {
        if(window.innerWidth < 1680) {
            callLink.classList.remove('hidden')
        } else {
            callLink.classList.add('hidden')
        }

    }

    toggleWidgetVisability()

    window.addEventListener('resize', toggleWidgetVisability)
}

document.addEventListener('DOMContentLoaded', initWidgets())





