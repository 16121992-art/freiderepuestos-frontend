export const guardarToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const obtenerToken = (): string | null => {
  return localStorage.getItem('token')
}

export const eliminarToken = () => {
  localStorage.removeItem('token')
}

export const estaAutenticado = (): boolean => {
  const token = obtenerToken()
  return !!token
}
