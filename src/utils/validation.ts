export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const phonePattern = /^[+]?[\d\s()-]{7,20}$/
export const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i

export const validationMessages = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  phone: 'Enter a valid phone number',
  url: 'Enter a valid URL',
  minPassword: 'Password must be at least 6 characters',
}
