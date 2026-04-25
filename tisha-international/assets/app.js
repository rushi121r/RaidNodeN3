const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((el) => observer.observe(el));

const inquiryForm = document.querySelector("#inquiry-form");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const successMessage = document.querySelector("#quick-response");
    if (successMessage) {
      successMessage.classList.add("visible");
      inquiryForm.reset();
    }
  });
}
