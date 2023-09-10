import { Dispatch, SetStateAction } from 'react'

type PaginationProps = {
  totalPages: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const Pagination = ({ totalPages, setCurrentPage }: PaginationProps) => {
  return (
    <div className="m-auto flex gap-x-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          onClick={(e) => setCurrentPage(Number(e.currentTarget.value))}
          value={index}
          className="flex h-11 w-11 items-center justify-center rounded-md bg-grey-400 text-white transition-colors hover:bg-grey-300"
          key={index}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination
