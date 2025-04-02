function SignInBanner({ onSignIn }) {
    return (
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
                <p className="text-blue-700">
                    Sign in to save your contacts and access them from anywhere!
                </p>
                <button
                    onClick={onSignIn}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default SignInBanner; 