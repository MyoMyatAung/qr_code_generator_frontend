import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

type Props = {
  url: string
}

const PdfRenderer: React.FC<Props> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div className='w-fit my-4 m-auto bg-gray-600 overflow-hidden shadow-md border-gray-600 rounded-sm'>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={300} height={350} pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </div>
  );
}

export default PdfRenderer;