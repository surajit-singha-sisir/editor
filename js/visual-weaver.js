class VisualWeaver {
  constructor(textareaId) {
    this.textarea = document.getElementById(textareaId);
    this.toolbar = null;

    if (this.textarea) {
      this.extractToolbarConfig();
    } else {
      console.error(`Textarea with ID "${textareaId}" not found.`);
    }
  }

  extractToolbarConfig() {
    const content = this.textarea.value;

    const scriptContentMatch = content.match(/<script>([\s\S]*?)<\/script>/);

    if (scriptContentMatch && scriptContentMatch[1]) {
      try {
        eval(scriptContentMatch[1]);

        if (typeof toolbar !== "undefined") {
          this.toolbar = toolbar;
        } else {
          console.error("Toolbar object not found inside script.");
        }
      } catch (error) {
        console.error("Error evaluating script content:", error);
      }
    } else {
      console.error("No script tag found inside textarea.");
    }
  }

  getToolbarConfig = () => {
    return this.toolbar;
  };

  //   TOOLBAR SHOWS

  toolbars() {
    const config = this.getToolbarConfig();

    if (config.orientation === "horizontal") {
      const horizontal = config.orientation;
    }
  }
}

// TOOLTIPS
function tooltips() {
  const buttons = document.querySelectorAll("[data-original-title]");

  buttons.forEach((button) => {
    let tooltip;

    button.addEventListener("mouseenter", (event) => {
      // Create tooltip
      tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = button.getAttribute("data-original-title");
      button.appendChild(tooltip);

      tooltip.classList.add("show");
    });

    button.addEventListener("mouseleave", () => {
      if (tooltip) {
        tooltip.classList.remove("show");
        setTimeout(() => tooltip.remove(), 200);
      }
    });
  });
}
function resizer() {
  const editor = document.getElementById("editor-body");
  const resizer = document.querySelector(".resizer-editor");

  let isResizing = false;
  let lastY = 0;

  // Mouse down event to start resizing
  resizer.addEventListener("mousedown", (e) => {
    isResizing = true;
    lastY = e.clientY; // Get initial mouse position
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResize);
  });

  // Handle resizing during mouse move
  function handleResize(e) {
    if (!isResizing) return;
    const offset = e.clientY - lastY; // Calculate the distance moved
    const newHeight = editor.offsetHeight + offset; // Calculate new height
    editor.style.height = `${newHeight}px`; // Apply the new height
    lastY = e.clientY; // Update lastY for next calculation
  }

  // Stop resizing when mouse button is released
  function stopResize() {
    isResizing = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResize);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const visualWeaver = new VisualWeaver("visual-weaver");
  visualWeaver.toolbars();
  tooltips();
  resizer();
});

// MODAL
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
  document.getElementById("modal-overlay").classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
  document.getElementById("modal-overlay").classList.remove("active");
}

function fullscreen() {
  const container = document.querySelector(".visual-weaver");

  if (container) {
    container.classList.toggle("visual-weaver-fullscreen");

    if (container.classList.contains("visual-weaver-fullscreen")) {
      document.addEventListener("keydown", exitFullscreenOnEsc);
    } else {
      document.removeEventListener("keydown", exitFullscreenOnEsc);
    }
  }
}

// Function to handle Esc key press
function exitFullscreenOnEsc(event) {
  if (event.key === "Escape") {
    const container = document.querySelector(".visual-weaver");
    if (container && container.classList.contains("visual-weaver-fullscreen")) {
      container.classList.remove("visual-weaver-fullscreen");
      document.removeEventListener("keydown", exitFullscreenOnEsc);
    }
  }
}
