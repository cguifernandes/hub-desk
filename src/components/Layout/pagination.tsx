import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

type PaginationProps = {
  totalPages: number
  setPage: Dispatch<SetStateAction<number>>
  className?: string
}

const Pagination = ({ totalPages, setPage, className }: PaginationProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div className={clsx('flex justify-center gap-x-4', className)}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              value={index}
              onClick={() => setPage(index + 1)}
              className={clsx(
                'flex h-11 w-11 items-center justify-center rounded-md shadow-md',
                'bg-grey-550 text-white transition-colors hover:bg-grey-400/80',
              )}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export default Pagination
