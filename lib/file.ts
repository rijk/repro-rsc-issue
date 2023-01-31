export const upload = async (path: string, file: File) => {
  path = encodeURIComponent(path)
  const type = encodeURIComponent(file.type)

  const signed = await fetch(`/api/sign-upload?file=${path}&type=${type}`)
  const { url, fields } = await signed.json()
  const formData = new FormData()

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string)
  })

  const { ok } = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (ok) {
    return { url: url + fields.key }
  } else {
    return { error: 'Something went wrong' }
  }
}
