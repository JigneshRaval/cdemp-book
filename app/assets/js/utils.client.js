var ClientUtilModule = (function () {
    
    function importHTMLFiles(elementToImport, appendToID) {
        if ("import" in document.createElement("link")) {
            // This browser supports HTML5 Imports.
            var link = document.querySelector('link[rel="import"]');

            if (link && link.length > 0) {
                
                // 1. GET CONTENT : Pass Element ID, Class or Tag Name which needs to be cloned
                var template = link.import.querySelector(elementToImport);

                // 2. CLONE Content : Clone the <template> in the import.
                var clone = document.importNode(template, true);

                // 3. APPEND CONTENT : Provide ID of the container in which you want to append imported content                
                document.querySelector(appendToID).appendChild(clone);

            }    
        }
        else {
            console.log("HTML5 Import method is not supported your browser.");
        }
    }

    return {
        importHTMLFiles: importHTMLFiles
    }

})();