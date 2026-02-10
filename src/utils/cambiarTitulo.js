export const cambiarTitulo = (titulo) => {
  if (!titulo) {
    document.title = '? - GDM Admin'
    return
  }

  document.title = `${titulo} - GDM Admin`
}