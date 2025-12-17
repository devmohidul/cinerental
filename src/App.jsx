import Header from "./Header";
import Sidebar from "./Sidebar";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <div class="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
