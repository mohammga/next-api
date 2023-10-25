function Result({ onRestart }) {

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">
        Takk for ditt svar!
      </h2>
      <button
        onClick={onRestart}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-8 rounded transition duration-150 mt-8"
      >
        Lukk
      </button>
    </div>
  );
}

export default Result;
