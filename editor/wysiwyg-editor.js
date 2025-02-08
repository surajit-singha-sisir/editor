document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('kehem_wysiwyg');
    if (!textarea) return;

    // Hide the original textarea
    textarea.style.display = 'none';

    // Create the editor container
    const editorContainer = document.createElement('div');
    editorContainer.className = 'editor-container';
    textarea.parentNode.insertBefore(editorContainer, textarea); // Place the editor where the textarea was

    // Create the toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    // Add buttons to the toolbar
    toolbar.innerHTML = `
        <button onclick="execCommand('bold')"><i class="fas fa-bold"></i> Bold</button>
        <button onclick="execCommand('italic')"><i class="fas fa-italic"></i> Italic</button>
        <button onclick="execCommand('underline')"><i class="fas fa-underline"></i> Underline</button>
        <button onclick="execCommand('justifyLeft')"><i class="fas fa-align-left"></i> Left</button>
        <button onclick="execCommand('justifyCenter')"><i class="fas fa-align-center"></i> Center</button>
        <button onclick="execCommand('justifyRight')"><i class="fas fa-align-right"></i> Right</button>
        <button onclick="execCommand('justifyFull')"><i class="fas fa-align-justify"></i> Justify</button>
        <button onclick="toggleFontSizeMenu()">Font Size</button>
        <button onclick="toggleFontFamilyMenu()">Font Family</button>
    `;

    editorContainer.appendChild(toolbar);

    // Create the editable content area (div)
    const editorArea = document.createElement('div');
    editorArea.className = 'editor';
    editorArea.contentEditable = true;
    editorArea.innerHTML = textarea.value; // Populate with textarea content
    editorContainer.appendChild(editorArea);

    // Font size menu (hidden by default)
    const fontSizeMenu = createFontSizeMenu();
    editorContainer.appendChild(fontSizeMenu);

    // Font family menu (hidden by default)
    const fontFamilyMenu = createFontFamilyMenu();
    editorContainer.appendChild(fontFamilyMenu);

    // Event listeners for buttons
    window.execCommand = function(command) {
        document.execCommand(command, false, null);
    };

    function toggleFontSizeMenu() {
        fontSizeMenu.classList.toggle('show');
    }

    function toggleFontFamilyMenu() {
        fontFamilyMenu.classList.toggle('show');
    }

    // Font size menu
    function createFontSizeMenu() {
        const menu = document.createElement('div');
        menu.className = 'font-size-dropdown';
        menu.innerHTML = `
            <a href="javascript:void(0);" onclick="changeFontSize(10)">10px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(14)">14px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(18)">18px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(22)">22px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(26)">26px</a>
            <a href="javascript:void(0);" onclick="changeFontSize(30)">30px</a>
        `;
        return menu;
    }

    function changeFontSize(size) {
        document.execCommand('fontSize', false, size);
    }

    // Font family menu
    function createFontFamilyMenu() {
        const menu = document.createElement('div');
        menu.className = 'font-family-dropdown';
        menu.innerHTML = `
            <a href="javascript:void(0);" onclick="changeFontFamily('Arial')">Arial</a>
            <a href="javascript:void(0);" onclick="changeFontFamily('Roboto')">Roboto</a>
            <a href="javascript:void(0);" onclick="changeFontFamily('Lato')">Lato</a>
        `;
        return menu;
    }

    function changeFontFamily(fontFamily) {
        document.execCommand('fontName', false, fontFamily);
    }

    // This function will be triggered when the user types in the editor and will sync with the hidden textarea
    editorArea.addEventListener('input', function() {
        textarea.value = editorArea.innerHTML; // Sync the editor content with the hidden textarea
    });
});
