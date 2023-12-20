import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type PaginationProps = {
  totalPages: number
  setPage: Dispatch<SetStateAction<number>>
  className?: string
  page: number
}

const Pagination = ({
  totalPages,
  setPage,
  className,
  page,
}: PaginationProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div
          className={clsx('flex justify-end gap-x-4  px-4 md:px-10', className)}
        >
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-md shadow-md',
              'transition-color border-2 border-grey-400 text-white',
              page === 1 && 'disabled',
            )}
          >
            <ChevronLeft size={22} strokeWidth={1.5} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              value={index}
              disabled={page === index + 1}
              onClick={() => setPage(index + 1)}
              style={{ backgroundColor: page === index + 1 ? '#333' : '' }}
              className={clsx(
                'flex h-10 w-10 cursor-pointer items-center justify-center rounded-md shadow-md',
                'border-2 border-grey-400 text-sm text-white',
              )}
              key={index}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-md shadow-md',
              'transition-color border-2 border-grey-400 text-white',
              page === totalPages && 'disabled',
            )}
          >
            <ChevronRight size={22} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  )
}

export default Pagination
