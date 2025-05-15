---
sidebar_position: 5
---

# PDF Helper

The `PDFHelper` class provides utilities for working with PDF files. It offers functionality for reading, writing, merging, splitting, encrypting, and manipulating PDF documents using the Apache PDFBox library.

## Basic PDF Operations

### Reading PDF Files

```java
// Extract text from a PDF file
String content = PDFHelper.readPdf("documents/report.pdf");
```

### Writing PDF Files

```java
// Write content to a new PDF file
List<String> lines = Arrays.asList(
    "Line 1: This is the first line of text.",
    "Line 2: This is the second line of text.",
    "Line 3: This is the third line of text."
);
PDFHelper.writePdf("documents/output.pdf", lines);

// Append content to an existing PDF file
List<String> additionalLines = Arrays.asList(
    "Additional line 1",
    "Additional line 2"
);
PDFHelper.appendToPdf("documents/report.pdf", additionalLines);
```

## Page Management

```java
// Get the total number of pages in a PDF
int pageCount = PDFHelper.getPageCount("documents/document.pdf");

// Extract a single page from a PDF file
PDFHelper.extractPdfPage(
    "documents/report.pdf", 
    "documents/extracted_page.pdf", 
    2 // page index (zero-based)
);

// Remove pages from a PDF
PDFHelper.removePages(
    "documents/report.pdf", 
    "documents/shortened.pdf", 
    5, // start page (inclusive, zero-based)
    10 // end page (inclusive, zero-based)
);

// Rotate a specific page
PDFHelper.rotatePage(
    "documents/document.pdf", 
    "documents/rotated.pdf", 
    0, // page index 
    90 // rotation degrees (90, 180, 270)
);

// Add blank pages to a PDF
PDFHelper.addBlankPages(
    "documents/document.pdf", 
    3 // number of blank pages to add
);

// Get dimensions of a specific page
PDRectangle dimensions = PDFHelper.getPageDimensions(
    "documents/document.pdf",
    0 // page index
);
float width = dimensions.getWidth();
float height = dimensions.getHeight();
```

## PDF Manipulation

### Merging and Splitting

```java
// Merge multiple PDF files into one
List<String> filesToMerge = Arrays.asList(
    "documents/part1.pdf",
    "documents/part2.pdf",
    "documents/part3.pdf"
);
PDFHelper.mergePdfs(filesToMerge, "documents/merged.pdf");

// Split a PDF into individual pages
PDFHelper.splitPdf(
    "documents/document.pdf", 
    "documents/split/" // output directory
);
```

### Adding Content

```java
// Add an image to a PDF
PDFHelper.addImageToPdf(
    "documents/document.pdf", 
    "documents/with_image.pdf", 
    "images/logo.png", 
    100, // x position
    100, // y position
    200, // width
    100  // height
);

// Add a watermark to a PDF
PDFHelper.addWatermark(
    "documents/document.pdf", 
    "documents/watermarked.pdf", 
    "CONFIDENTIAL"
);
```

## PDF Security

```java
// Encrypt a PDF with password protection
PDFHelper.encryptPdf(
    "documents/document.pdf", 
    "documents/encrypted.pdf", 
    "owner-password", 
    "user-password"
);

// Check if a PDF is encrypted
boolean isEncrypted = PDFHelper.isEncrypted(
    "documents/document.pdf", 
    "password" // optional password to try
);
```

## PDF Optimization

```java
// Compress a PDF to reduce file size
PDFHelper.compressPDF(
    "documents/large.pdf", 
    "documents/compressed.pdf"
);

// Flatten form fields in a PDF
PDFHelper.flattenFormFields(
    "documents/form.pdf", 
    "documents/flattened.pdf"
);
```

## Metadata Management

```java
// Update PDF metadata
PDFHelper.updateMetadata(
    "documents/document.pdf", 
    "documents/updated.pdf", 
    "Report Title", // title
    "John Doe"      // author
);
```

## PDF Comparison

```java
// Compare two PDF files for content equality
boolean areEqual = PDFHelper.comparePdfFiles(
    "documents/original.pdf", 
    "documents/copy.pdf"
);
```

## Error Handling

The `PDFHelper` class incorporates robust error handling and logging through the Ellithium reporting system. All operations log their status, making it easy to trace PDF operations during test execution.

```java
// All methods include proper error handling and logging
try {
    String content = PDFHelper.readPdf("nonexistent.pdf");
    // Logs: "File does not exist: nonexistent.pdf"
} catch (Exception e) {
    // Additional error handling if needed
}
```

## Performance Considerations

Working with PDFs can be memory-intensive, especially for large files. The `PDFHelper` class is designed to efficiently manage resources by:

1. Using try-with-resources to ensure proper document closure
2. Providing targeted operations to work with specific pages rather than entire documents when possible
3. Offering compression options for reducing file sizes 