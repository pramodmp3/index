document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownItems = document.querySelectorAll(".nav-item.dropdown");

  // Utility function to check if we are in mobile layout (matches CSS media query)
  const isMobileView = () => window.innerWidth <= 1024;

  // 1. Mobile Menu (Hamburger) Toggle
  hamburger.addEventListener("click", () => {
    // Toggle the active state for the menu and the hamburger icon
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Close any open mobile dropdowns when the main menu closes
    if (!navMenu.classList.contains("active")) {
      dropdownItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });

  // 2. Mobile Dropdown Toggle (Click on Link)
  dropdownItems.forEach((item) => {
    const link = item.querySelector(".nav-link");

    link.addEventListener("click", (e) => {
      // Only execute toggle logic in mobile view
      if (isMobileView()) {
        e.preventDefault(); // CRITICAL: Prevents navigation to allow dropdown toggle

        const isOpen = item.classList.contains("open");

        // Close all other dropdowns for clean single-open UX
        dropdownItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });

        // Explicitly toggle the 'open' class (which changes + to - and expands menu)
        if (!isOpen) {
          item.classList.add("open");
        } else {
          item.classList.remove("open");
        }
      }
      // On desktop, the link attempts navigation, but the CSS hover effect is dominant.
    });
  });

  // 3. Close mobile menu/dropdowns when resizing to desktop
  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      // Ensure mobile menu is hidden and hamburger is reset on desktop width
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");

      // Ensure all dropdowns are closed when returning to desktop mode
      dropdownItems.forEach((item) => {
        item.classList.remove("open");
      });
    }
  });
});
