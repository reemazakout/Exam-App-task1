import Logout from "./components/Auth/Logout";

export default function page() {
  return (
    <>
      <div className="bg-green-600 text-center p-6 text-lg text-white">
        Welcome to home page
      </div>
      <Logout></Logout>
    </>
  );
}
