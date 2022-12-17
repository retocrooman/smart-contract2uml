import Header from './components/Header'
import Bottom from './components/Bottom'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Bottom />
    </>
  )
}

export default Layout
