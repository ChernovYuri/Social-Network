import React, {memo, useCallback} from 'react';
import s from './Pagination.module.css'

type Props = {
    currentPage: number
    totalPages: number
    onChangePage: (page: number) => void
    visiblePages?: number
}

export const Pagination: React.FC<Props> = memo(({
                                                               currentPage,
                                                               totalPages,
                                                               onChangePage,
                                                               // По умолчанию показывается 5 страниц вокруг текущей страницы
                                                               visiblePages = 5,
                                                           }) => {
    const range = (start: number, end: number) => {
        return Array.from({length: end - start + 1}, (_, i) => start + i);
    }

    const getPageNumbers = useCallback(() => {
        const halfVisiblePages = Math.floor(visiblePages / 2);
        const startPage = Math.max(1, currentPage - halfVisiblePages);
        const endPage = Math.min(totalPages, currentPage + halfVisiblePages);

        let pages: (number | null)[] = range(startPage, endPage);

        // Если первая страница не видна, добавляем "null" в начало массива
        if (startPage > 1) {
            pages = [null, ...pages];
        }

        // Если последняя страница не видна, добавляем "null" в конец массива
        if (endPage < totalPages) {
            pages = [...pages, null];
        }

        // Всегда отображаем первую и последнюю страницы
        if (totalPages > visiblePages) {
            if (pages[0] !== 1) {
                pages.unshift(1);
            }
            if (pages[pages.length - 1] !== totalPages) {
                pages.push(totalPages);
            }
        }

        return pages;
    }, [])

    const handleClick = useCallback((page: number) => {
        if (page !== currentPage) {
            onChangePage(page);
        }
    }, [])

    const pageNumbers = getPageNumbers();

    return (
        <nav>
            <div className={s.pagination}>
                {pageNumbers.map((pageNumber, index) => (
                    <span key={index}>
                        {pageNumber !== null ? (
                            <button onClick={() => handleClick(pageNumber)}
                                    className={pageNumber === currentPage ? s.selectedPage : ''}>
                                {pageNumber}
                            </button>
                        ) : (
                            <span>&hellip;</span>
                        )}
                    </span>
                ))}
            </div>
        </nav>
    )
})
