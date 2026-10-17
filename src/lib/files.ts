export function loadFile (file: Blob): Promise<ArrayBuffer> {
  return file.arrayBuffer()
}

export function bytesToURL (bytes: ArrayLike<number>, format: string): string {
  return URL.createObjectURL(new Blob([new Uint8Array(bytes)], { type: format }))
}

export function downloadFile (file: File): void {
  const url = URL.createObjectURL(file)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = file.name
  anchor.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
