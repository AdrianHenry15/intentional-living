import { create } from "zustand"

interface PhoneStore {
  phoneNumber: string | null
  setPhoneNumber: (phone: string) => void
  clearPhoneNumber: () => void
}

export const usePhoneStore = create<PhoneStore>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phone) => set({ phoneNumber: phone }),
  clearPhoneNumber: () => set({ phoneNumber: null }),
}))
