import { useRouter } from 'next/navigation'
import { Dispatch, MouseEvent, SetStateAction } from 'react'

type PaginationProps = {
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({ totalPages, setCurrentPage }: PaginationProps) => {
  const { push } = useRouter()

  const handleClickPagination = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(e.currentTarget.value))
    push('/dashboard#desk')
  }
  return (
    <>
      {totalPages > 1 && (
        <div className="m-auto flex gap-x-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              onClick={(e) => handleClickPagination(e)}
              value={index}
              className="flex h-11 w-11 items-center justify-center rounded-md bg-grey-400 text-white transition-colors hover:bg-grey-300"
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
