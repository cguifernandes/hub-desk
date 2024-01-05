const ClientWrapper = ({
  createdAt,
  count,
}: {
  createdAt: Date
  count: number | undefined
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString()

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-px text-xs">
      <span className="flex items-center gap-x-2 text-white/50">
        {count} Desks criadas
      </span>
      <span className="text-white/50">Membro desde: {formattedDate}</span>
    </div>
  )
}

export default ClientWrapper
