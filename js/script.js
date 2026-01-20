// Simple security animation effect
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".block");

  let index = 0;
  setInterval(() => {
    blocks.forEach(b => b.style.boxShadow = "none");
    blocks[index].style.boxShadow = "0 0 20px #3b82f6";
    index = (index + 1) % blocks.length;
  }, 1200);
});
