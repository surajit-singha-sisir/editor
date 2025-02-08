document.addEventListener("DOMContentLoaded", function () {
  const editor = document.getElementById("editor");
  if (editor) {
    const toolbarHTML = `
        <div class="toolbar">
        <button onclick="toggleBold()" class="" title="Bold">
            <i class="fas fa-bold icon"></i>
        </button>
        <button onclick="toggleItalic()" class="" title="Italic">
            <i class="fas fa-italic icon"></i>
        </button>
        <button onclick="toggleUnderline()" class="" title="Underline">
            <i class="fas fa-underline icon"></i>
        </button>
        <button onclick="execCommand('justifyLeft')" title="Align Left">
            <i class="fas fa-align-left icon"></i>
        </button>
        <button onclick="execCommand('justifyCenter')" title="Align Center">
            <i class="fas fa-align-center icon"></i>
        </button>
        <button onclick="execCommand('justifyRight')" title="Align Right">
            <i class="fas fa-align-right icon"></i>
        </button>
        <button onclick="execCommand('justifyFull')" title="Justify">
            <i class="fas fa-align-justify icon"></i>
        </button>
        <button onclick="toggleFontSizeMenu()" title="Font Size">
            <i class="fas fa-text-height icon"></i>
        </button>
        <div class="font-size-dropdown" id="fontSizeMenu">
            <a href="javascript:void(0);" onclick="changeFontSize(10)">10px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(14)">14px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(18)">18px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(22)">22px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(26)">26px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(30)">30px</a>
        </div>
        <select id="fontFamily" onchange="changeFontFamily(event)" title="Font Family">
            <option value="Roboto" selected>Roboto</option>
            <option value="Lato">Lato</option>
            <option value="Kalpurush">Kalpurush</option>
            <option value="SolaimanLipi">SolaimanLipi</option>
            <option value="K2D">K2D</option>
            <option value="Arial">Arial</option>
        </select>
        <button onclick="toggleColorPicker('text')" title="Font Color">
            <i class="fas fa-font icon"></i>
        </button>
        <div class="color-picker" id="textColorPicker">
            <input type="color" onchange="changeTextColor(event)" />
        </div>
        <button onclick="toggleColorPicker('background')" title="Background Color">
            <i class="fas fa-palette icon"></i>
        </button>
        <div class="color-picker" id="bgColorPicker">
            <input type="color" onchange="changeBackgroundColor(event)" />
        </div>
        <button onclick="toggleTableInputs()" title="Table">
            <i class="fas fa-table icon"></i>
        </button>
        <div class="table-inputs" id="tableInputs" style="display: none;">
            <input type="number" id="rows" placeholder="Rows" min="1" />
            <input type="number" id="cols" placeholder="Cols" min="1" />
            <button onclick="createTable()">Create Table</button>
        </div>
        </div>
    `;
    editor.insertAdjacentHTML("beforebegin", toolbarHTML);
  }
});

window.onload = function () {
  function toggleItalic() {
    const editor = document.getElementById("editor");
    const selection = window.getSelection();

    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // If selection is collapsed, do nothing
    if (selection.isCollapsed) return;

    // Create a <span> element to wrap selected text with italic style
    const italicSpan = document.createElement("span");
    italicSpan.style.fontStyle = "italic";

    // Extract selected content and wrap it in the <span>
    italicSpan.appendChild(range.extractContents());
    range.insertNode(italicSpan);

    // Merge adjacent italic spans (optional, for cleaner HTML)
    mergeAdjacentItalicSpans(editor);
  }

  function mergeAdjacentItalicSpans(container) {
    const spans = container.querySelectorAll(
      'span[style="font-style: italic;"]'
    );
    spans.forEach((span) => {
      const next = span.nextSibling;
      if (
        next &&
        next.nodeType === Node.ELEMENT_NODE &&
        next.tagName === "SPAN" &&
        next.style.fontStyle === "italic"
      ) {
        span.innerHTML += next.innerHTML;
        next.remove();
      }
    });
  }

  function execCommand(command) {
    document.execCommand(command, false, null);
  }

  function changeFontSize(size) {
    document.execCommand("fontSize", false, size);
  }

  function changeFontFamily(event) {
    const fontFamily = event.target.value;
    document.execCommand("fontName", false, fontFamily);
  }

  function toggleFontSizeMenu() {
    const menu = document.getElementById("fontSizeMenu");
    menu.classList.toggle("show");
  }

  function hideFontSizeMenu() {
    const menu = document.getElementById("fontSizeMenu");
    menu.classList.remove("show");
  }

  function toggleColorPicker(type) {
    if (type === "text") {
      document.getElementById("textColorPicker").style.display = "block";
      document.getElementById("bgColorPicker").style.display = "none";
    } else {
      document.getElementById("bgColorPicker").style.display = "block";
      document.getElementById("textColorPicker").style.display = "none";
    }
  }

  function changeTextColor(event) {
    const color = event.target.value;
    document.execCommand("foreColor", false, color);
  }

  function changeBackgroundColor(event) {
    const color = event.target.value;
    document.execCommand("backColor", false, color);
  }

  function toggleTableInputs() {
    const inputs = document.getElementById("tableInputs");
    inputs.style.display = inputs.style.display === "none" ? "flex" : "none";
  }

  function createTable() {
    const rows = document.getElementById("rows").value;
    const cols = document.getElementById("cols").value;
    if (rows && cols) {
      const table = document.createElement("table");
      for (let i = 0; i < rows; i++) {
        const tr = table.insertRow();
        for (let j = 0; j < cols; j++) {
          const td = tr.insertCell();
          td.innerHTML = `Row ${i + 1}, Col ${j + 1}`;
        }
      }
      editor.appendChild(table);
    }
    toggleTableInputs();
  }

  // Attach event listeners to toolbar buttons
  document.querySelectorAll(".toolbar button").forEach((button) => {
    button.addEventListener("click", function () {
      const command = this.getAttribute("onclick").match(
        /execCommand\('(\w+)'\)/
      )[1];
      execCommand(command);
    });
  });

  document
    .getElementById("fontFamily")
    .addEventListener("change", changeFontFamily);
  document
    .getElementById("textColorPicker")
    .querySelector("input")
    .addEventListener("change", changeTextColor);
  document
    .getElementById("bgColorPicker")
    .querySelector("input")
    .addEventListener("change", changeBackgroundColor);
  document
    .getElementById("tableInputs")
    .querySelector("button")
    .addEventListener("click", createTable);
};

const ddd = document.getElementById("sdafsdf");

ddd.addEventListener("click", function (e) {
  e.preventDefault();
  var x = document.getElementById("edit");
  var y = document.getElementById("editor");

  const z = y.innerHTML;
  x.textContent = z;
  console.log(x);
});



let isBoldActive = false;
let isItalicActive = false;
let isUnderlineActive = false;

function toggleBold() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length > 0) {
        wrapSelectionInSpan('fontWeight', isBoldActive ? 'normal' : 'bold');
    } else {
        applyStyleAtCursor('fontWeight', isBoldActive ? 'normal' : 'bold');
    }

    isBoldActive = !isBoldActive;  // Toggle bold state
    updateButtonState();
}

function toggleItalic() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length > 0) {
        wrapSelectionInSpan('fontStyle', isItalicActive ? 'normal' : 'italic');
    } else {
        applyStyleAtCursor('fontStyle', isItalicActive ? 'normal' : 'italic');
    }

    isItalicActive = !isItalicActive;  // Toggle italic state
    updateButtonState();
}

function toggleUnderline() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length > 0) {
        wrapSelectionInSpan('textDecoration', isUnderlineActive ? 'none' : 'underline');
    } else {
        applyStyleAtCursor('textDecoration', isUnderlineActive ? 'none' : 'underline');
    }

    isUnderlineActive = !isUnderlineActive;  // Toggle underline state
    updateButtonState();
}

// Helper function to wrap selected text in a span element with the specified style
function wrapSelectionInSpan(styleProperty, styleValue) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style[styleProperty] = styleValue;

    // Wrap the selected text in the span
    range.surroundContents(span);
}

// Helper function to apply style at the cursor position (if no text is selected)
function applyStyleAtCursor(styleProperty, styleValue) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // If no text is selected, apply the style at the cursor position
    if (selection.isCollapsed) {
        const span = document.createElement('span');
        span.style[styleProperty] = styleValue;

        // Insert an empty text node at the cursor position
        const textNode = document.createTextNode('');
        span.appendChild(textNode);

        range.insertNode(span);

        // Move the cursor after the inserted span
        const newRange = document.createRange();
        newRange.setStartAfter(span);
        newRange.setEndAfter(span);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}

// Update the button state based on the selection
function updateButtonState() {
    const boldButton = document.getElementById("boldButton");
    const italicButton = document.getElementById("italicButton");
    const underlineButton = document.getElementById("underlineButton");

    // Ensure buttons exist before trying to update classList
    if (!boldButton || !italicButton || !underlineButton) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText.length > 0) {
        const parentElement = range.commonAncestorContainer;

        // Check the style applied to the selected range
        const isBold = (parentElement.style.fontWeight === "bold" || parentElement.querySelector('span[style*="font-weight: bold"]'));
        const isItalic = (parentElement.style.fontStyle === "italic" || parentElement.querySelector('span[style*="font-style: italic"]'));
        const isUnderline = (parentElement.style.textDecoration === "underline" || parentElement.querySelector('span[style*="text-decoration: underline"]'));

        boldButton.classList.toggle("active", isBold);
        italicButton.classList.toggle("active", isItalic);
        underlineButton.classList.toggle("active", isUnderline);
    } else {
        // No text selected, so we apply styles based on cursor position
        boldButton.classList.toggle("active", isBoldActive);
        italicButton.classList.toggle("active", isItalicActive);
        underlineButton.classList.toggle("active", isUnderlineActive);
    }
}

// Listen for cursor position changes to detect bold, italic, or underline state dynamically
document.getElementById("editor").addEventListener("keyup", updateStateFromCursor);
document.getElementById("editor").addEventListener("mouseup", updateStateFromCursor);

function updateStateFromCursor() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    // Check if the selected text has bold, italic, or underline
    const selectedText = range.toString();

    if (selectedText.length > 0) {
        const parentElement = range.commonAncestorContainer;
        const isBold = (parentElement.style.fontWeight === "bold" || parentElement.querySelector('span[style*="font-weight: bold"]'));
        const isItalic = (parentElement.style.fontStyle === "italic" || parentElement.querySelector('span[style*="font-style: italic"]'));
        const isUnderline = (parentElement.style.textDecoration === "underline" || parentElement.querySelector('span[style*="text-decoration: underline"]'));

        isBoldActive = isBold;
        isItalicActive = isItalic;
        isUnderlineActive = isUnderline;

        updateButtonState();
    }
}
