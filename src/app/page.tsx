import TgIcon from "@/icons/tg-icon";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col bg-slate-100 min-h-screen">
            <main className="bg-white flex-grow">
                <div className="flex flex-col bg-slate-100 min-h-screen justify-center items-center gap-4 text-center">
                    <h1 className="text-2xl">Shadow Manga</h1>
                    <p className="max-w-sm">Dastur va website tayyorlanish jarayonida! Hozircha botimizda anime tomosha qilishga taklif qilamiz :)</p>
                    <Link href={"https://t.me/aniuz_bot?start=website"} target="_blank">
                        <button type="button" className="flex justify-center w-xs items-center gap-4 h-10 text-white bg-blue-500 hover:bg-blue-600 transition rounded-lg cursor-pointer">
                            <TgIcon /> Botga o&rsquo;tish
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
