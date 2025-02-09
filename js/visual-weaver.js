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

document.addEventListener("DOMContentLoaded", () => {
  const visualWeaver = new VisualWeaver("visual-weaver");
  visualWeaver.toolbars();
});
