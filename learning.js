// Funcionalidad para las tarjetas de Learning
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todas las tarjetas de learning
  const learningCards = document.querySelectorAll("#learning .learning-card");
  
  // Añadir event listener a cada tarjeta
  learningCards.forEach(card => {
    const header = card.querySelector(".card-header");
    
    header.addEventListener("click", function() {
      // Toggle la clase 'active' en la tarjeta
      card.classList.toggle("active");
      
      // Actualizar el ícono del botón (+ o -)
      const icon = card.querySelector(".expand-btn .icon");
      if (card.classList.contains("active")) {
        icon.textContent = "+"; // El ícono ya se rotará con CSS
      } else {
        icon.textContent = "+";
      }
    });
  });
});
