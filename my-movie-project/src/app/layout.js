
import ChakraProvider from './chakraProviders';
import  { MovieProvider }  from '../context/movies'
import NavBar from './navBar';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
            <MovieProvider>
              <NavBar></NavBar>
              {children}
            </MovieProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
