import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const pagination = tv({
  base: 'flex justify-end gap-x-4',
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type PaginationProps = VariantProps<typeof pagination> & {
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
  size,
}: PaginationProps) => {
  return (
    <>
      {totalPages > 1 && (
        <div className={clsx('flex justify-end gap-x-4', className)}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={pagination({
              className: `flex cursor-pointer items-center justify-center rounded-md border-2 border-grey-400 text-white shadow-md`,
              size,
            })}
            style={
              page === 1
                ? { cursor: 'not-allowed', opacity: 0.5 }
                : { cursor: 'pointer', opacity: 1 }
            }
          >
            <ChevronLeft size={size === 'sm' ? 18 : 20} strokeWidth={1.5} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              value={index}
              disabled={page === index + 1}
              onClick={() => setPage(index + 1)}
              style={{ backgroundColor: page === index + 1 ? '#333' : '' }}
              className={pagination({
                className: `flex cursor-pointer items-center justify-center rounded-md border-2 border-grey-400 text-white shadow-md`,
                size,
              })}
              key={index}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={pagination({
              className: `flex cursor-pointer items-center justify-center rounded-md border-2 border-grey-400 text-white shadow-md`,
              size,
            })}
            style={
              page === totalPages
                ? { cursor: 'not-allowed', opacity: 0.5 }
                : { cursor: 'pointer', opacity: 1 }
            }
          >
            <ChevronRight size={size === 'sm' ? 18 : 20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </>
  )
}

export default Pagination
