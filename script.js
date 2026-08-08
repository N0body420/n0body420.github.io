const card = document.querySelector('.glass-card')

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
})

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    card.style.transition = 'transform 0.5s ease'
})

card.addEventListener('mouseenter', () => {
    card.style.transition = 'none'
})

if (!window.audioSetupComplete) {
    window.audioSetupComplete = true;

    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("play-btn");
    const volSlider = document.getElementById("vol-slider");
    const enterScreen = document.getElementById("enter-screen");
    const iconSpeaker = document.getElementById("icon-speaker");
    const iconMuted = document.getElementById("icon-muted");

    audio.volume = volSlider.value;

    function updateIcons() {
        if (audio.paused || audio.volume === 0) {
            iconSpeaker.style.display = "none";
            iconMuted.style.display = "block";
        } else {
            iconSpeaker.style.display = "block";
            iconMuted.style.display = "none";
        }
    }

    if (enterScreen) {
        enterScreen.addEventListener("click", () => {
            enterScreen.classList.add("hidden");
            audio.play().catch(() => {});
            updateIcons();
        });
    }

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        updateIcons();
    });

    volSlider.addEventListener("input", (event) => {
        audio.volume = event.target.value;
        updateIcons();
    });

    audio.addEventListener("play", updateIcons);
    audio.addEventListener("pause", updateIcons);
}
