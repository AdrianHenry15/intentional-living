export const isAdmin = (email: string): boolean => {
  const adminEmails = [
    process.env.NEXT_PUBLIC_AHENRY_PERSONAL,
    process.env.NEXT_PUBLIC_AHENRY_TGS,
    process.env.NEXT_PUBLIC_SAHIL,
    process.env.NEXT_PUBLIC_RYLAN,
    process.env.NEXT_PUBLIC_ADMIN,
  ]

  return adminEmails.includes(email)
}
