export const isAdmin = (email: string): boolean => {
  const adminEmails = [
    process.env.NEXT_PUBLIC_AHENRY_PERSONAL,
    process.env.NEXT_PUBLIC_AHENRY_TGS,
    process.env.NEXT_PUBLIC_JARED,
    process.env.NEXT_PUBLIC_JAMES,
  ]

  return adminEmails.includes(email)
}
