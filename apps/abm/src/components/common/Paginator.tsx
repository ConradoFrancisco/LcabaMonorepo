interface PaginatorProps {
  cantidad: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  limit: number;
}

export default function Paginator({ cantidad, setOffset, offset, limit }: PaginatorProps) {
  const totalPages = Math.ceil(cantidad / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handlePageClick = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
  };

  const getPageButtons = () => {
    const maxButtons = 5;
    const buttons = [];

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = startPage + maxButtons - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <span key="start-ellipsis" className="px-1 text-xs">
          ...
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
            isActive
              ? 'cursor-not-allowed border border-gray-500 bg-gray-400 text-white'
              : 'border border-black bg-black text-white hover:bg-white hover:text-black'
          }`}
          disabled={isActive}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      buttons.push(
        <span key="end-ellipsis" className="px-1 text-xs">
          ...
        </span>,
      );
    }

    return buttons;
  };

  return (
    <div className="my-4 flex w-full flex-wrap justify-end gap-1 pe-3">
      {currentPage > 1 && (
        <>
          <button
            onClick={() => handlePageClick(1)}
            className="rounded-md bg-gray-300 px-2 py-1 text-xs text-black transition-colors hover:bg-gray-400"
          >
            Primero
          </button>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            className="rounded-md border bg-white px-2 py-1 text-xs text-black transition-colors hover:bg-black hover:text-white"
          >
            Anterior
          </button>
        </>
      )}

      {getPageButtons()}

      {currentPage < totalPages && (
        <>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            className="rounded-md border bg-white px-2 py-1 text-xs text-black transition-colors hover:bg-black hover:text-white"
          >
            Siguiente
          </button>
          <button
            onClick={() => handlePageClick(totalPages)}
            className="rounded-md bg-gray-300 px-2 py-1 text-xs text-black transition-colors hover:bg-gray-400"
          >
            Último
          </button>
        </>
      )}
    </div>
  );
}
