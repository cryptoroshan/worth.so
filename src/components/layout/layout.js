import Header from './header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col px-2 md:px-[33px] w-2/3 mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  )
}