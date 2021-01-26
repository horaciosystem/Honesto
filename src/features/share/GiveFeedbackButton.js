function GiveFeedbackButton({ userId, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-2 px-8 bg-purple-600 hover:bg-purple-700 
      focus:ring-purple-500 focus:ring-offset-purple-200
       text-white w-full transition ease-in duration-200 text-center text-base font-semibold 
       shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded`}
    >
      Fill Out
    </button>
  )
}

export default GiveFeedbackButton
