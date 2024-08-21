export const NotAllowed = () => {
  return (
    <div className="flex flex-col mx-auto w-[600px] bg-red-800 text-white p-2 gap-4">
      <h1 className="text-center text-6xl">X</h1>
      <h1 className="text-center text-xl">
        You are Not Allowed to be here, please check that you're using the right
        account to interact with the dapp
      </h1>
    </div>
  );
};
