/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
'use client'
import useConnection from '@/hooks/useConnection'
import CardDesk from './cardDesk'
import clsx from 'clsx'
import Heading from '../../Typography/heading'
import Skeleton from '../../skeleton'
import Pagination from '../../pagination'
import EmptyAlert from './emptyAlert'

const Desks = () => {
  const { desks, name, isLoading, totalPages, setCurrentPage, setDesks } =
    useConnection()

  return (
    <>
      <div
        id="desk"
        className="flex items-center justify-center px-10 pt-8 sm:pt-14"
      >
        <Heading size="lg" align="center" className="text-white">
          Bem-vindo(a) às suas Desks
        </Heading>
      </div>
      {/* <div className="flex w-full justify-between p-10">
        <Select
          selectedDropDown={selectedDropDown}
          setSelectedDropDown={setSelectedDropDown}
          dropDownItems={categories}
          className="h-14 w-96"
          value={'Categorias'}
        >
          <ChevronDown color="#fff" strokeWidth={1.5} size={30} />
        </Select>
        <Input
          className="h-14 w-[458px]"
          placeholder="Pesquise por suas desks..."
        >
          <Search color="#fff" strokeWidth={1.5} size={24} />
        </Input>
      </div> */}
      {desks.length === 0 && !isLoading ? (
        <EmptyAlert />
      ) : (
        <div
          className={clsx(
            'flex w-full grow-[1] basis-0 flex-wrap justify-center gap-8 p-10',
          )}
        >
          {isLoading ? (
            <>
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
              <Skeleton className="h-[590px] min-w-[340px] max-w-[450px] flex-1" />
            </>
          ) : (
            desks.map((desk) => (
              <CardDesk
                setDesks={setDesks}
                key={desk.id}
                category={desk.category}
                createdAt={desk.createdAt}
                description={desk.description}
                repo={desk.repo}
                title={desk.title}
                website={desk.website}
                id={desk.id}
                name={name}
              />
            ))
          )}
        </div>
      )}

      {desks.length > 0 && !isLoading && (
        <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} />
      )}
    </>
  )
}

export default Desks
