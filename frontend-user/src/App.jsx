import Formulaire from './components/Formulaire';

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      
      {/* En-tête NetZlux */}
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-red-600 mb-2">
          NetZlux
        </h1>
        <p className="text-xl text-gray-300">
          TP02 : Composants & Props
        </p>
      </div>

      {/* L'exercice du Formulaire (TP2) */}
      <div className="w-full max-w-lg">
        {/* On appelle le composant Formulaire */}
        <Formulaire />
      </div>

    </div>
  )
}

export default App