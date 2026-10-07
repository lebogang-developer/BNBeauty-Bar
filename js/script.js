const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile menu
menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  menuToggle.classList.toggle("active");

  const expanded = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", !expanded);
});

// Close mobile menu after clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Navbar background when scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Dynamic copyright year
document.getElementById("currentYear").textContent = new Date().getFullYear();

/* =========================================
   GALLERY FILTER
========================================= */

const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll(".gallery-item");

galleryFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    // Remove active state
    galleryFilters.forEach((button) => {
      button.classList.remove("active");
    });

    // Add active state
    filterButton.classList.add("active");

    const selectedFilter = filterButton.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (selectedFilter === "all" || category === selectedFilter) {
        item.classList.remove("gallery-hidden");
        item.classList.add("gallery-show");
      } else {
        item.classList.add("gallery-hidden");
        item.classList.remove("gallery-show");
      }
    });
  });
});

/* =========================================
   GALLERY LIGHTBOX
========================================= */

const lightbox = document.getElementById("galleryLightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCategory = document.getElementById("lightboxCategory");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxClose = document.getElementById("lightboxClose");

const lightboxPrev = document.getElementById("lightboxPrev");

const lightboxNext = document.getElementById("lightboxNext");

let currentGalleryIndex = 0;

/* Get currently visible gallery items */

function getVisibleGalleryItems() {
  return Array.from(galleryItems).filter((item) => {
    return !item.classList.contains("gallery-hidden");
  });
}

/* Open Lightbox */

function openLightbox(item) {
  const visibleItems = getVisibleGalleryItems();

  currentGalleryIndex = visibleItems.indexOf(item);

  updateLightbox();

  lightbox.classList.add("active");

  lightbox.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

/* Update image */

function updateLightbox() {
  const visibleItems = getVisibleGalleryItems();

  const item = visibleItems[currentGalleryIndex];

  if (!item) return;

  const image = item.querySelector("img");

  const category = item.querySelector(".gallery-info span");

  const title = item.querySelector(".gallery-info h3");

  lightboxImage.src = image.src;

  lightboxImage.alt = image.alt;

  lightboxCategory.textContent = category.textContent;

  lightboxTitle.textContent = title.textContent;
}

/* Open when gallery image is clicked */

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    openLightbox(item);
  });
});

/* Previous */

lightboxPrev.addEventListener("click", (event) => {
  event.stopPropagation();

  const visibleItems = getVisibleGalleryItems();

  currentGalleryIndex--;

  if (currentGalleryIndex < 0) {
    currentGalleryIndex = visibleItems.length - 1;
  }

  updateLightbox();
});

/* Next */

lightboxNext.addEventListener("click", (event) => {
  event.stopPropagation();

  const visibleItems = getVisibleGalleryItems();

  currentGalleryIndex++;

  if (currentGalleryIndex >= visibleItems.length) {
    currentGalleryIndex = 0;
  }

  updateLightbox();
});

/* Close */

function closeLightbox() {
  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

/* Click outside image */

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

/* Keyboard navigation */

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowRight") {
    const visibleItems = getVisibleGalleryItems();

    currentGalleryIndex++;

    if (currentGalleryIndex >= visibleItems.length) {
      currentGalleryIndex = 0;
    }

    updateLightbox();
  }

  if (event.key === "ArrowLeft") {
    const visibleItems = getVisibleGalleryItems();

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {
      currentGalleryIndex = visibleItems.length - 1;
    }

    updateLightbox();
  }
});

/* =========================================
   BNBEAUTY BAR BOOKING SYSTEM V1
========================================= */

const bookingSteps = document.querySelectorAll(".booking-step");

const progressSteps = document.querySelectorAll(".progress-step");

const nextButtons = document.querySelectorAll("[data-next]");

const backButtons = document.querySelectorAll("[data-back]");

const mobileStepText = document.getElementById("mobileStepText");

const mobileStepName = document.getElementById("mobileStepName");

const mobileProgressBar = document.getElementById("mobileProgressBar");

/* =========================================
   BOOKING DATA
========================================= */
let bookingData = {
  category: "",
  service: "",
  price: 0,
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

let currentStep = 1;

/* =========================================
   STEP NAMES
========================================= */

const bookingStepNames = {
  1: "Select Service",
  2: "Date & Time",
  3: "Your Details",
  4: "Review Request",
};

/* =========================================
   CHANGE STEP
========================================= */

function showBookingStep(step) {
  currentStep = step;

  /* Main steps */

  bookingSteps.forEach((bookingStep) => {
    const stepNumber = Number(bookingStep.dataset.step);

    bookingStep.classList.toggle("active", stepNumber === step);
  });

  /* Desktop progress */

  progressSteps.forEach((progress) => {
    const progressNumber = Number(progress.dataset.progress);

    progress.classList.remove("active", "completed");

    if (progressNumber === step) {
      progress.classList.add("active");
    }

    if (progressNumber < step) {
      progress.classList.add("completed");
    }
  });

  /* Mobile progress */

  if (mobileStepText) {
    mobileStepText.textContent = `Step ${step} of 4`;

    mobileStepName.textContent = bookingStepNames[step];

    mobileProgressBar.style.width = `${step * 25}%`;
  }

  /* Populate review */

  if (step === 4) {
    populateBookingReview();
  }

  /* Scroll booking app into view on smaller screens */

  if (window.innerWidth <= 750) {
    const bookingApp = document.querySelector(".booking-app");

    const headerOffset = 90;

    const position =
      bookingApp.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }
}

/* =========================================
   SERVICE SELECTION
========================================= */

// const serviceCards = document.querySelectorAll(".booking-service-card");

// const serviceInputs = document.querySelectorAll('input[name="bookingService"]');

// serviceInputs.forEach((input) => {
//   input.addEventListener("change", () => {
//     serviceCards.forEach((card) => {
//       card.classList.remove("selected");
//     });

//     const selectedCard = input.closest(".booking-service-card");

//     selectedCard.classList.add("selected");

//     bookingData.service = input.value;

//     document.getElementById("serviceError").classList.remove("show");
//   });
// });

/* =========================================
   SERVICE / TREATMENT SELECTION
========================================= */

const serviceSelects = document.querySelectorAll(".service-treatment-select");

const serviceCards = document.querySelectorAll(".service-dropdown-card");

serviceSelects.forEach((select) => {
  select.addEventListener("change", () => {
    /*
     * Clear the other categories.
     *
     * For V1 a customer books one
     * treatment per appointment request.
     */

    serviceSelects.forEach((otherSelect) => {
      if (otherSelect !== select) {
        otherSelect.value = "";
      }
    });

    serviceCards.forEach((card) => {
      card.classList.remove("selected");
    });

    /* Nothing selected */

    if (!select.value) {
      bookingData.category = "";
      bookingData.service = "";
      bookingData.price = 0;

      return;
    }

    /* Selected option */

    const selectedOption = select.options[select.selectedIndex];

    bookingData.category = select.dataset.category;

    bookingData.service = selectedOption.value;

    bookingData.price = Number(selectedOption.dataset.price);

    /* Highlight selected category */

    const selectedCard = select.closest(".service-dropdown-card");

    selectedCard.classList.add("selected");

    /* Remove error */

    document.getElementById("serviceError").classList.remove("show");
  });
});

/* =========================================
   DATE
========================================= */

const bookingDate = document.getElementById("bookingDate");

/* Prevent selecting past dates */

if (bookingDate) {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  bookingDate.min = `${year}-${month}-${day}`;

  bookingDate.addEventListener("change", () => {
    bookingData.date = bookingDate.value;

    document.getElementById("dateTimeError").classList.remove("show");
  });
}

/* =========================================
   TIME SELECTION
========================================= */

const timeButtons = document.querySelectorAll(".booking-times button");

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeButtons.forEach((timeButton) => {
      timeButton.classList.remove("selected");
    });

    button.classList.add("selected");

    bookingData.time = button.dataset.time;

    document.getElementById("dateTimeError").classList.remove("show");
  });
});

/* =========================================
   NEXT BUTTONS
========================================= */

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextStep = Number(button.dataset.next);

    /* Validate Step 1 */

    if (currentStep === 1) {
      if (!bookingData.service) {
        document.getElementById("serviceError").classList.add("show");

        return;
      }
    }

    /* Validate Step 2 */

    if (currentStep === 2) {
      bookingData.date = bookingDate.value;

      if (!bookingData.date || !bookingData.time) {
        document.getElementById("dateTimeError").classList.add("show");

        return;
      }
    }

    /* Validate Step 3 */

    if (currentStep === 3) {
      if (!collectClientDetails()) {
        return;
      }
    }

    showBookingStep(nextStep);
  });
});

/* =========================================
   BACK BUTTONS
========================================= */

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const previousStep = Number(button.dataset.back);

    showBookingStep(previousStep);
  });
});

/* =========================================
   COLLECT CLIENT DETAILS
========================================= */

function collectClientDetails() {
  const name = document.getElementById("bookingName").value.trim();

  const phone = document.getElementById("bookingPhone").value.trim();

  const email = document.getElementById("bookingEmail").value.trim();

  const notes = document.getElementById("bookingNotes").value.trim();

  /*
   * Basic South African-friendly validation.
   * Allows spaces, +, hyphens and brackets.
   */

  const phonePattern = /^[+\d][\d\s()-]{8,}$/;

  if (name.length < 2 || !phonePattern.test(phone)) {
    document.getElementById("detailsError").classList.add("show");

    return false;
  }

  /* Validate email only when entered */

  if (email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      const error = document.getElementById("detailsError");

      error.textContent = "Please enter a valid email address.";

      error.classList.add("show");

      return false;
    }
  }

  document.getElementById("detailsError").classList.remove("show");

  bookingData.name = name;
  bookingData.phone = phone;
  bookingData.email = email;
  bookingData.notes = notes;

  return true;
}

/* =========================================
   FORMAT DATE
========================================= */

function formatBookingDate(dateString) {
  if (!dateString) {
    return "—";
  }

  /*
   * Add T00:00:00 to prevent timezone
   * shifting the selected date.
   */

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================
   REVIEW
========================================= */

/* =========================================
   POPULATE BOOKING REVIEW
========================================= */

function populateBookingReview() {
  /* Category */

  document.getElementById("reviewCategory").textContent = bookingData.category;

  /* Treatment */

  document.getElementById("reviewService").textContent = bookingData.service;

  /* Price */

  document.getElementById("reviewPrice").textContent = `R${bookingData.price}`;

  /* Date */

  document.getElementById("reviewDate").textContent = formatBookingDate(
    bookingData.date,
  );

  /* Time */

  document.getElementById("reviewTime").textContent = bookingData.time;

  /* Client */

  document.getElementById("reviewName").textContent = bookingData.name;

  /* Phone */

  document.getElementById("reviewPhone").textContent = bookingData.phone;

  /* =====================================
       EMAIL
    ====================================== */

  const emailContainer = document.getElementById("reviewEmailContainer");

  if (bookingData.email) {
    emailContainer.style.display = "";

    document.getElementById("reviewEmail").textContent = bookingData.email;
  } else {
    emailContainer.style.display = "none";
  }

  /* =====================================
       NOTES
    ====================================== */

  const notesContainer = document.getElementById("reviewNotesContainer");

  if (bookingData.notes) {
    notesContainer.style.display = "";

    document.getElementById("reviewNotes").textContent = bookingData.notes;
  } else {
    notesContainer.style.display = "none";
  }
}

/* =========================================
   WHATSAPP BOOKING
========================================= */

const whatsappBookingButton = document.getElementById("sendWhatsAppBooking");

whatsappBookingButton.addEventListener("click", () => {
  const whatsappNumber = "27612793855";

  const message = `Hi BNBeauty Bar 👋

I'd like to request an appointment.

*APPOINTMENT DETAILS*

Category: ${bookingData.category}
Treatment: ${bookingData.service}
Price: R${bookingData.price}

Preferred Date: ${formatBookingDate(bookingData.date)}
Preferred Time: ${bookingData.time}

*CLIENT DETAILS*

Name: ${bookingData.name}
Phone: ${bookingData.phone}${bookingData.email ? `\nEmail: ${bookingData.email}` : ""}${bookingData.notes ? `\nNote: ${bookingData.notes}` : ""}

Please let me know if this appointment is available.

Thank you. ✨`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

/* =========================================
   EMAIL BOOKING REQUEST
========================================= */

const sendBookingButton = document.getElementById("sendBookingRequest");

sendBookingButton.addEventListener("click", () => {
  const businessEmail = "Ntsayagaebonolo@gmail.com";

  const subject = `BNBeauty Bar Appointment Request - ${bookingData.service}`;

  const body = `Hi BNBeauty Bar,

I would like to request an appointment.

APPOINTMENT DETAILS
------------------------------
Category: ${bookingData.category}
Treatment: ${bookingData.service}
Price: R${bookingData.price}

Preferred Date: ${formatBookingDate(bookingData.date)}
Preferred Time: ${bookingData.time}

CLIENT DETAILS
------------------------------
Name: ${bookingData.name}
Phone: ${bookingData.phone}
Email: ${bookingData.email || "Not provided"}
Notes: ${bookingData.notes || "None"}

Please let me know if this appointment is available.

Thank you.`;

  const mailtoURL =
    `mailto:${businessEmail}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoURL;
});

/* =========================================
   SUCCESS
========================================= */

function showBookingSuccess() {
  bookingSteps.forEach((step) => {
    step.classList.remove("active");
  });

  document.getElementById("bookingSuccess").classList.add("active");

  document.getElementById("successName").textContent =
    bookingData.name.split(" ")[0] + "!";

  progressSteps.forEach((step) => {
    step.classList.remove("active");

    step.classList.add("completed");
  });

  if (mobileProgressBar) {
    mobileProgressBar.style.width = "100%";

    mobileStepText.textContent = "Request Complete";

    mobileStepName.textContent = "Thank You";
  }
}

/* =========================================
   NEW BOOKING
========================================= */

const newBookingButton = document.getElementById("newBookingRequest");

newBookingButton.addEventListener("click", () => {
  /* Reset booking data */

  bookingData = {
    category: "",
    service: "",
    price: 0,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  };

  /* Reset service dropdowns */

  serviceSelects.forEach((select) => {
    select.value = "";
  });

  serviceCards.forEach((card) => {
    card.classList.remove("selected");
  });

  /* Fields */

  document.getElementById("bookingName").value = "";

  document.getElementById("bookingPhone").value = "";

  document.getElementById("bookingEmail").value = "";

  document.getElementById("bookingNotes").value = "";

  /* Success */

  document.getElementById("bookingSuccess").classList.remove("active");

  showBookingStep(1);
});
