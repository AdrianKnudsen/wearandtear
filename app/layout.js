'use client'
import NavBar from '@/components/NavBar'
import { CartProvider } from '@/contexts/CartContext'
import '@/styles/globals.css'
import { Josefin_Sans, Jost, Raleway } from 'next/font/google'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${jost.variable} ${raleway.variable}`}
    >
      <head>
        <style jsx global>{`
          :root {
            --josefin-font: ${josefinSans.style.fontFamily};
            --jost-font: ${jost.style.fontFamily};
            --raleway-font: ${raleway.style.fontFamily};
          }
        `}</style>
      </head>
      <body>
        <NavBar></NavBar>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
