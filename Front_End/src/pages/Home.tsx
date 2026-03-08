import { Link } from "react-router-dom";
import { FaClipboardList, FaColumns, FaTasks } from "react-icons/fa";

export function Home() {
  const features = [
    {
      icon: <FaClipboardList className="text-3xl text-blue-500" />,
      title: "Organisez vos projets",
      desc: "Créez des boards pour chaque projet et gardez une vue d'ensemble claire.",
    },
    {
      icon: <FaColumns className="text-3xl text-indigo-500" />,
      title: "Colonnes personnalisées",
      desc: "Définissez vos propres colonnes : À faire, En cours, Terminé…",
    },
    {
      icon: <FaTasks className="text-3xl text-emerald-500" />,
      title: "Suivez vos tâches",
      desc: "Assignez des priorités et des types à chaque tâche en un clin d'œil.",
    },
  ];

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-[#1F2937] px-8 py-16 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight">
          Bienvenue sur <span className="text-blue-400">Jeedee Kanban</span>
        </h1>
        <p className="max-w-lg text-gray-300 text-lg">
          Gérez vos projets simplement. Visualisez l'avancement de vos tâches en
          temps réel grâce à des tableaux Kanban intuitifs.
        </p>
        <Link
          to="/boards"
          className="mt-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Voir mes projets →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex flex-col gap-2 rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="mb-1">{f.icon}</div>
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
        <div>
          <h3 className="font-semibold text-gray-800">Prêt à commencer ?</h3>
          <p className="text-sm text-gray-500">
            Accédez à votre liste de boards et lancez-vous.
          </p>
        </div>
        <Link
          to="/boards"
          className="rounded-lg bg-[#1F2937] px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
        >
          Mes boards
        </Link>
      </div>
    </div>
  );
}
