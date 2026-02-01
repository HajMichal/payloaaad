export const validateSloganLength = (value: string | null | undefined) => {
  if (!value) return true

  const length = value.trim().length
  if (length > 20) {
    return `Slogan must be maximum 20 characters. Current: ${length} characters.`
  }

  return true
}
