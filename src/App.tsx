import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'

import { GlobalStyle } from './styles'
import { Provider } from 'react-redux'
import { store } from './store'

export type Game = {
  id: number
  titulo: string
  plataformas: string[]
  precoAntigo: number
  preco: number
  categoria: string
  imagem: string
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/produtos')
      .then((res) => {
        console.log('Status da resposta:', res.status) // Log do status da resposta
        return res.json()
      })
      .then((res) => {
        console.log('Dados recebidos:', res) // Log dos dados recebidos
        setGames(res)
      })
      .catch((error) => console.error('Erro ao buscar produtos:', error))
  }, [])

  return (
    <Provider store={store}>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos jogos={games} />
      </div>
    </Provider>
  )
}

export default App
