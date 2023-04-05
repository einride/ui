export const getInitials = (name: string | undefined): string => {
  if (!name) return ""

  const parts = name.trim().split(" ")

  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  if (parts.length >= 2)
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()

  return ""
}
