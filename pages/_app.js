import '../styles/globals.css'
import { SearchQueryProvider } from '../context/SearchQueryContext'
import Layout from '../layout/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SearchQueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SearchQueryProvider>
    </>
  )
}

export default MyApp
