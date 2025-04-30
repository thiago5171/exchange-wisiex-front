import UserHeader from "./header";

function LayoutLogged({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 My App
      </footer>
    </div>
  );
}

export default LayoutLogged;
