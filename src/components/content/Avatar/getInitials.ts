export const getInitials = (name: string | undefined): string | null => {
  if (!name) return null

  const parts = name.split(" ")

  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  if (parts.length >= 2)
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()

  return null
}
