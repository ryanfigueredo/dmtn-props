import Logo from './Logo'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-dmtn-purple-dark to-dmtn-purple shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Logo white={true} className="h-10 w-auto" />
          </div>
          <div className="text-white text-sm">
            Proposta Comercial
          </div>
        </div>
      </div>
    </header>
  )
}

