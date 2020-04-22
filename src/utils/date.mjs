
export const year = '(\\d{4})'
export const month = '(0[1-9]|1[0-2])'
export const day = '(0[1-9]|1\\d|2\\d|3[0-1])'
export const hour = '(0\\d|1\\d|2[0-3])'
export const minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)'
export const second = minute

export const timeRegex = new RegExp(
  `^(${year}(-${month}(-${day}(T${hour}(:${minute}(:${second})?)?)?)?)?)$`
)
