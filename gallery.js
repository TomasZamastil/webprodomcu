function openModal(element) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("modalCaption");
    const fullImg = element.querySelector('.full-img');
    
    modal.style.display = "block";
    modalImg.src = fullImg.src;
    captionText.innerHTML = element.querySelector('p').textContent;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target == modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});