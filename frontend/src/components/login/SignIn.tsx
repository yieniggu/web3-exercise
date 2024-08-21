import KimaLogo from "../../assets/kima-logo-black.svg";

interface props {
  user: string;
  setLoginStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SignIn = ({ user, setLoginStatus }: props) => {
  return (
    <div className="flex flex-col w-100 h-100 p-4 gap-6">
      <img src={KimaLogo} className="w-20 mx-auto" />
      <h1 className="text-blue-600 text-2xl font-bold text-center">
        Welcome, Sign In to keep track of your {user} transactions
      </h1>

      <div className="flex flex-col bg-blue-500 shadow-md gap-4 w-[400px] mx-auto mt-20 p-4 font-mono text-white">
        <h1 className="text-lg text-white text-center">Sign In</h1>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input className="px-2 py-1 text-blue-700" />
        </div>
        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input className="px-2 py-1 text-blue-700" type="password" />
        </div>

        <button
          className="mx-auto w-[200px] px-2 py-1 bg-white text-blue-700 hover:text-white hover:bg-blue-300 duration-300"
          onClick={() => setLoginStatus(true)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
