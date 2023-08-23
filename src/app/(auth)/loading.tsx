const Loading = () => {
  return (
    <div className=" w-full max-w-[550px] rounded-md bg-grey-600 p-10 shadow-lg">
      <header className="flex flex-col gap-y-1">
        <div className="h-[36px] w-[140px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[26px] w-[340px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
      </header>
      <div className="space-y-8 py-12">
        <div className="h-[52px] w-full animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[52px] w-full animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[48px] w-full animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[24px] w-full animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
      </div>
      <div className="h-[2px] w-full bg-grey-400" />
      <div className="grid grid-cols-2 grid-rows-2 justify-between justify-items-center gap-5 pt-12 sm:grid-cols-4 sm:grid-rows-1">
        <div className="h-[64px] w-[96px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[64px] w-[96px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[64px] w-[96px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
        <div className="h-[64px] w-[96px] animate-pulse">
          <div className="h-full w-full rounded-md bg-grey-400" />
        </div>
      </div>
    </div>
  )
}

export default Loading
